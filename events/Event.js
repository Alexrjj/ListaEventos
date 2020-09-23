const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Event = connection.define('events', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  local: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Event.sync({force: false})

module.exports = Event;