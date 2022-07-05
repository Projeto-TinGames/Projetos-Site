var cnv = document.getElementById("cnv");
var ctx = cnv.getContext("2d");

var socket = io();

var nomeCliente = "";
var quantidadeCliente = 0;
var salaCliente = undefined;

socket.on("DefinirSala", (data) => {
    salaCliente = data;
})

socket.on("Atualizar", (salas) => {
    if (salaCliente != undefined) {
        if (salas[salaCliente.index] != undefined) {
            salaCliente = salas[salaCliente.index];
        }
    }
    AtualizaCliente(salaCliente);
})

socket.on("PosicionaPoder", (data) => {
    poderesPosicionados.push(data.poder);
    casasPoder.push(data.casa);
})

socket.on("DesconectarCliente", () => {
    salaCliente = undefined;
    janelaOpcoes = false;
    poderesPosicionados = [];
    casasPoder = [];
})

socket.on("AtualizarLista", (data) => {
    salaCliente.jogadores = data;
})

socket.on("AcionarEvento", (data) => {
    var eventosValidos = {
        PosicionarPoderes() {
            if (!elementosFinalizacao.includes(botaoContinuar)) {
                elementosFinalizacao.unshift(botaoContinuar);
            }
            casasPoder = [];
            poderesPosicionados = [];
            PopUp("Etapa: Posicionar Poderes",[],135,300)
        },
        JogoDaVelha() {
            PopUp("Etapa: Jogo da Velha",[],170,300)
        },
        AcionaPoderes() {
            if (data.poderes.length > 0) {
                PopUp("Poderes Acionados",[data.poderes],190,230);
                for (var i = 0; i < poderesPosicionados.length; i++) {
                    for (var j = 0; j < data.poderes.length; j++) {
                        if (poderesPosicionados[i].id == data.poderes[j].id) {
                            poderesPosicionados.splice(i,1);
                            casasPoder.splice(i,1);
                            break;
                        }
                    }
                }
            }
        },
    }
    var eventoFuncao = eventosValidos[data.nome];
    eventoFuncao();
})

cnv.onmousedown = (event) => {
    var rect = cnv.getBoundingClientRect();
    clientMouse.x = event.clientX - rect.left;
    clientMouse.y = event.clientY - rect.top;
    clientMouse.clicou = true;
    if (!janelaOpcoes && !listaJogadores && timerPopup == 0) { 
        if (salaCliente != undefined) {
            socket.emit("MouseDown", {salaID:salaCliente.index,x:clientMouse.x,y:clientMouse.y});
        }
    }
}

cnv.onmouseup = (event) => {
    var rect = cnv.getBoundingClientRect();
    clientMouse.x = event.clientX - rect.left;
    clientMouse.y = event.clientY - rect.top;
    clientMouse.clicou = false;
}

EntrarSala = (data) => {
    if (data[0] != "" && ((!data[1] && data[2].length > 0) || (data[1] && data[3].length > 0))) {
        nomeCliente = data[0];
        quantidadeCliente = parseInt(data[2]);
        socket.emit("Entrar", {nome:data[0],privado:data[1],maximoJogadores:parseInt(data[2]),senha:data[3]});
    }
}

CriarSala = (data) => {
    if (data[0] != "" && ((!data[1] && data[2].length > 0) || (data[1] && data[3].length > 0))) {
        nomeCliente = data[0];
        quantidadeCliente = parseInt(data[2]);
        socket.emit("CriarSala", {nome:data[0],privado:data[1],maximoJogadores:parseInt(data[2]),senha:data[3]});
    }
}

AtualizaCliente = (sala) => {
    ctx.clearRect(0,0,800,600);
    if (sala == undefined) {
        AtualizaMenu();
        AtualizaSom(false);
    }
    else {
        AtualizaSom(sala.jogando && !sala.partidaFinalizada && ativarMusica);
        AtualizaPartida(sala);
    }
}

Continuar = () => {
    elementosFinalizacao.shift();
    socket.emit("Continuar", {salaID:salaCliente.index});
}

NovaPartida = () => {
    socket.emit("Entrar", {salaID:salaCliente.index,nome:nomeCliente,privado:false,maximoJogadores:quantidadeCliente});
}

SairSala = () => {
    salaCliente = undefined;
    janelaOpcoes = false;
    poderesPosicionados = [];
    casasPoder = [];
    socket.emit("SairSala");
}

document.onkeydown = function(e) {
    if (inputSelecionado != undefined) {
        if (e.key.length == 1 || e.key == 'Backspace') {
            inputSelecionado.Escrever(e.key);
        }
    }
    if (salaCliente != undefined) {
        var botoesAceitos = {
            "'"() {
                listaJogadores = true;
            },
            escape() {
                janelaOpcoes = !janelaOpcoes;
                listaJogadores = false;
            },
        }
        var botao = e.key.toLowerCase();
        if (botoesAceitos[botao] != undefined) {
            var botaoFuncao = botoesAceitos[botao];
            botaoFuncao();
        }
    }
}

document.onkeyup = function(e) {
    var botoesAceitos = {
        "'"() {
            listaJogadores = false;
        },
    }
    var botao = e.key.toLowerCase();
    if (botoesAceitos[botao] != undefined) {
        var botaoFuncao = botoesAceitos[botao];
        botaoFuncao();
    }
}