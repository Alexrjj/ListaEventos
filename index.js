const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// View Engine
app.set('view engine', 'ejs');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Arquivos estáticos
app.use(express.static('public'));

// Rota padrão
app.get('/', (req, res) => {
  res.send('Olá mundo!');
});

// Servidor Express
app.listen(3000, () => {
  console.log(`Server started on port ${3000}`);
});