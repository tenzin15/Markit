'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bookmarks = sequelize.define('Bookmarks', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.BIGINT,
    folder_title: DataTypes.STRING,
    folder_id: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Bookmarks;
};