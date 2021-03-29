const express = require('express');
const app = express();

//Home geral
var home = require("./routes/home.js")

//TinGames
var tingamesHome = require("./routes/tingames/home.js");
var jogoDaVelha = require("./routes/tingames/jogoDaVelha.js");
var abcash = require("./routes/tingames/abcash.js");
var sobre = require("./routes/tingames/sobre.js");
var projetos = require("./routes/tingames/projetos.js");

//Robolab
var robolabHome = require("./routes/robolab/home.js");
var robolabCursos = require("./routes/robolab/cursos.js");
var robolabPatrocine = require("./routes/robolab/patrocine.js");
var robolabCompete = require("./routes/robolab/competir.js");

//Inovalab
var inovalabHome = require("./routes/inovalab/home.js");

app.use('/client',express.static(__dirname + "/client"));
app.use("/", home);

app.use('/tingames/client',express.static(__dirname + "/client"));
app.use("/tingames", tingamesHome);
app.use("/tingames/jogo-da-velha", jogoDaVelha);
app.use("/tingames/abcash", abcash);
app.use("/tingames/sobre", sobre);
app.use("/tingames/projetos", projetos);

app.use('/robolab/client',express.static(__dirname + "/client"));
app.use("/robolab", robolabHome);
app.use("/robolab/cursos", robolabCursos);
app.use("/robolab/competicao", robolabCompete);
app.use("/robolab/patrocinadores", robolabPatrocine);

app.use('/inovalab/client',express.static(__dirname + "/client"));
app.use("/inovalab", inovalabHome);

module.exports = app;