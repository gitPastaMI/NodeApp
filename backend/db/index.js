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
    // db.models.User.hasMany(db.models.Order);
    db.models.Order.belongsTo(db.models.User);
    db.sync();
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
