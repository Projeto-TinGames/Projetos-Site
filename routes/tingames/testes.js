const express = require("express");
const router = express.Router();

const db = require("../../Server/mysqlconnection.js")

router.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + "/Views/TinGames/Testes/testes.html");
});

router.get("/jornada/", (req, res, next) => {
    res.sendFile(process.cwd() + "/Views/TinGames/Testes/abcash_jornada.html");
});

router.get("/jornada/teste/", (req, res, next) => {
    res.sendFile(process.cwd() + "/Views/TinGames/ABCash/abcash_jornada.html");
});

router.get("/ano64/", (req, res, next) => {
    res.sendFile(process.cwd() + "/Views/TinGames/Testes/ano64.html");
});

router.get("/ano64/teste/", (req, res, next) => {
    res.sendFile(process.cwd() + "/Views/TinGames/Ano64/ano64.html");
});

module.exports = router;