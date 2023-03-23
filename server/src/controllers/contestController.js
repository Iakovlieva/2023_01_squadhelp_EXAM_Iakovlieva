const db = require('../models');
const ServerError =require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const {sendingMail} = require('../utils/sendEmail');


module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const { body: { characteristic1, characteristic2 } } = req;
    console.log(req.body, characteristic1, characteristic2);
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);
  
    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [ db.Sequelize.Op.or ]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if (!response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    console.log(err);
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  //Если креатор, то показываем те которое с его ИД, а если кустомер - то разрешенные/реджект/вон
  const types = [CONSTANTS.OFFER_STATUS_ALLOWED, CONSTANTS.OFFER_STATUS_REJECTED, CONSTANTS.OFFER_STATUS_WON].filter(Boolean);  
  try {
    let contestInfo = await db.Contest.findOne({
      where: { id: req.headers.contestid },
      order: [
        [db.Offer, 'id', 'asc'],
      ],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        {
          model: db.Offer,
          required: false,
          where: req.tokenData.role === CONSTANTS.CREATOR
            ? { userId: req.tokenData.userId }
            : { status: {
                [ db.Sequelize.Op.or ]: types
                },
              },
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.User,
              required: true,
              attributes: {
                exclude: [
                  'password',
                  'role',
                  'balance',
                  'accessToken',
                ],
              },
            },
            {
              model: db.Rating,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller.getNotificationController().emitEntryCreated(
      req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED }, { id: offerId });
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was rejected', contestId);
  return rejectedOffer;
};

const allowOffer = async (offerId, creatorId, contestId) => {
  const foundUser = await userQueries.findUser({ id: creatorId });
  const foundOffer = await contestQueries.findOffer({ id: offerId });
  const offerInfo = (!foundOffer.text) ? foundOffer.originalFileName: foundOffer.text;

  await sendingMail(foundUser.email,'Your offer in SquardHelp was moderated', `Your offer - ${offerInfo} succesfully moderated` );

  const allowedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_ALLOWED }, { id: offerId });
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was allowed', contestId);
  return allowedOffer;
};

const forbidOffer = async (offerId, creatorId, contestId) => {
  const foundUser = await userQueries.findUser({ id: creatorId });
  const foundOffer = await contestQueries.findOffer({ id: offerId });
  const offerInfo = (!foundOffer.text) ? foundOffer.originalFileName: foundOffer.text;

  await sendingMail(foundUser.email, 'Your offer in SquardHelp was moderated', `Your offer - ${offerInfo} didn't pass moderation` );

  const forbiddenOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_FORBIDDEN }, { id: offerId });
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was forbidden', contestId);
    return forbiddenOffer;
};

const resolveOffer = async (
  contestId, creatorId, orderId, offerId, priority, transaction) => {
  const finishedContest = await contestQueries.updateContestStatus({
    status: db.sequelize.literal(`   CASE
            WHEN "id"=${ contestId }  AND "orderId"='${ orderId }' THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }'
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority + 1 }  THEN '${ CONSTANTS.CONTEST_STATUS_ACTIVE }'
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority - 1 }  THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }'   
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority - 2 }  THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }' 
            ELSE '${ CONSTANTS.CONTEST_STATUS_PENDING }'
            END
    `),
  }, { orderId }, transaction);
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId, transaction);
  const updatedOffers = await contestQueries.updateOfferStatus({
    status: db.sequelize.literal(` CASE
            WHEN "id"=${ offerId } AND "status"='${ CONSTANTS.OFFER_STATUS_ALLOWED }' THEN '${ CONSTANTS.OFFER_STATUS_WON }'
            WHEN "id"<>${ offerId } AND "status"='${ CONSTANTS.OFFER_STATUS_ALLOWED }' THEN '${ CONSTANTS.OFFER_STATUS_REJECTED }'
            WHEN "id"<>${ offerId } AND "status"='${ CONSTANTS.OFFER_STATUS_FORBIDDEN }' THEN '${ CONSTANTS.OFFER_STATUS_FORBIDDEN }'       
            WHEN "id"<>${ offerId } AND "status"='${ CONSTANTS.OFFER_STATUS_PENDING }' THEN '${ CONSTANTS.OFFER_STATUS_FORBIDDEN }'                                      
            ELSE '${ CONSTANTS.OFFER_STATUS_REJECTED }'
            END
    `),
  }, {
    contestId,
  }, transaction);

  /*чтобы Кустомер видел только те оферы которые прошли модерацию и после победы какого-то из оферов - сделала чтоб те которые были отклоненными - так ими и остались, и те которые были пендинг - 
  тоже чтобы были отклоненными, т.е. "все что не подтверждено - отклонено"

  по идее можно было оставить фильтр на "алоуед", но тогда у модератора бы "болтались" оферы на рассмотрении, которые уже не нужны

    //после рефакторинга и добавления фильтра на активные/завершенные контесты - стала эта часть уже не так актуальна
   */
  transaction.commit();
  const arrayRoomsId = [];
  let winningoffer=null;
  updatedOffers.forEach(offer => {
    if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !== offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
    if (offer.status === CONSTANTS.OFFER_STATUS_WON ) {
      winningoffer = offer;
    }
  });
  /*
   тут по ходу выяснения нашелся баг, который не заметила вначале, не обновлялись оферы когда один из них победит, 
   поскольку неверно возвращался победитель
   и заодно поправила оповещение - победителю про проигравшие его же - не приходит теперь
   */
  if (arrayRoomsId.length > 0){
    controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId,
      'Someone of yours offers was rejected', contestId);
  }
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of your offers WIN', contestId);    
  return winningoffer;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(req.body.offerId, req.body.creatorId,
        req.body.contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(req.body.contestId,
        req.body.creatorId, req.body.orderId, req.body.offerId,
        req.body.priority, transaction);
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  } else if (req.body.command === 'allow') {
    try {
      const offer = await allowOffer(req.body.offerId, req.body.creatorId, req.body.contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'forbid') {
    try {
      const offer = await forbidOffer(req.body.offerId, req.body.creatorId, req.body.contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  const { limit, offset } = req.params;
  const types = [CONSTANTS.OFFER_STATUS_ALLOWED, CONSTANTS.OFFER_STATUS_REJECTED, CONSTANTS.OFFER_STATUS_WON].filter(Boolean);  
  db.Contest.findAll({
    where: { status: req.headers.status, userId: req.tokenData.userId },
    limit,
    offset,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offer,
        required: false,
        attributes: ['id'],     
        where: {
          status: {
            [ db.Sequelize.Op.or ]: types,
          },
        },          
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });    
    })
    .catch(err => next(new ServerError(err)));
};

module.exports.getContests = (req, res, next) => {
  const predicates = UtilFunctions.createWhereForAllContests(req.body.typeIndex,
    req.body.contestId, req.body.industry, req.body.awardSort);
  db.Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [
      {
        model: db.Offer,
        required: req.body.ownEntries,
        where: req.body.ownEntries ? { userId: req.tokenData.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => {
      next(new ServerError());
    });
};


module.exports.getAllOffers = (req, res, next) => {
  const { limit, offset } = req.params; 
  db.Offer.findAll({
    limit,
    offset,
    order: [['id', 'DESC']], 
    include: [
      {
        model: db.Contest,
        where: { status: req.headers.status },
        include: [
          {
          model: db.User,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        ]
      },
      {
          model: db.User,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
      },      
      ],
  })
    .then(offers => {
      let haveMore = true;
      if (offers.length === 0) {
        haveMore = false;
      }
      res.send( { offers, haveMore });
    })
    .catch(err => {
      next(new ServerError());
    });
};
