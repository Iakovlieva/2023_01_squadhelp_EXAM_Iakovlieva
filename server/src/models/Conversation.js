const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {

    static associate(models) {
      Conversation.belongsTo(models.User, { foreignKey: 'participant1', sourceKey: 'id' });    
      Conversation.belongsTo(models.User, { foreignKey: 'participant2', sourceKey: 'id' });       
      
      Conversation.hasMany(models.Message, { foreignKey: 'conversation', targetKey: 'id' });

      Conversation.belongsToMany(models.Catalog, {
        through: 'Catalogs_to_Conversations',
        foreignKey: 'conversationId'
      });   
    }
  };
  Conversation.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    participant1: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    participant2: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    blackList: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
    },
    favoriteList: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
    }
  }, {
    sequelize,
    modelName: 'Conversation',
    tableName: 'Conversations'
  });
  return Conversation;
};