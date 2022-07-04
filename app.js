const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');

//Home geral
var home = require("./routes/home.js")

//TinGames
var tingamesHome = require("./routes/tingames/home.js");
var jogos = require("./routes/tingames/jogos.js");
var cursos = require("./routes/tingames/cursos.js");
var ambienteDeTestes = require("./routes/tingames/testes.js");

//Robolab
var robolabHome = require("./routes/robolab/home.js");
var robolabCursos = require("./routes/robolab/cursos.js");
var robolabPatrocine = require("./routes/robolab/patrocine.js");
var robolabCompete = require("./routes/robolab/competir.js");

//Inovalab
var inovalabHome = require("./routes/inovalab/home.js");
var inovalabCursos = require("./routes/inovalab/cursos.js");
var inovalabSobre = require("./routes/inovalab/sobre.js");
var inovalabProjetos = require("./routes/inovalab/projetos.js");
var inovalabGaleria = require("./routes/inovalab/galeria.js");
var inovalabRecursos = require("./routes/inovalab/recursos.js");

app.use('/client',express.static(__dirname + "/client"));
app.use("/", home);

app.use('/tingames/client',express.static(__dirname + "/client"));
app.use("/tingames", tingamesHome);
app.use("/tingames/projetos/jogos", jogos);
app.use("/tingames/projetos/cursos", cursos);
app.use("/tingames/ambienteDeTestes", ambienteDeTestes);

app.use('/robolab/client',express.static(__dirname + "/client"));
app.use("/robolab", robolabHome);
app.use("/robolab/cursos", robolabCursos);
app.use("/robolab/competicao", robolabCompete);
app.use("/robolab/patrocinadores", robolabPatrocine);

app.use('/inovalab/client',express.static(__dirname + "/client"));
app.use("/inovalab", inovalabHome);
app.use("/inovalab/cursos", inovalabCursos);
app.use("/inovalab/projetos", inovalabProjetos);
app.use("/inovalab/recursos", inovalabRecursos);
app.use("/inovalab/galeria", inovalabGaleria);
app.use("/inovalab/sobre", inovalabSobre);

module.exports = app;