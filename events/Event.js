const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Evento = connection.define('eventos', {
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

Evento.sync({force: false})

module.exports = Evento;