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

module.exports = router;