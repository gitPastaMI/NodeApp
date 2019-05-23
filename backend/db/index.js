const Sequelize = require('sequelize');

const db = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  storage: './nodeapp.db.sqlite'
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    const User = require('./user');
    const Account = require('./account');
    const Order = require('./order');
    Account.belongsTo(User);
    Order.belongsTo(User);
    Order.belongsTo(Account);/*, { as: 'account', foreignKey: 'account_id', constraints: false }*/
    Order.belongsTo(Account, {as: 'Shipto'});
    Order.belongsTo(Account, {as: 'Billto'});
    db.sync();
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
