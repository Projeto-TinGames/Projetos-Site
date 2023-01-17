const express = require("express");
const router = express.Router();

router.get('/', function(req, res){
    res.sendFile(process.cwd() + "/views/RoboLab/home.html");
});

router.get('/projetos', function(req, res){
    res.sendFile(process.cwd() + "/views/RoboLab/projetos.html");
});

router.get('/galeria', function(req, res){
    res.sendFile(process.cwd() + "/views/RoboLab/galeria.html");
});

module.exports = router;
