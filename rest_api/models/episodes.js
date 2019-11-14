'use strict';
module.exports = (sequelize, DataTypes) => {
  const episodes = sequelize.define('episodes', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    webtoonId: DataTypes.INTEGER
  }, {});
  episodes.associate = function(models) {
    // associations can be defined here
    episodes.belongsTo(models.webtoons, {
      as:'webtoon_id',
      foreignKey: 'webtoonId'
    })
  };
  return episodes;
};