const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/RoboLab/home.html");
});

router.get("/projetos", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/RoboLab/projetos.html");
});

module.exports = router;
