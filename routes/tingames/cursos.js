const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + "/Views/TinGames/Cursos/home.html");
});

router.get("/games&logica", (req, res, next) => {
    res.sendFile(process.cwd() + "/Views/TinGames/Cursos/games&logica.html");
});

router.get("/pygame", (req, res, next) => {
    res.sendFile(process.cwd() + "/Views/TinGames/Cursos/pygame.html");
});


module.exports = router;