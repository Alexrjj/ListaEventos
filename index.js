const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Event = require('./events/Event');
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
  Event.findAll().then(events => {
    res.render('index', { events: events, moment: moment })
  })
});

// Criar evento
app.get('/criar', (req, res) => {
  res.render('criaEvento');
});

// Listar evento e convidados
app.get('/evento/:id', (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.redirect('/');
  }

  Event.findByPk(id).then(event => {
    if (event != undefined) {
      Guest.findAll({
        where: {
          eventId: id,
        }
      }).then(guest => {
        res.render('evento', { event: event, guest: guest });
      })
    } else {
      res.redirect('/');
    }
  }).catch(err => {
    console.log(err);
    res.redirect('/');
  });
});

// Criar convidado, usando função async
app.post('/salvarConvidado', async (req, res) => {
  let name = req.body.name;
  let rg = req.body.rg;
  let id = req.body.id;

  const convidado = await Guest.findOne({ where: { name: name } });
  if (convidado !== null) {
    Guest.create({ name: name, rg: rg, eventId: id, }) };
    res.redirect('/evento/' + id);
});

// Salvar evento
app.post('/salvar', (req, res) => {
  let name = req.body.name;
  let local = req.body.local;
  let date = req.body.date;
  let time = req.body.time;

  if (name != undefined) {
    Event.create({
      name: name,
      local: local,
      date: date,
      time: time,
      slug: slugify(name, { lower: true }),
    }).then(() => {
      res.redirect('/')
    })
  } else {
    alert('Verifique os campos!');
    res.redirect('/criar');
  }
});

// Deletar evento
app.post('/deletar', (req, res) => {
  let id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Event.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
});

// Servidor Express
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});