const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Evento = require('./events/Event');

// Database Connection
const connection = require('./database/connection');
connection.authenticate().then(() => {
  console.log('DB Ok');
}).catch((msgErro) => {
  console.log(msgErro);
});

// View Engine
app.set('view engine', 'ejs');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Arquivos estáticos
app.use(express.static('public'));

// Rota padrão
app.get('/', (req, res) => {
  res.render('index');
});

// Rota criar evento
app.get('/criar', (req, res) => {
  res.render('criaEvento');
});

// Rota listar eventos
app.get('/evento', (req, res) => {
  res.render('evento');
});

// Servidor Express
app.listen(3000, () => {
  console.log(`Server started on port ${3000}`);
});