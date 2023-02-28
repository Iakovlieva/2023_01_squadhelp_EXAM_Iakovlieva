//const Conversation = require('../models/mongoModels/conversation');
//const Message = require('../models/mongoModels/Message');
//const Catalog = require('../models/mongoModels/Catalog');
//const moment = require('moment');
const db = require('../models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
//const _ = require('lodash');
const ServerError = require('../errors/ServerError');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
   /* const newConversation2 = await Conversation.findOneAndUpdate({
      participants,
    },
    { participants, blackList: [false, false], favoriteList: [false, false] },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    });
    const message2 = new Message({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: newConversation2._id,
    });
    await message2.save();
    message2._doc.participants = participants;

/**********/
    let newConversation = await db.Conversation.findOne( { where: { participant1:participants[0], participant2:participants[1] } } );   
    if (!newConversation) {
      newConversation = await db.Conversation.create( { participant1:participants[0], participant2:participants[1], blackList: [false, false], favoriteList: [false, false] } );
    };
    const { dataValues: message } = await newConversation.createMessage({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
    });
    
    message.participants = participants;


    console.log('addMessage-----newConversation>>>>>>>>>>>>>>>>>>',newConversation);  
/**********/

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
    console.log('addMessage-----newConversation>>preview>>>>>>>>>>>>>>>>',preview);      
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
    console.log('addMessage-----messages>>>>>>>>>>>>>>>>>>',message);  
  //  console.log('addMessage-----messages>22222222222222>>>>>>>>>>>>>>>>>',message2);  
       
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
  /*  const messages2 = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      { $match: { 'conversationData.participants': participants } },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          '_id': 1,
          'sender': 1,
          'body': 1,
          'conversation': 1,
          'createdAt': 1,
          'updatedAt': 1,
        },
      },
    ]);
/**********************************/
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
    console.log('getChat-----dbMessages>>>>>>>>>>>>>>>>>>',dbMessages);  
    const messages = [];

    dbMessages.forEach( mes => {
      delete mes.dataValues.Conversation;
      messages.push( mes.dataValues );
    });

    console.log('getChat-----messages>>>>>>>>>>>>>>>>>>',messages);  
 //  console.log('getChat-----messages>>>22222>>>>>>>>>>>>>>>',messages2);      
     
/**********************************/        
    const interlocutor = await userQueries.findUser(
      { id: req.body.interlocutorId });
      console.log('getChat-----interlocutor>>>22222>>>>>>>>>>>>>>>',interlocutor);      
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
/*    const conversations2 = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      {
        $unwind: '$conversationData',
      },
      {
        $match: {
          'conversationData.participants': req.tokenData.userId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$conversationData._id',
          sender: { $first: '$sender' },
          text: { $first: '$body' },
          createAt: { $first: '$createdAt' },
          participants: { $first: '$conversationData.participants' },
          blackList: { $first: '$conversationData.blackList' },
          favoriteList: { $first: '$conversationData.favoriteList' },
        },
      },
    ]);
/********************************* */
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

 
  console.log('getPreview-----dbconversations>>>>>>>>>>>>>>>>>>',conversations);    
        
  
/********************************* */

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
 //   console.log('getPreview-----conversations>>>>>>>>>>>>>>>>>>',conversations2);       
        
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const predicate = 'blackList.' +
    req.body.participants.indexOf(req.tokenData.userId);
    console.log('blackList-----predicate>>>>>>>>>>>>>>>>>>',predicate);           
  try {
 /*   const chat2 = await Conversation.findOneAndUpdate(
      { participants: req.body.participants },
      { $set: { [ predicate ]: req.body.blackListFlag } }, { new: true });

      /**********************************/
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
      console.log('blackList-----result>>>>>>>>>>>>>>>>>>',chat);
    //  console.log('blackList-----chat>>>>>>>>>>>>>>>>>>',chat2);         

    /**********************************/
    res.send(chat);
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const predicate = 'favoriteList.' +
    req.body.participants.indexOf(req.tokenData.userId);
  try {
/*    const chat2 = await Conversation.findOneAndUpdate(
      { participants: req.body.participants },
      { $set: { [ predicate ]: req.body.favoriteFlag } }, { new: true });

/**********************************/
      const participants = req.body.participants;
      const conversation= await db.Conversation.findOne( { where: { participant1:participants[0], participant2:participants[1] } } );  
      const newflags = conversation.favoriteList;
      newflags[req.body.participants.indexOf(req.tokenData.userId)] =  req.body.favoriteFlag; 
      const [updatedCount, [{dataValues: chat}]] = await db.Conversation.update({ favoriteList: newflags },{ where: { id: conversation.id, participant1:participants[0], participant2:participants[1] } , returning: true });        
      if (updatedCount !== 1) {
        throw new ServerError('cannot update Chat');
      }       
      console.log('favoriteChat-----result>>111111>',newflags,'>>>>>>>>>>>>>>>',chat);      
    //  const chat = result.dataValues;   
      chat.participants = [participants[0], participants[1]];
     delete chat.participant1;
     delete chat.participant2;
     console.log('favoriteChat-----result>>>>>>>>>>>>>>>>>>',chat); 
    //  console.log('favoriteChat-----chat>>>>>>>>>>>>>>>>>>',chat2);    
/**********************************/
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
      ] });  
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
 /* console.log(req.body);
  const catalog2 = new Catalog({
    userId: req.tokenData.userId,
    catalogName: req.body.catalogName,
    chats: [req.body.chatId],
  });
*/
  try {
    //await catalog2.save();

    /************************************ */
    console.log('createCatalog-----rreq.body.chatId>>!!!!!!!!!!!!!!>>>>>>>>>>>>>>>>', req.body); 
    console.log('createCatalog-----rreq.body.chatId>>>>>>>>>>>>>>>>>>', req.body.chatId); 
    const createdCatalog = await db.Catalog.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
    });
    const result = await createdCatalog.addConversations([req.body.chatId]);  //req.body.chatId

    const catalog = await catalogInformation( createdCatalog.id , req.tokenData.userId);

  //  console.log('createCatalog-----result.dataValues.Conversations>>>>>>>>>>>>>>>>>>', catalog2);        
    
    console.log('createCatalog-----catalog>>>>>>>>>>>>>>>>>>',catalog);       

/************************************ */       
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
 /*   const catalog2 = await Catalog.findOneAndUpdate({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    }, { catalogName: req.body.catalogName }, { new: true });

/************************************ */
    const updatedCatalog = await db.Catalog.findOne( { 
      where: { id: req.body.catalogId, userId: req.tokenData.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Conversation,
          required: true,
          attributes: ['id'],
          },
        ] });  
    if ( !updatedCatalog ) {
      throw new ServerError(`cannot update chat's Catalog`);
    }        
    const result = await updatedCatalog.update( { catalogName: req.body.catalogName }, { returning: true } );   

    const catalog = await catalogInformation( updatedCatalog.id , req.tokenData.userId);

 //   console.log('updateNameCatalog-----result.dataValues.Conversations>>>>>>>>>>>>>>>>>>', catalog2);   
    
    console.log('updateNameCatalog-----catalog>>>>>>>>>>>>>>>>>>',catalog);         

/************************************ */

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
 /*   const catalog2 = await Catalog.findOneAndUpdate({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    }, { $addToSet: { chats: req.body.chatId } }, { new: true });

    /******************************* */

    //_id: req.body.catalogId,
    const updatedCatalog= await db.Catalog.findOne( { 
      where: { id: req.body.catalogId, userId: req.tokenData.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Conversation,
          required: true,
          attributes: ['id'],
          },
        ] });  

        if (!updatedCatalog) {
          throw new ServerError(`cannot update chat's Catalog`);
        }    
        //req.body.chatId
  //  const conversation= await db.Conversation.findOne( { where: { id:  8} } );          

    const result = await updatedCatalog.addConversation( req.body.chatId );   //req.body.chatId

    const catalog = await catalogInformation( updatedCatalog.id , req.tokenData.userId);

  //  console.log('addNewChatToCatalog-----result.dataValues.Conversations>>>>>>>>>>>>>>>>>>', catalog2);   
   
    console.log('addNewChatToCatalog-----catalog>>>>>>>>>>>>>>>>>>',catalog);  
    /******************************* */

          
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
  /*  const catalog2 = await Catalog.findOneAndUpdate({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    }, { $pull: { chats: req.body.chatId } }, { new: true });

/******************************* */
    //_id: req.body.catalogId,
    const updatedCatalog= await db.Catalog.findOne( { 
      where: { id: req.body.catalogId, userId: req.tokenData.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Conversation,
          required: true,
          attributes: ['id'],
          },
        ] });  

        //req.body.chatId
  //  const conversation= await db.Conversation.findOne( { where: { id:  8} } );          

    if (!updatedCatalog) {
      throw new ServerError(`cannot update chat's Catalog`);
    }  

    const result = await updatedCatalog.removeConversation( req.body.chatId );   //req.body.chatId

    const catalog = await catalogInformation( updatedCatalog.id , req.tokenData.userId);

 //   console.log('removeChatFromCatalog-----result.dataValues.Conversations>>>>>>>>>>>>>>>>>>', catalog2);  

     /******************************* */

    console.log('removeChatFromCatalog-----catalog>>>>>>>>>>>>>>>>>>',catalog);    
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
 /*   await Catalog.remove(
      { _id: req.body.catalogId, userId: req.tokenData.userId });
/******************************* */
      //req.body.catalogId
    const deletedCatalog = await db.Catalog.findOne( {  where: { id: 10, userId: req.tokenData.userId }}); 
    if (!deletedCatalog) {
      throw new ServerError(`cannot update chat's Catalog`);
    }  
    await deletedCatalog.destroy();

/******************************* */
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
 /*   const catalogs2 = await Catalog.aggregate([
      { $match: { userId: req.tokenData.userId } },
      {
        $project: {
          _id: 1,
          catalogName: 1,
          chats: 1,
        },
      },
    ]);
/******************************* */
    const userCatalogs= await db.Catalog.findAll( { 
      where: { userId: req.tokenData.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Conversation,
          required: true,
          attributes: ['id'],
          },
        ] });  


        const catalogs = []; 

        for ( let i = 0; i < userCatalogs.length; i++ ){
          const catalog = await catalogInformation( userCatalogs[i].id , req.tokenData.userId);   
          delete catalog.userId;
          catalogs.push( catalog );             
        }


  //  console.log('getCatalogs-----catalogs22222>>>>>>>>>>>>>>>>>>',catalogs2);


    console.log('getCatalogs-----catalogs>>>>>>>>>>>>>>>>>>',catalogs);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
