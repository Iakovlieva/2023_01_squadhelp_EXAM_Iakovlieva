const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'sender', sourceKey: 'id' });   
      Message.belongsTo(models.Conversation, { foreignKey: 'conversation', sourceKey: 'id' });   
    }
  };
  Message.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    sender: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    conversation: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Conversations',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'Messages'  
  });
  return Message;
};