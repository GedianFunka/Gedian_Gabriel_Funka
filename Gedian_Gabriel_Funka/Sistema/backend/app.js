const express = require('express');
const cors = require('cors');
const connection = require('./db');
const server = express();

server.use(cors());
server.use(express.json());

server.get('/alunos', (req,res) => {
    const busca = req.query.busca || '';
    const termo = '%' + busca + '%';
    const sql = 'SELECT * FROM alunos WHERE nome LIKE ? OR email LIKE ? OR telefone LIKE ?';

    connection.query(sql, [termo, termo, termo], (erro, resultado) =>{
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        res.json(resultado);

        });
    });

server.post('/alunos', (req,res) => {
    const {nome, idade, cpf, email, telefone} = req.body;

    const sql = 'INSERT INTO alunos (nome, idade, cpf, email, telefone) VALUES (?,?,?,?,?)';

    connection.query(sql, [nome, idade, cpf, email, telefone], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({erro: erro.message});
    }
    res.status(201).json({mensagem: 'Aluno cadastrado com sucesso!'})
    });
});

server.put('/alunos/:id', (req,res) => {
    const {id} = req.params;
    const {nome, idade, cpf, email, telefone} = req.body;

    const sql = 'UPDATE alunos SET nome = ?, idade = ?, cpf = ?, email = ?, telefone = ? WHERE  id_Alunos = ?';

    connection.query(sql, [nome, idade, cpf, email, telefone, id], (erro, resultado) =>{
        if (erro){
        return res.status(500).json({erro: erro.message});
     }
    return res.json({mensagem: 'Aluno atualizado com sucesso!'});
    });
});

server.delete('/alunos/:id', (req, res) => {
    const {id} = req.params;
    
    const sql = 'DELETE FROM alunos WHERE id_Alunos = ?';

    connection.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        res.json({mensagem: 'Aluno deletado com sucesso!'});
    })
})

server.get('/agendamentos', (req, res) =>{

    const sql = 'SELECT ag.id_Agendamento, ag.data_aula, ag.personal, al.nome, al.idade, al.telefone, al.email, p.tipo, p.descricao, p.objetivo FROM agendamento ag JOIN alunos al ON ag.Alunos_id_Alunos = al.id_Alunos JOIN plano_treino p ON ag.Plano_treino_id_Plano_treino = p.id_Plano_treino ORDER BY ag.data_aula';

    connection.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao listar agendamentos: " + erro.message});
        }
        res.json(resultado);
    });
});

server.put('/agendamentos/:id', (req, res) => {
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

server.post('/plano_treino', (req,res) => {
    const {tipo, descricao, objetivo, Alunos_id_Alunos} = req.body;

    const sql = 'INSERT INTO plano_treino (tipo, descricao, objetivo, Alunos_id_Alunos) VALUES (?,?,?,?)';

    connection.query(sql, [tipo, descricao, objetivo, Alunos_id_Alunos], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao cadastrar plano de treino: " + erro.message})
        }
        res.status(201).json({mensagem: "Plano de treino cadastrado com sucesso!"});
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});