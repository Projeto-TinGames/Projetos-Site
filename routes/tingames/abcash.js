const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/ABCash.html');
});

router.get('/usuarios', (req, res, next) => {
    var sql = "SELECT * FROM usuarios;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/tingames/abcashBanco.ejs', {tabela:"usuarios",banco: result});
    })
});

router.get('/questoes', (req, res, next) => {
    let usuario_id = req.params.usuario_id;
    var sql = "SELECT * FROM questoes;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/tingames/abcashBanco.ejs', {tabela:"questoes",banco: result});
    })
});

router.get('/respostas', (req, res, next) => {
    var sql = "SELECT * FROM respostas;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/tingames/abcashBanco.ejs', {tabela:"respostas",banco: result});
    })
});

router.get('/respostas/usuario/:id_usuario', (req, res, next) => {
    console.log(req.params.id_usuario);
    let id_usuario = req.params.id_usuario;
    var sql = "SELECT * FROM respostas WHERE id_usuario = ?;";

    db.query(sql, id_usuario,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/tingames/abcashBanco.ejs', {tabela:"respostas",banco: result});
    })
});

router.get('/respostas/questao/:id_questao', (req, res, next) => {
    let id_questao = req.params.id_questao;
    var sql = "SELECT * FROM respostas WHERE id_questao = ?;";

    db.query(sql, id_questao,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/tingames/abcashBanco.ejs', {tabela:"respostas",banco: result});
    })
});

router.get('/:usuarios_last_id', (req, res, next) => {
    var sql = "SELECT max(id) as id FROM usuarios;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});

router.post('/',(req,res,next) => {
    if (req.body.table == "usuarios") {
        var sql = "INSERT INTO usuarios (id,nome) VALUES (?, ?);";
        db.query(sql, [req.body.id, req.body.nome], (err,result) => {
            if (err) throw err;
            res.status(200).json(result);
        })
    }
    else {
        var sql = "INSERT INTO respostas (id_usuario,id_questao,resposta,data) VALUES (?, ?, ?, now());";
        db.query(sql, [req.body.usuarioId,req.body.questao[req.body.questao.length-1],req.body.resposta[req.body.resposta.length-1]], (err,result) => {
            if (err) throw err;
            res.status(200).json(result);
        })
    }
})

module.exports = router;