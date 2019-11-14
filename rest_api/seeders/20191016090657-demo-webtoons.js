'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('webtoons', [
      {
        title: 'Naruto',
        genre: 'Action',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Naruto%2Fe5b80-naruto-shippuden.png?alt=media',
        favorite_count: 50,
        create_by: 1
      },
      {
        title: 'One Piece',
        genre: 'Adventure',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/One%20Piece%2F2090451485.jpg?alt=media',
        favorite_count: 30,
        create_by: 2
      },
      {
        title: 'Kimetsu No Yaiba',
        genre: 'Action',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Kimetsu%20No%20Yaiba%2FScreen-Shot-2018-10-22-at-9.46.15-PM.jpg?alt=media',
        favorite_count: 20,
        create_by: 2
      },
      {
        title: 'One Puch Man',
        genre: 'Action',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/One%20Puch%20Man%2F20181119_n_dancave_onepunchmyhero_feature.jpg?alt=media',
        favorite_count: 65,
        create_by: 1
      },
      {
        title: 'Boku No Hero',
        genre: 'Action',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Boku%20No%20Hero%2Fbanner.jpg?alt=media',
        favorite_count: 70,
        create_by: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('webtoons', null, {});
  }
};
