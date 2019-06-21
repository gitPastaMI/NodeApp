const Sequelize = require('sequelize');

// const db = new Sequelize({
//   host: 'localhost',
//   dialect: 'sqlite',
//   storage: './nodeapp.db.sqlite',
//   logging: false
// });

const db = new Sequelize('nodeapp_dev', 'nodeapp', 'nodeapp', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

const SYNCDB = false;
const INITDB = false;

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
    const Forecast = require('./forecast');

    Account.belongsTo(User);

    Order.belongsTo(User);
    Order.belongsTo(Account, {foreignKey: {allowNull: false}});/*, { as: 'account', foreignKey: 'account_id', constraints: false }*/
    Order.belongsTo(Account, {as: 'Shipto'});
    Order.belongsTo(Account, {as: 'Billto'});
    Orderitem.belongsTo(User);
    Orderitem.belongsTo(Order);
    Orderitem.belongsTo(Delivery);

    DeliveryGroup.belongsTo(User);
    DeliveryGroup.hasMany(Delivery);
    Delivery.belongsTo(User);
    Delivery.belongsTo(Account, {foreignKey: {allowNull: false}});
    Delivery.belongsTo(Account, {as: 'Shipto'});

    Forecast.belongsTo(User);

    db.sync({force:SYNCDB}).then(() => {
      if (INITDB) {
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
