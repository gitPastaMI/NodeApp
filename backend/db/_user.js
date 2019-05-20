// *****************************************************************************
// https://sequelize.readthedocs.io/en/1.7.0/articles/express/
// *****************************************************************************

'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
  },
  {
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,
    // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
    // to the model and throw an OptimisticLockingError error when stale instances are saved.
    // Set to true or a string with the attribute name you want to use to enable.
    version: true,
  });

  return User;
};
