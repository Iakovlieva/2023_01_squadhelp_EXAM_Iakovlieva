'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    
    static associate(models) {
      Catalog.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' });   
      Catalog.belongsToMany(models.Conversation, {
        through: 'Catalogs_to_Conversations',
        foreignKey: 'catalogId'
      }); 
    }
    
  };
  Catalog.init({
    id: {      
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    catalogName: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Catalog',
    tableName: 'Catalogs'
  });
  return Catalog;
};