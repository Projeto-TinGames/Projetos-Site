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

//Home principal
var home = require("./routes/home.js")

//TinGames
var tingamesHome = require("./routes/TinGames/main.js");
var jogos = require("./routes/TinGames/jogos.js");
var cursos = require("./routes/TinGames/cursos.js");
var clube = require("./routes/TinGames/clube.js");
var ambienteDeTestes = require("./routes/TinGames/testes.js");

//Robolab
var robolabHome = require("./routes/RoboLab/home.js");
var robolabCursos = require("./routes/RoboLab/cursos.js");
var robolabPatrocine = require("./routes/RoboLab/patrocine.js");
var robolabCompete = require("./routes/RoboLab/competir.js");

//Inovalab
var inovalabHome = require("./routes/InovaLab/home.js");
var inovalabCursos = require("./routes/InovaLab/cursos.js");
var inovalabSobre = require("./routes/InovaLab/sobre.js");
var inovalabProjetos = require("./routes/InovaLab/projetos.js");
var inovalabGaleria = require("./routes/InovaLab/galeria.js");
var inovalabRecursos = require("./routes/InovaLab/recursos.js");

app.use("/client",express.static(__dirname + "/client"));
app.use("/", home);

app.use("/tingames/client",express.static(__dirname + "/client"));
app.use("/tingames", tingamesHome);
app.use("/tingames/projetos/jogos", jogos);
app.use("/tingames/projetos/cursos", cursos);
app.use("/tingames/projetos/clube", clube);
app.use("/tingames/testes", ambienteDeTestes);

app.use("/robolab/client",express.static(__dirname + "/client"));
app.use("/robolab", robolabHome);
app.use("/robolab/cursos", robolabCursos);
app.use("/robolab/competicao", robolabCompete);
app.use("/robolab/patrocinadores", robolabPatrocine);

app.use("/inovalab/client",express.static(__dirname + "/client"));
app.use("/inovalab", inovalabHome);
app.use("/inovalab/cursos", inovalabCursos);
app.use("/inovalab/projetos", inovalabProjetos);
app.use("/inovalab/recursos", inovalabRecursos);
app.use("/inovalab/galeria", inovalabGaleria);
app.use("/inovalab/sobre", inovalabSobre);

module.exports = app;