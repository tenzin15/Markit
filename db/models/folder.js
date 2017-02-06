'use strict';
module.exports = function(sequelize, DataTypes) {
  var Folder = sequelize.define('Folder', {
    title: DataTypes.STRING,
    user_id: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Folder;
};