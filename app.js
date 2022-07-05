const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.set("view engine", "ejs");

//Home geral
var home = require("./Routes/home.js")

//TinGames
var tingamesHome = require("./Routes/TinGames/main.js");
var jogos = require("./Routes/TinGames/jogos.js");
var cursos = require("./Routes/TinGames/cursos.js");
var clube = require("./Routes/TinGames/clube.js");
var ambienteDeTestes = require("./Routes/TinGames/testes.js");

//Robolab
var robolabHome = require("./Routes/RoboLab/home.js");
var robolabCursos = require("./Routes/RoboLab/cursos.js");
var robolabPatrocine = require("./Routes/RoboLab/patrocine.js");
var robolabCompete = require("./Routes/RoboLab/competir.js");

//Inovalab
var inovalabHome = require("./Routes/InovaLab/home.js");
var inovalabCursos = require("./Routes/InovaLab/cursos.js");
var inovalabSobre = require("./Routes/InovaLab/sobre.js");
var inovalabProjetos = require("./Routes/InovaLab/projetos.js");
var inovalabGaleria = require("./Routes/InovaLab/galeria.js");
var inovalabRecursos = require("./Routes/InovaLab/recursos.js");

app.use("/client",express.static(__dirname + "/Client"));
app.use("/", home);

app.use("/tingames/client",express.static(__dirname + "/Client"));
app.use("/tingames", tingamesHome);
app.use("/tingames/projetos/jogos", jogos);
app.use("/tingames/projetos/cursos", cursos);
app.use("/tingames/projetos/clube", clube);
app.use("/tingames/testes", ambienteDeTestes);

app.use("/robolab/client",express.static(__dirname + "/Client"));
app.use("/robolab", robolabHome);
app.use("/robolab/cursos", robolabCursos);
app.use("/robolab/competicao", robolabCompete);
app.use("/robolab/patrocinadores", robolabPatrocine);

app.use("/inovalab/client",express.static(__dirname + "/Client"));
app.use("/inovalab", inovalabHome);
app.use("/inovalab/cursos", inovalabCursos);
app.use("/inovalab/projetos", inovalabProjetos);
app.use("/inovalab/recursos", inovalabRecursos);
app.use("/inovalab/galeria", inovalabGaleria);
app.use("/inovalab/sobre", inovalabSobre);

module.exports = app;