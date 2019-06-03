const Sequelize = require('sequelize');

const db = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  storage: './nodeapp.db.sqlite',
  logging: false
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    const User = require('./user');
    const Account = require('./account');
    const Order = require('./order');
    const Orderitem = require('./orderitem');
    const DeliveryGroup = require('./deliverygroup');
    const Delivery = require('./delivery');
    Account.belongsTo(User);
    Order.belongsTo(User);
    Orderitem.belongsTo(User);
    DeliveryGroup.belongsTo(User);
    Delivery.belongsTo(User);
    Order.belongsTo(Account, {foreignKey: {allowNull: false}});/*, { as: 'account', foreignKey: 'account_id', constraints: false }*/
    Order.belongsTo(Account, {as: 'Shipto'});
    Order.belongsTo(Account, {as: 'Billto'});
    Orderitem.belongsTo(Order);
    Delivery.belongsTo(DeliveryGroup);
    Orderitem.belongsTo(Delivery);
    const init = false;
    db.sync({force:init}).then(() => {
      if (init) {
        const test = require('./test');
        test.initData(db);
      }
    });
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
