const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/TinGames/Main/home.html");
});

router.get("/projetos/", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/TinGames/Main/projetos.html");
});

module.exports = router;