const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3308'
});

module.exports = sequelize;
