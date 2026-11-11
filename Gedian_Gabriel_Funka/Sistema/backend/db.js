const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'saep_db'
})

connection.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar com o banco de dados: " , erro.message);
        return;
    }
    console.log("Conexão com o banco de dados feita com sucesso!")
})

module.exports = connection;