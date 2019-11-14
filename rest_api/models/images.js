'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    page: DataTypes.INTEGER,
    image: DataTypes.STRING,
    webtoonId: DataTypes.INTEGER,
    episodeId: DataTypes.INTEGER,
  }, {});
  images.associate = function(models) {
    // associations can be defined here
    images.belongsTo(models.webtoons, {
      as:'webtoon_id',
      foreignKey: 'webtoonId'
    })
    images.belongsTo(models.episodes, {
      as:'episode',
      foreignKey: 'episodeId'
    })
  };
  return images;
};