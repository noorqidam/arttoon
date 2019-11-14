'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('episodes', [
      {
        title: 'ep.1',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Naruto%2F545%2Fnaruto%20vs%20obito.jpg?alt=media',
        webtoonId: 1,
      },
      {
        title: 'ep.2',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Naruto%2F546%2Fkageterdahulu.jpg?alt=media',
        webtoonId: 1,
      },
      {
        title: 'ep.3',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Naruto%2F547%2Fgara%20vs%20kage%20edotense.jpg?alt=media',
        webtoonId: 1,
      },
      {
        title: 'ep.4',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Naruto%2F548%2Fnaruto%20vs%20%20nagato%20edotense.jpg?alt=media',
        webtoonId: 1,
      },
      {
        title: 'ep.1',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/One%20Piece%2F750%2Fcover.jpg?alt=media',
        webtoonId: 2,
      },
      {
        title: 'ep.2',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/One%20Piece%2F751%2F%5Bwww.imranxrhia.com%5D-002.jpg?alt=media',
        webtoonId: 2,
      },
      {
        title: 'ep.1',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Kimetsu%20No%20Yaiba%2F179%2Fcover.png?alt=media',
        webtoonId: 3,
      },
      {
        title: 'ep.2',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Kimetsu%20No%20Yaiba%2F180%2Fcover.png?alt=media',
        webtoonId: 3,
      },
      {
        title: 'ep.3',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/Kimetsu%20No%20Yaiba%2F181%2Fcover.png?alt=media',
        webtoonId: 3,
      },
      {
        title: 'ep.1',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/One%20Puch%20Man%2F168%2Fone-punch-man%20blast.jpg?alt=media',
        webtoonId: 4,
      },
      {
        title: 'ep.2',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/One%20Puch%20Man%2F169%2FCover.jpg?alt=media',
        webtoonId: 4,
      },
      {
        title: 'ep.3',
        image: 'https://firebasestorage.googleapis.com/v0/b/arttoon-8f9ef.appspot.com/o/One%20Puch%20Man%2F170%2Fcover.png?alt=media',
        webtoonId: 4,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('episodes', null, {});
  }
};
