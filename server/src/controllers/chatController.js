const db = require('../models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const ServerError = require('../errors/ServerError');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
    let newConversation = await db.Conversation.findOne( { where: { participant1:participants[0], participant2:participants[1] } } );   
    if (!newConversation) {
      newConversation = await db.Conversation.create( { participant1:participants[0], participant2:participants[1], blackList: [false, false], favoriteList: [false, false] } );
    };
    const { dataValues: message } = await newConversation.createMessage({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
    });
    message.participants = participants;
    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    const preview = {
      id: newConversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };  

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        id: newConversation.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });  
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
    const dbMessages = await db.Message.findAll({
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: db.Conversation,
            required: true,  
            where: { participant1:participants[0], participant2:participants[1] }, 
            attributes: ['id'],
          },
        ],
    });

    const messages = [];
    dbMessages.forEach( mes => {
      delete mes.dataValues.Conversation;
      messages.push( mes.dataValues );
    });
        
    const interlocutor = await userQueries.findUser(
      { id: req.body.interlocutorId });
      
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const dbconversations = await db.Conversation.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { participant1: req.tokenData.userId },
          { participant2: req.tokenData.userId }
        ]
      },
      include: [
        {
          model: db.Message,
          required: true,  
          order: [['createdAt', 'DESC']], 
          limit: 1,
          offset: 0,
          attributes: ['body', 'sender'], 
        },
      ],
    });

    const conversations = [];
    dbconversations.forEach( conv => {
      conv.dataValues.sender = conv.dataValues.Messages[0].sender;
      conv.dataValues.text = conv.dataValues.Messages[0].body;
      conv.dataValues.participants = [ conv.dataValues.participant1, conv.dataValues.participant2 ];   
      delete conv.dataValues.Messages;  
      delete conv.dataValues.updatedAt;     
      delete conv.dataValues.participant1;          
      delete conv.dataValues.participant2;               
      conversations.push( conv.dataValues );
    });

    const interlocutors = [];
    conversations.forEach(conversation => {
      interlocutors.push(conversation.participants.find(
        (participant) => participant !== req.tokenData.userId));
    });
    const senders = await db.User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    conversations.forEach((conversation) => {
      senders.forEach(sender => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });        
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {       
  try {
      const participants = req.body.participants;
      const conversation= await db.Conversation.findOne( { where: { participant1:participants[0], participant2:participants[1] } } );  
      const newflags = conversation.blackList;
      newflags[req.body.participants.indexOf(req.tokenData.userId)] =  req.body.blackListFlag;
      const [updatedCount, [{dataValues: chat}]] = await db.Conversation.update({ blackList: newflags },{ where: { id: conversation.id, participant1:participants[0], participant2:participants[1] } , returning: true });                      
      if (updatedCount !== 1) {
        throw new ServerError('cannot update Chat');
      }         
      chat.participants = [participants[0], participants[1]];
      delete chat.participant1;
      delete chat.participant2;

      res.send(chat);
      const interlocutorId = req.body.participants.filter(
        (participant) => participant !== req.tokenData.userId)[ 0 ];
      controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
      const participants = req.body.participants;
      const conversation= await db.Conversation.findOne( { where: { participant1:participants[0], participant2:participants[1] } } );  
      const newflags = conversation.favoriteList;
      newflags[req.body.participants.indexOf(req.tokenData.userId)] =  req.body.favoriteFlag; 
      const [updatedCount, [{dataValues: chat}]] = await db.Conversation.update({ favoriteList: newflags },{ where: { id: conversation.id, participant1:participants[0], participant2:participants[1] } , returning: true });        
      if (updatedCount !== 1) {
        throw new ServerError('cannot update Chat');
      }        
      chat.participants = [participants[0], participants[1]];
      delete chat.participant1;
      delete chat.participant2;

      res.send(chat);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};


const catalogInformation = async (catalogId, userId) => {
  const updatedCatalog = await db.Catalog.findOne( { 
    where: { id: catalogId , userId: userId},
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: db.Conversation,
        required: true,
        attributes: ['id'],
        },
      ] 
  });  
  if (!updatedCatalog) {
    throw new ServerError(`cannot update chat's Catalog`);
  }
  const chats = []; 
  updatedCatalog.dataValues.Conversations.forEach( conv => {
    chats.push( conv.dataValues.id );
  });
  updatedCatalog.dataValues.chats = chats;
  delete updatedCatalog.dataValues.Conversations; 
  return updatedCatalog.dataValues;
}

module.exports.createCatalog = async (req, res, next) => {
  try {
    const createdCatalog = await db.Catalog.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
    });
    const result = await createdCatalog.addConversations([req.body.chatId]); 
    const catalog = await catalogInformation( createdCatalog.id , req.tokenData.userId);
      
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const updatedCatalog = await db.Catalog.findOne( { 
      where: { id: req.body.catalogId, userId: req.tokenData.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Conversation,
          required: true,
          attributes: ['id'],
          },
        ] 
    });  
    if ( !updatedCatalog ) {
      throw new ServerError(`cannot update chat's Catalog`);
    }        
    const result = await updatedCatalog.update( { catalogName: req.body.catalogName }, { returning: true } );   
    const catalog = await catalogInformation( updatedCatalog.id , req.tokenData.userId);

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const updatedCatalog= await db.Catalog.findOne( { 
      where: { id: req.body.catalogId, userId: req.tokenData.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Conversation,
          required: true,
          attributes: ['id'],
          },
        ] 
    });  

    if (!updatedCatalog) {
      throw new ServerError(`cannot update chat's Catalog`);
    }    
    const result = await updatedCatalog.addConversation( req.body.chatId );   
    const catalog = await catalogInformation( updatedCatalog.id , req.tokenData.userId);
          
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const updatedCatalog= await db.Catalog.findOne( { 
      where: { id: req.body.catalogId, userId: req.tokenData.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Conversation,
          required: true,
          attributes: ['id'],
          },
        ] 
    });  
    if (!updatedCatalog) {
      throw new ServerError(`cannot update chat's Catalog`);
    }  
    const result = await updatedCatalog.removeConversation( req.body.chatId );  
    const catalog = await catalogInformation( updatedCatalog.id , req.tokenData.userId);
 
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const deletedCatalog = await db.Catalog.findOne( {  where: { id: req.body.catalogId, userId: req.tokenData.userId }}); 
    if (!deletedCatalog) {
      throw new ServerError(`cannot update chat's Catalog`);
    }  
    await deletedCatalog.destroy();
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const userCatalogs= await db.Catalog.findAll( { 
      where: { userId: req.tokenData.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Conversation,
          required: true,
          attributes: ['id'],
          },
        ] 
    });  
    const catalogs = []; 
    for ( let i = 0; i < userCatalogs.length; i++ ){
      const catalog = await catalogInformation( userCatalogs[i].id , req.tokenData.userId);   
      delete catalog.userId;
      catalogs.push( catalog );             
    }

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
