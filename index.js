const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Evento = require('./events/Event');

// Database Connection
const connection = require('./database/connection');
const { default: slugify } = require('slugify');
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


// --- Rotas ---
// Padrão
app.get('/', (req, res) => {
  res.render('index');
});

// Criar evento
app.get('/criar', (req, res) => {
  res.render('criaEvento');
});

// Listar eventos
app.get('/evento', (req, res) => {
  res.render('evento');
});

// Salvar evento
app.post('/salvar', (req, res) => {
  let name = req.body.name;
  let local = req.body.local;
  let date = req.body.date;
  let time = req.body.time;

  if (name != undefined) {
    Evento.create({
      name: name,
      local: local,
      date: date,
      time: time,
      slug: slugify(name, { lower: true }),
    }).then(() => {
      res.redirect('/')
    })
  }else {
    alert('Verifique os campos!');
    res.redirect('/criar');
  }
});

// Servidor Express
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});