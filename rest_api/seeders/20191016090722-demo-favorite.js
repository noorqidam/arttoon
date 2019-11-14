'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('favorites', [
      {
        id_user: 1,
        id_webtoon: 1
      },
      {
        id_user: 1,
        id_webtoon: 2
      },
      {
        id_user: 1,
        id_webtoon: 3
      },
      {
        id_user: 1,
        id_webtoon: 4
      },
      {
        id_user: 2,
        id_webtoon: 5
      },
      {
        id_user: 2,
        id_webtoon: 3
      },
      {
        id_user: 2,
        id_webtoon: 2
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('favorites', null, {});
  }
};
