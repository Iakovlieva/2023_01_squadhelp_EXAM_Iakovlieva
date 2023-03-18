const bcrypt = require('bcrypt');
const CONSTANTS = require('../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Ivan',
        lastName: 'Creativ',
        displayName: 'Ivan_Creator',
        password: await bcrypt.hash('1@3$5^', CONSTANTS.SALT_ROUNDS),
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
        password: await bcrypt.hash('1@3$5^', CONSTANTS.SALT_ROUNDS),
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
        password: await bcrypt.hash('1@3$5^', CONSTANTS.SALT_ROUNDS),
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
