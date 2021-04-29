const express = require("express");
const router = express.Router();

const db = require("../../server/mysqlconnection");

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/ABCash.html');
});

router.post('/',(req,res,next) => {
    var sql = "INSERT INTO respostas_usuarios (id,nome,questao,resposta,data) VALUES (?, ?, ?, ?, now());";
    db.query(sql, [null, req.body.nome,req.body.questao[req.body.questao.length-1],req.body.resposta[req.body.resposta.length-1]], (err,result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
})

router.get('/banco', (req, res, next) => {
    var sql = "SELECT * FROM respostas_usuarios";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/tingames/abcashBanco.ejs', {banco: result});
    })
});

router.post('/',(req,res,next) => {
    var sql = "INSERT INTO respostas_usuarios (id,nome,questao,resposta,data) VALUES (?, ?, ?, ?, now());";
    db.query(sql, [null, req.body.nome,req.body.questao[req.body.questao.length-1],req.body.resposta[req.body.resposta.length-1]], (err,result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
})

module.exports = router;