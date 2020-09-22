const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Event = require('../events/Event');

const Guest = connection.define('guests', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rg: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Guest.sync({ force: false });

// Relacionamentos
Event.hasMany(Guest); // Um evento possui muitos convidados.
Guest.belongsTo(Event); // Um convidado só pertence a um evento.

module.exports = Guest;