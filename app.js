var express = require('express');
var app = express();
var server = require('http').Server(app);

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

app.use('/inovalab/client',express.static(__dirname + "/client"));
app.use("/inovalab", inovalabHome);

server.listen(3000);

console.log("Server Started");

var packGlobal = undefined;
var inGame = false;

var SOCKET_LIST = {};

var io = require('socket.io')(server,{});
io.sockets.on('connection',(socket) => {
    socket.id = Math.random();
    socket.ready = false;
    socket.inGame = false;
    SOCKET_LIST[socket.id] = socket;
    console.log(socket.id + " Connected");
    
    socket.on("MouseDown", (data) => {
        if (inGame && packGlobal.Jogador.list[socket.id] != undefined) {
            jogador = packGlobal.Jogador.list[socket.id];
            casaSelecionada = packGlobal.tabuleiro.TestaColisoes(data.x,data.y);
            if (casaSelecionada != undefined && jogador.index == packGlobal.turno) {
                AtualizaJogo(casaSelecionada,jogador,socket);
            }
        }
    })

    socket.on("IniciarJogo", (data) => {
        if (!inGame) {
            var socketsPreparados = [];
            for (i in SOCKET_LIST) {
                if (SOCKET_LIST[i].ready) {
                    socketsPreparados.push(SOCKET_LIST[i]);
                }
                SOCKET_LIST[i].emit("ResetaPoderes");
            }
            if (socketsPreparados.length >= data) {
                var Globais = require("./server/globais.js");
                packGlobal = Globais(socketsPreparados,data);
                packGlobal.AtualizaJogoDaVelha = AtualizaJogoDaVelha;
                packGlobal.TesteVitoria = TesteVitoria;
                for (var j in socketsPreparados) {
                    socketsPreparados[j].inGame = true;
                }
                inGame = true;
            }
            else {
                socket.emit("Erro", "Quantidade insuficiente de jogadores online");
            }
        }
        else {
            socket.emit("Erro", "Uma partida já está em andamento");
        }
    })

    socket.on("EntrarSala", (name) => {
        socket.name = name;
    })

    socket.on("Ready", () => {
        socket.ready = !socket.ready;
    })

    socket.on("disconnect", () => {
        if (packGlobal != undefined) {
            if (packGlobal.Jogador.list[socket.id] != undefined) {
                inGame = false;
            }
            packGlobal.Jogador.onDisconnect(socket);
        }
        delete SOCKET_LIST[socket.id];
    })
})

function AtualizaJogo(casa,jogador,socket) {
    module.exports = packGlobal;

    if (packGlobal.etapa == "Posicionar Poderes") {
        AtualizaPosicionaPoder(casa,jogador,socket);
    }
    else {
        if (!jogador.casasInvalidas.includes(casa)) {
            AtualizaJogoDaVelha(casa,jogador);
        }
    }
}

function AtualizaPosicionaPoder(casa,jogador,socket) {
    socket.emit("PosicionaPoder", {casa:casa,poder:jogador.poderes[0]})
    casa.ColocaPoder(jogador.poderes[0]);
    jogador.PosicionaPoder(casa);
    
    if (jogador.poderes.length == 0) {
        packGlobal.turno++;
        if (packGlobal.turno == packGlobal.maximoJogadores) {
            packGlobal.turno = 0;
            packGlobal.etapa = "Jogo da Velha";
        }
    }
}

function AtualizaJogoDaVelha(casa,jogador) {
    valor = jogador.valor;
    for (i in packGlobal.Jogador.list) {
        packGlobal.Jogador.list[i].ReduzirCasa(casa);
    }
    casa.valor = valor;
    casa.ExecutaPoderes(jogador);
    if (!packGlobal.cancelarTesteVitoria) {
        TesteVitoria(casa.valor)
    }

    if (packGlobal.cancelarPassarTurno == 0) {
        packGlobal.turno++;
        if (packGlobal.turno == packGlobal.maximoJogadores) {
            packGlobal.turno = 0;
        }
    }
    else {
        packGlobal.cancelarPassarTurno--;
    }

    //Empate
    for (i in packGlobal.Jogador.list) {
        if (packGlobal.Jogador.list[i].index == packGlobal.turno) {
            if (packGlobal.Jogador.list[i].casasValidas == 0) {
                for (j in SOCKET_LIST) {
                    socket = SOCKET_LIST[j];
                    socket.inGame = false;
                }
                inGame = false;
            }
            break;
        }
    }
}

function TesteVitoria(valor) {
    return TesteHorizontal(valor) || TesteVertical(valor) || TesteDiagonalHorizontal(valor) || TesteDiagonalVertical(valor);
}

function TesteHorizontal(valor) {
    for (l = 0; l < packGlobal.tabuleiro.linhas; l++) {
        contador = 0;
        casasVitoria = [];
        for (c = 0; c < packGlobal.tabuleiro.colunas; c++) {
            if (packGlobal.tabuleiro.casas[l][c].valor == valor) {
                contador += 1;
                casasVitoria.push(packGlobal.tabuleiro.casas[l][c]);
            }
            else {
                contador = 0;
                casasVitoria = [];
            }
            if (contador == 3) {
                LinhaVitoria(casasVitoria);
                return true;
            }
        }
    }
}

function TesteVertical(valor) {
    for (c = 0; c < packGlobal.tabuleiro.linhas; c++) {
        contador = 0;
        casasVitoria = [];
        for (l = 0; l < packGlobal.tabuleiro.linhas; l++) {
            if (packGlobal.tabuleiro.casas[l][c].valor == valor) {
                contador += 1;
                casasVitoria.push(packGlobal.tabuleiro.casas[l][c]);
            }
            else {
                contador = 0;
                casasVitoria = [];
            }
            if (contador == 3) {
                LinhaVitoria(casasVitoria);
                return true; 
            }
        }
    }
}

function TesteDiagonalHorizontal(valor) {
    for (c = 0; c < packGlobal.tabuleiro.colunas - 2; c++) {
        contador = 0
        casasVitoria = []
        for (l = 0; l < packGlobal.tabuleiro.linhas; l++) {
            if (l+c < packGlobal.tabuleiro.colunas) {
                if (packGlobal.tabuleiro.casas[l][l+c].valor == valor) {
                    contador += 1;
                    casasVitoria.push(packGlobal.tabuleiro.casas[l][l+c]);
                }
                else {
                    contador = 0;
                    casasVitoria = [];
                }
                if (contador == 3) {
                    LinhaVitoria(casasVitoria);
                    return true;
                }
            }
        }
    }
                
    for (c = 0; c < packGlobal.tabuleiro.colunas - 2; c++) {
        contador = 0;
        casasVitoria = [];
        for (l = 0; l < packGlobal.tabuleiro.linhas; l++) {
            if (l+c < packGlobal.tabuleiro.colunas) {
                if (packGlobal.tabuleiro.casas[l][packGlobal.tabuleiro.colunas-1-l-c].valor == valor) {
                    contador += 1;
                    casasVitoria.push(packGlobal.tabuleiro.casas[l][packGlobal.tabuleiro.colunas-1-l-c]);
                }
                else {
                    contador = 0;
                    casasVitoria = [];
                }
                if (contador == 3) {
                    LinhaVitoria(casasVitoria);
                    return true;
                }
            }
        }
    }
}

function TesteDiagonalVertical(valor) {
    for (l = 0; l < packGlobal.tabuleiro.linhas - 2; l++) {
        contador = 0;
        casasVitoria = [];
        for (c = 0; c < packGlobal.tabuleiro.colunas; c++) {
            if (l+c < packGlobal.tabuleiro.linhas) {
                if (packGlobal.tabuleiro.casas[l+c][c].valor == valor) {
                    contador += 1;
                    casasVitoria.push(packGlobal.tabuleiro.casas[l+c][c]);
                }
                else {
                    contador = 0;
                    casasVitoria = [];
                }
                if (contador == 3) {
                    LinhaVitoria(casasVitoria);
                    return true;
                }
            }
        }
    }
                
    for (l = 0; l < packGlobal.tabuleiro.linhas - 2; l++) {
        contador = 0
        casasVitoria = []
        for (c = 0; c < packGlobal.tabuleiro.colunas; c++) {
            if (l+c < packGlobal.tabuleiro.linhas) {
                if (packGlobal.tabuleiro.casas[c+l][packGlobal.tabuleiro.colunas-1-c].valor == valor) {
                    contador += 1;
                    casasVitoria.push(packGlobal.tabuleiro.casas[c+l][packGlobal.tabuleiro.colunas-1-c]);
                }
                else {
                    contador = 0;
                    casasVitoria = [];
                }
                if (contador == 3) {
                    LinhaVitoria(casasVitoria);
                    return true;
                }
            }
        }
    }
}

function LinhaVitoria(casasVitoria) {
    primeiraCasaX = casasVitoria[0].x+casasVitoria[0].width/2;
    primeiraCasaY = casasVitoria[0].y+casasVitoria[0].height/2;
    posicaoPrimeiraCasa = [primeiraCasaX,primeiraCasaY];

    ultimaCasaX = casasVitoria[2].x+casasVitoria[2].width/2;
    ultimaCasaY = casasVitoria[2].y+casasVitoria[2].height/2;
    posicaoUltimaCasa = [ultimaCasaX,ultimaCasaY];

    packGlobal.tabuleiro.casasVitoria = {primeiraCasa:posicaoPrimeiraCasa, ultimaCasa:posicaoUltimaCasa};

    for (i in SOCKET_LIST) {
        socket = SOCKET_LIST[i];
        socket.inGame = false;
    }
    inGame = false;
}

setInterval(() => {
    var roomList = []
    for (var i in SOCKET_LIST) {
        socket = SOCKET_LIST[i];
        if (socket.ready) {
            socket.situacao = "Preparado";
        }
        if (socket.inGame) {
            socket.situacao = "Jogando";
        }
        if (!socket.ready && !socket.inGame) {
            socket.situacao = "Despreparado"
        }
        socketInfo = {
            name:socket.name,
            situacao:socket.situacao
        }
        roomList.push(socketInfo);
    }
    for (var i in SOCKET_LIST) {
        socket = SOCKET_LIST[i];
        socket.emit('UpdateRoomList', roomList);
    }
    if (packGlobal != undefined) {
        for (i in packGlobal.Jogador.list) {
            if (packGlobal.Jogador.list[i].index == packGlobal.turno) {
                jogadorAtual = packGlobal.Jogador.list[i];
                break;
            }
        }
        var pack = {
            tabuleiro:packGlobal.tabuleiro,
            UI:{
                jogadorAtual:jogadorAtual,
                etapa:packGlobal.etapa,
                poderesAtivados:packGlobal.poderesAtivados,
            },
            poderAtivado:packGlobal.poderAtivado,
            inGame:inGame
        };
        for (var i in SOCKET_LIST) {
            socket = SOCKET_LIST[i];
            socket.emit('Update', pack);
        }
        if (packGlobal.poderAtivado.length > 0) {
            packGlobal.poderAtivado = [];
        }
    }
}, 1000/25);