const express = require("express");
const router = express.Router();

const db = require("../../server/mysqlconnection.js")

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/AmbienteDeTestes/AmbienteDeTestes.html');
});

router.get('/jornada/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/AmbienteDeTestes/AmbienteJornada.html');
});

router.get('/jornada/teste/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/ABCash/ABCash-Jornada.html');
});

router.get('/ano64/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/AmbienteDeTestes/AmbienteAno64.html');
});

router.get('/ano64/teste/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Ano64/Ano64.html');
});

module.exports = router;