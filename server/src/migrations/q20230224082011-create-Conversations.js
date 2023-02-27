module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      participant1: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      participant2: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      blackList: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.BOOLEAN)
      },
      favoriteList: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.BOOLEAN)
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
  down:  (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Conversations');
  }
};