'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    id_user: DataTypes.INTEGER,
    id_webtoon: DataTypes.INTEGER
  }, {});
  favorites.associate = function(models) {
    // associations can be defined here
    favorites.belongsTo(models.webtoons, {
      as:'webtoon_id',
      foreignKey: 'id_webtoon'
    }),
    favorites.belongsTo(models.users, {
      as:'user',
      foreignKey: 'id_user'
    })
  };
  return favorites;
};