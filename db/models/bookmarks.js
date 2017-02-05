'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bookmarks = sequelize.define('Bookmarks', {
    bmTitle: DataTypes.STRING,
    url: DataTypes.STRING,
    folder_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Bookmarks;
};