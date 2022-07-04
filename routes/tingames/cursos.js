const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Home/Cursos.html');
});

router.get('/games&logica', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Cursos/Games&Logica.html');
});

router.get('/pygame', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Cursos/PyGame.html');
});


module.exports = router;