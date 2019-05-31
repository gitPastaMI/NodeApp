const DataTypes = require('sequelize');
const db = require('./index');

const Orderitem = db.define('Orderitem', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0
  },
  unit_price: {
    type: DataTypes.DECIMAL(8,2),
    default: 0
  },
  total_price: {
    type: DataTypes.DECIMAL(8,2),
    default: 0
  },
  status: {
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

module.exports = Orderitem;
