const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const { handle } = require('express/lib/application');

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O Express está rodando na porta ${PORT}`);
});

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// handle-bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// Conexão do Banco de Dados
db
    .authenticate()
    .then(() => {
        console.log("Banco de Dados conectado com sucesso :)");
    })
    .catch(err => {
        console.log("Erro ao conectar com o Banco de Dados :(");
    });

// Rotas
app.get('/', (req, res) => {
    res.render('index');
});

// Jobs Routes
app.use('/jobs', require('./routes/jobs'));