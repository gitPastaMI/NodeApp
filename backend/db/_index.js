// *****************************************************************************
// https://sequelize.readthedocs.io/en/1.7.0/articles/express/
// *****************************************************************************

'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.js')[env];

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './nodeapp.db.sqlite'
});

const db = {
  User: sequelize.import('./user.js'),
  Order: sequelize.import('./order.js'),
};

// db.User.hasMany(db.Order);
// db.Order.belongsTo(db.User);

/*
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
*/
db.sequelize = sequelize;
db.Sequelize = Sequelize;

/*
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
*/


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync();
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
