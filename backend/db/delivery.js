const DataTypes = require('sequelize');
const db = require('./index');

const Delivery = db.define('Delivery', {
  delivery_status: {
    type: DataTypes.STRING,
    defaultValue: 'NEW'
  },
  delivery_weight: {
    type: DataTypes.DECIMAL(8,2),
    default: 0
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

Delivery.addHook('afterSave', (delivery, options) => {
  if (delivery.DeliveryGroupId) {
    db.models.DeliveryGroup.findByPk(delivery.DeliveryGroupId).then(group => {
      group.dg_deliveries += 1;
      group.dg_weight += delivery.delivery_weight;
    });
  }
});

module.exports = Delivery;
