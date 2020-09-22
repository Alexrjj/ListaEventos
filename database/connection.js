const { Module } = require('module');
const Sequelize = require('sequelize');

const connection = new Sequelize('eventos', 'root', 'rootroot', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;