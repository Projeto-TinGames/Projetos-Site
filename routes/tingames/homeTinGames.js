const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/HomeTinGames/TinGames.html');
});

router.get('/projetos/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/HomeTinGames/Projetos.html');
});

router.get('/cursos/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/HomeTinGames/Cursos.html');
});

router.get('/sobre/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/HomeTinGames/Sobre.html');
});

module.exports = router;