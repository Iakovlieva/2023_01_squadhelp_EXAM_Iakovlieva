module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Catalogs_to_Conversations', {
      conversationId:{
        type: Sequelize.INTEGER,
        allowNull: false,   
        primaryKey: true,                
        references: {
          model: {
            tableName:'Conversations',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      catalogId:{
        type: Sequelize.INTEGER,
        allowNull: false,    
        primaryKey: true,               
        references: {
          model: {
            tableName:'Catalogs',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
     
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Catalogs_to_Conversations');
  }
};
