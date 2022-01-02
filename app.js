const express = require('express');
const app = express();
const db = require('./db/connection');

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O Express está rodando na porta ${PORT}`);
});

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
    res.send("Está funcionando :)");
});