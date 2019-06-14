const DataTypes = require('sequelize');
const db = require('./index');

const Forecast = db.define('Forecast', {
  forecast_hatkey: {
    type:  DataTypes.STRING
  },
  forecast_product_key: {
    type: DataTypes.STRING
  },
  forecast_qty: {
    type: DataTypes.INTEGER
  },
},
{
  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  // paranoid: true,

  // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
  // to the model and throw an OptimisticLockingError error when stale instances are saved.
  // Set to true or a string with the attribute name you want to use to enable.
  // version: true,
});

module.exports = Forecast;
