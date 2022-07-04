const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Home/Home.html');
});

router.get('/projetos/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Home/Projetos.html');
});

router.get('/projetos/clube/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Home/Clube.html');
});

router.get('/sobre/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Home/Sobre.html');
});

module.exports = router;