'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'noorqidam@gmail.com',
        password: '1234',
        name: 'Qidam'
      },
      {
        email: 'dumbways@gmail.com',
        password: 'dumbways',
        name: 'Dumbways'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
