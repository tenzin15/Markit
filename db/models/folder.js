'use strict';
module.exports = function(sequelize, DataTypes) {
  var Folder = sequelize.define('Folder', {
    folderTitle: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Folder;
};