'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
  };
  return Trip;
};