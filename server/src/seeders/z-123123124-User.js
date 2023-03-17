module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Ivan',
        lastName: 'Creativ',
        displayName: 'Ivan_Creator',
        password: '$2b$05$YnFjQya4HUuSkX4VoJ.vU.bWA8s7ilInHM7wBVfeIh1QTsj/Uttwq',
        email: 'ivancreator.squard@gmail.com',
        avatar: 'anon.png',
        role: 'creator',
        balance: 300,
        accessToken: '',
        rating: 0
      },
      {
        firstName: 'Natalya',
        lastName: 'Customer',
        displayName: 'Natalya_Customer',
        password: '$2b$05$YnFjQya4HUuSkX4VoJ.vU.bWA8s7ilInHM7wBVfeIh1QTsj/Uttwq',
        email: 'nata.customer@gmail.com',
        avatar: 'anon.png',
        role: 'customer',
        balance: 5000,
        accessToken: '',
        rating: 0
      },
      {
        firstName: 'Alex',
        lastName: 'Moderator',
        displayName: 'Alex_Moderator',
        password: '$2b$05$YnFjQya4HUuSkX4VoJ.vU.bWA8s7ilInHM7wBVfeIh1QTsj/Uttwq',
        email: 'alex.moderator@gmail.com',
        avatar: 'anon.png',
        role: 'moderator',
        balance: 0,
        accessToken: '',
        rating: 0
      },
    ], {});
  },

};
