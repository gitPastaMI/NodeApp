const DataTypes = require('sequelize');
const db = require('./index');

const Delivery = db.define('Delivery', {
  delivery_num: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  delivery_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  delivery_status: {
    type: DataTypes.STRING,
    defaultValue: 'NEW'
  },
},
{
  /*
  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: true,
  */
  // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
  // to the model and throw an OptimisticLockingError error when stale instances are saved.
  // Set to true or a string with the attribute name you want to use to enable.
  version: true,
});

module.exports = Delivery;
