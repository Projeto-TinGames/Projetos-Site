const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/TinGames/Clube/home.html");
});

router.get("/jogos", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/TinGames/Clube/jogos.html");
});

router.get("/alt", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/TinGames/Clube/Alt/home.html");
});

router.get("/alt/jogos", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/TinGames/Clube/Alt/jogos.html");
});

module.exports = router;