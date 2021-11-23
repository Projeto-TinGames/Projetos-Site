const express = require("express");
const router = express.Router();

const db = require("../../server/mysqlconnection.js")

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/AmbienteDeTestes.html');
});

router.get('/jornada', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/ABCash-Jornada.html');
});

router.get('/ano64/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Ano64.html');
});

module.exports = router;