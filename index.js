const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Evento = require('./events/Event');
const Guest = require('./guests/Guest');
const moment = require('moment');

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
// Listar eventos
app.get('/', (req, res) => {
  Evento.findAll().then(eventos => {
    res.render('index', {eventos: eventos, moment: moment})
  })
});

// Criar evento
app.get('/criar', (req, res) => {
  res.render('criaEvento');
});

// Listar evento e convidados
app.get('/evento/:id', (req, res) => {
  let id = req.params.id;
  if(isNaN(id)) {
    res.redirect('/');
  }

  Evento.findByPk(id).then(event => {
    if(event != undefined) {
      res.render('evento', {event: event})
    } else {
      res.redirect('/');
    }
  }).catch(err => {
    console.log(err);
    res.redirect('/');
  });

  Guest.findAll().then(guests => {
    res.render('evento', {guests: guests});
  });  
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

// Deletar evento
app.post('/deletar', (req, res) => {
  let id = req.body.id;
  if(id != undefined) {
    if (!isNaN(id)) {
      Evento.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect('/');
      });
    }else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
});

// Acessar ID evento
app.get('/:id', (req, res) => {
  let id = req.params.id;
  Evento.findOne({
    where: {
      id: id
    }
  });
});

// Criar convidado
app.post('/salvarConvidado', (req, res) => {
  let name = req.body.name;
  let rg = req.body.rg;

  if(name != undefined) {
    Guest.create({
      name: name,
      rg: rg
    });
  }
});

// Servidor Express
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});