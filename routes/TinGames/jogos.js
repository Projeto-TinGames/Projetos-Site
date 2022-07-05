const express = require("express");
const router = express.Router();

const db = require(process.cwd() + "/server/mysqlconnection.js")

router.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/TinGames/Jogos/home.html");
});

router.get("/jogo-da-velha", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/TinGames/Jogos/JogoDaVelha/jogo_da_velha.html");
});

//#region ABCash
router.get("/abcash/questionario", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/TinGames/Jogos/ABCash/abcash_questionario.html");
});

router.get("/abcash/questionario/entradas/", (req, res, next) => {
    var sql = "SELECT * FROM entradas;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render(process.cwd() + "/views/TinGames/Jogos/ABCash/abcash_banco.ejs", {tabela:"entradas",banco: result});
    })
});

router.get("/abcash/questionario/usuario/:id_usuario", (req, res, next) => {
    let id_usuario = req.params.id_usuario;
    var sql = "SELECT * FROM entradas WHERE id_usuario = ?;";

    db.query(sql, id_usuario,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + "/views/TinGames/Jogos/ABCash/abcash_banco.ejs", {tabela:"entradas",banco: result});
    })
});

router.get("/abcash/questionario/questao/:id_questao", (req, res, next) => {
    let id_questao = req.params.id_questao;
    var sql = "SELECT * FROM entradas WHERE id_questao = ?;";

    db.query(sql, id_questao,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + "/views/TinGames/Jogos/ABCash/abcash_banco.ejs", {tabela:"entradas",banco: result});
    })
});

router.get("/abcash/questionario/resposta/:id_resposta", (req, res, next) => {
    let id_resposta = req.params.id_resposta;
    var sql = "SELECT * FROM entradas WHERE id_resposta = ?;";

    db.query(sql, id_resposta,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + "/views/TinGames/Jogos/ABCash/abcash_banco.ejs", {tabela:"entradas",banco: result});
    })
});

router.post("/abcash/entradas",(req,res,next) => {
    var sql = "INSERT INTO entradas (id_usuario,id_questao,id_resposta,data) VALUES (?, ?, ?, now());";
    db.query(sql, [req.body.usuarioId,req.body.questao[req.body.questao.length-1],req.body.resposta[req.body.resposta.length-1]], (err,result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});

router.get("/abcash/questionario/usuarios", (req, res, next) => {
    var sql = "SELECT * FROM usuarios;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render(process.cwd() + "/views/TinGames/Jogos/ABCash/abcash_banco.ejs", {tabela:"usuarios",banco: result});
    })
});

router.get("/abcash/usuarios_last_id", (req, res, next) => {
    var sql = "SELECT max(id) as id FROM usuarios;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0].id);
    })
});

router.post("/abcash/usuarios",(req,res,next) => {
    var sql = "INSERT INTO usuarios (id,nome) VALUES (?, ?);";
    db.query(sql, [req.body.id, req.body.nome], (err,result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});

router.post("/abcash/questoes",(req,res,next) => {
    var sql = "INSERT INTO questoes (id) VALUES (?);";
    db.query(sql, [req.body.id], (err,result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});

router.get("/abcash/questionario/questoes", (req, res, next) => {
    var sql = "SELECT * FROM questoes;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render(process.cwd() + "/views/TinGames/Jogos/ABCash/abcash_banco.ejs", {tabela:"questoes",banco: result});
    })
});

router.delete("/abcash/questoes/:id_questao",(req,res,next) => {
    let sql = "SET FOREIGN_KEY_CHECKS=0;DELETE from questoes WHERE id = ?;SET FOREIGN_KEY_CHECKS=1;";
    let id_questao = req.params.id_questao;
    db.query(sql, id_questao, (err,result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
})

router.get("/abcash/questionario/respostas", (req, res, next) => {
    var sql = "SELECT * FROM respostas;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render(process.cwd() + "/views/TinGames/Jogos/ABCash/abcash_banco.ejs", {tabela:"respostas",banco: result});
    })
});

router.get("/abcash/respostas_last_id", (req, res, next) => {
    var sql = "SELECT max(id) as id FROM respostas;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0].id);
    })
});

router.post("/abcash/respostas",(req,res,next) => {
    var sql = "INSERT INTO respostas (id,texto) VALUES (?,?);";
    db.query(sql, [req.body.id,req.body.texto], (err,result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});

router.delete("/abcash/respostas/:id_resposta",(req,res,next) => {
    let sql = "SET FOREIGN_KEY_CHECKS=0;DELETE from respostas WHERE id = ?;SET FOREIGN_KEY_CHECKS=1;";
    let id_resposta = req.params.id_resposta;
    db.query(sql, id_resposta, (err,result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
})
//#endregion

module.exports = router;