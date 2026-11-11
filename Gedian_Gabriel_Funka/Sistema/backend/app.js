const express = require('express');
const cors = require('cors');
const connection = require('./db');
const server = express();
const session = require('express-session');
const bcrypt = require('bcrypt')

server.use(cors());
server.use(express.json());
const path = require('path');
server.use(express.static(path.join(__dirname, '..', 'frontend')));

//Login
server.use(session({
    secret: 'segredo_academia',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 30 * 60 * 1000} // vai expirar em 30 minutos
}));

//Verifica se o usuário está logado antes de acessar as rotas protegidas
function verificarLogin(req, res, next) {
    if(!req.session.usuario){
        return res.status(401).json({erro: 'Sessão expirada. Faça login novamente.'});
    }
    next();
}

server.post('/login', (req, res) => {
    const {email, senha} = req.body;

    if(!email || !senha) {
        return res.status(400).json({erro: 'Preencha email e senha'});
    }

    connection.query('SELECT * FROM usuario WHERE email = ?', [email], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        if(resultado.length === 0){
            return res.status(401).json({erro: 'Usuário não encontrado'});
        }

        const usuario = resultado[0];

        bcrypt.compare(senha, usuario.senha, (erro, resultadoComparacao) =>{
            if(erro){
                return res.status(500).json({erro: erro.message});
            }
            if(!resultadoComparacao){
                return res.status(401).json({erro: 'Senha incorreta'});
            }

            req.session.usuario = {id: usuario.id_Usuario, nome: usuario.nome};
            res.json({mensagem: 'Login realizado com sucesso', nome: usuario.nome});
        });
    });
});

//Buscar usuário logado
server.get('/usuario-logado', (req, res) =>{
    if(!req.session.usuario){
        return res.status(401).json({erro: 'Usuário não logado'});
    }
    res.json({usuario: req.session.usuario});
});

server.post('/logout', (req,res) => {
    req.session.destroy(() => {
        res.json({mensagem: 'Logout realizado com sucesso'});
    });
});

// Rotas para alunos
server.get('/alunos', verificarLogin, (req,res) => {
    const busca = req.query.busca || '';
    const termo = '%' + busca + '%';
    const sql = 'SELECT id_Alunos, nome, idade, email, telefone FROM alunos WHERE nome LIKE ? OR email LIKE ? OR telefone LIKE ?';

    connection.query(sql, [termo, termo, termo], (erro, resultado) =>{
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        res.json(resultado);

        });
    });

//Atualizar alunos
server.put('/alunos/:id', verificarLogin, (req,res) => {
    const {id} = req.params;
    const {nome, idade, cpf, email, telefone} = req.body;

    //Atualizando e mantendo o CPF
    if(!cpf){
        const sql = 'UPDATE alunos SET nome = ?, idade = ?, email = ?, telefone = ? WHERE id_Alunos = ?';

        connection.query(sql, [nome, idade, email, telefone, id], (erro, resultado) => {
            if(erro){
                return res.status(500).json({erro: erro.message});
            }
            res.json({mensagem: 'Aluno atualizado com sucesso!'});
        
        });
        return;
    }

    bcrypt.hash(cpf, 10, (erroHash, cpfCriptografado) => {
        if(erroHash) {
            return res.status(500).json({erro: erroHash.message});
        }

    const sql = 'UPDATE alunos SET nome = ?, idade = ?, cpf = ?, email = ?, telefone = ? WHERE  id_Alunos = ?';

    connection.query(sql, [nome, idade, cpfCriptografado, email, telefone, id], (erro, resultado) =>{
        if (erro){
        return res.status(500).json({erro: erro.message});
     }
    return res.json({mensagem: 'Aluno atualizado com sucesso!'});
        });
    });
});

// Rotas para agendamentos
server.get('/agendamentos', verificarLogin, (req, res) =>{

    const sql = 'SELECT ag.id_Agendamento, ag.data_aula, ag.personal, al.nome, al.idade, al.telefone, al.email, p.tipo, p.descricao, p.objetivo FROM agendamento ag JOIN alunos al ON ag.Alunos_id_Alunos = al.id_Alunos JOIN plano_treino p ON ag.Plano_treino_id_Plano_treino = p.id_Plano_treino ORDER BY ag.data_aula';

    connection.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao listar agendamentos: " + erro.message});
        }
        res.json(resultado);
    });
});

//Atualizando agendamentos
server.put('/agendamentos/:id', verificarLogin, (req, res) => {
    const {id} = req.params;
    const {data_aula, personal, Alunos_id_Alunos, Plano_treino_id_Plano_treino} = req.body;

    const sql = 'UPDATE agendamento SET data_aula = ? WHERE id_Agendamento = ?';

    connection.query(sql, [data_aula, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao atualizar agendamento: " + erro.message});
        }
        res.json({mensagem: "Agendamento atualizado com sucesso!"});

    });
});

// Rotas para plano de treino
server.post('/plano_treino', verificarLogin, (req,res) => {
    const {tipo, descricao, objetivo, Alunos_id_Alunos} = req.body;

    const sql = 'INSERT INTO plano_treino (tipo, descricao, objetivo, Alunos_id_Alunos) VALUES (?,?,?,?)';

    connection.query(sql, [tipo, descricao, objetivo, Alunos_id_Alunos], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao cadastrar plano de treino: " + erro.message})
        }
        res.status(201).json({mensagem: "Plano de treino cadastrado com sucesso!"});
    });
});

server.listen(5000, () => {
    console.log('Servidor rodando na porta 3000');
});