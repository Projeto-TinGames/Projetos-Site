var cnv = document.getElementById("cnv");
var ctx = cnv.getContext("2d");

var listCnv = document.getElementById("listCnv");
var listCtx = listCnv.getContext("2d");
listCtx.lineWidth = 2;
listCtx.font = "18px Arial";

var formDiv = document.getElementById("FormDiv");
var gameDiv = document.getElementById("GameDiv");
var roomListDiv = document.getElementById("RoomListDiv");

var socket = io();

var jogo_da_velha_ost = new Sound("../client/TinGames/Jogo-da-Velha/snd/jogo_da_velha_ost.wav",true);

var casasPoder = [];
var poderesPosicionados = [];

socket.on("UpdateRoomList", (data) => {
    listCtx.clearRect(0,0,300,600);
    ctx.fillStyle = "#FFAEBC";
    for (var i = 0; i < data.length; i++) {
        if (data[i].name != undefined) {
            if (data[i].name.length > 11) {
                name = data[i].name.substring(0,11) + "...";
                listCtx.fillText(name,5,18+20*i);
            }
            else {
                listCtx.fillText(data[i].name,5,18+20*i);
            }      
            if (data[i].situacao != undefined) {
                listCtx.fillText(data[i].situacao,180,18+20*i);
            }
        }
        else {
            listCtx.fillText("Jogador conectando...",5,18+20*i); 
        }
        listCtx.beginPath();
        listCtx.moveTo(0, 20+20*i);
        listCtx.lineTo(300, 20+20*i);
        listCtx.stroke();
    }
    ctx.fillStyle = "#000000";
})

socket.on("Update", (data) => {
    ctx.clearRect(0,0,800,600);
    DesenhaTabuleiro(data.tabuleiro);
    ControlaMusica(data.inGame);
    if (data.tabuleiro.casasVitoria != undefined) {
        DesenhaLinhaVitoria(data.tabuleiro.casasVitoria);
    }
    if (data.poderAtivado.length > 0) {
        for (i = 0; i < data.poderAtivado.length; i++) {
            alert("Executado: " + data.poderAtivado[i][0]);
            for (var j = 0; j < casasPoder.length; j++) {
                if (casasPoder[j].x == data.poderAtivado[i][1].x && casasPoder[j].y == data.poderAtivado[i][1].y) {
                    poderesPosicionados.splice(j,1);
                    casasPoder.splice(j,1);
                }
            }
        }
    }
    DesenhaUI(data.UI);
})

socket.on("PosicionaPoder", (data) => {
    casasPoder.push(data.casa);
    poderesPosicionados.push(data.poder);
})

socket.on("ResetaPoderes", (data) => {
    casasPoder = [];
    poderesPosicionados = [];
})

socket.on("Erro", (data) => {
    alert(data);
})

cnv.onmousedown = (event) => {
    var rect = cnv.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    socket.emit("MouseDown", {x:x,y:y});
}

DesenhaTabuleiro = (tabuleiro) => {
    ctx.fillStyle = "#A0E7E5";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.strokeStyle = "#B4F8C8";
    ctx.lineWidth = 5;
    for (var c = 1; c < tabuleiro.colunas + 1; c++) {
        ctx.beginPath();
        ctx.moveTo(c*tabuleiro.casas[0][0].width, 0);
        ctx.lineTo(c*tabuleiro.casas[0][0].width, tabuleiro.tamanho[0]);
        ctx.stroke();
    }
    for (var l = 1; l < tabuleiro.linhas; l++) {
        ctx.beginPath();
        ctx.moveTo(0, l*tabuleiro.casas[0][0].height);
        ctx.lineTo(tabuleiro.tamanho[1],l*tabuleiro.casas[0][0].height);
        ctx.stroke();
    }
    for (var i = 0; i < poderesPosicionados.length; i++) {
        var img = new Image();
        img.src = poderesPosicionados[i].img;
        ctx.drawImage(img, casasPoder[i].x + Math.floor(casasPoder[i].width/4), casasPoder[i].y + Math.floor(casasPoder[i].height/4), Math.floor(casasPoder[i].width/2), Math.floor(casasPoder[i].height/2));
    }
    for (var l = 0; l < tabuleiro.linhas; l++) {
        for (var c = 0; c < tabuleiro.colunas; c++) {
            if (tabuleiro.casas[l][c].valor != undefined) {
                ctx.clearRect(tabuleiro.casas[l][c].x + Math.floor(tabuleiro.casas[l][c].width/4), tabuleiro.casas[l][c].y + Math.floor(tabuleiro.casas[l][c].height/4), Math.floor(tabuleiro.casas[l][c].width/2), Math.floor(tabuleiro.casas[l][c].height/2));
                ctx.fillRect(tabuleiro.casas[l][c].x + Math.floor(tabuleiro.casas[l][c].width/4), tabuleiro.casas[l][c].y + Math.floor(tabuleiro.casas[l][c].height/4), Math.floor(tabuleiro.casas[l][c].width/2), Math.floor(tabuleiro.casas[l][c].height/2));
                var img = new Image();
                img.src = "../client/TinGames/Jogo-da-Velha/img/Jogadores/" + tabuleiro.casas[l][c].valor + ".png";
                ctx.drawImage(img, tabuleiro.casas[l][c].x + Math.floor(tabuleiro.casas[l][c].width/4), tabuleiro.casas[l][c].y + Math.floor(tabuleiro.casas[l][c].height/4), Math.floor(tabuleiro.casas[l][c].width/2), Math.floor(tabuleiro.casas[l][c].height/2));
            }
        }
    }
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
}

DesenhaLinhaVitoria = (casasVitoria) => {
    ctx.strokeStyle = "#B4F8C8";
    ctx.beginPath();
    ctx.moveTo(casasVitoria.primeiraCasa[0],casasVitoria.primeiraCasa[1]);
    ctx.lineTo(casasVitoria.ultimaCasa[0],casasVitoria.ultimaCasa[1]);
    ctx.stroke();
    ctx.strokeStyle = "#000000";
}

DesenhaUI = (data) => {
    ctx.font = "22px Arial";
    ctx.fillStyle = "#B4F8C8";
    if (data.etapa == "Posicionar Poderes") {
        ctx.fillText(data.etapa, 605, 25);
    }
    else {
        ctx.fillText(data.etapa, 632, 25);
    }
    DesenhaTurno(data.jogadorAtual);
    DesenhaPoderes(data.jogadorAtual,data.etapa,data.poderesAtivados);
    ctx.fillStyle = "#000000";
}

DesenhaTurno = (jogadorAtual) => {
    DesenhaEmptyRect(652,38,100,100,"#FFAEBC")
    imgJogador = new Image();
    imgJogador.src = "../client/TinGames/Jogo-da-Velha/img/Jogadores/" + jogadorAtual.valor + ".png";
    ctx.drawImage(imgJogador, 665, 50, 75, 75);
}

DesenhaPoderes = (jogadorAtual, etapa, poderesAtivados) => {
    for (var i = 0; i < 3; i++) {
        if (etapa == 'Posicionar Poderes' && i == 0) {
            DesenhaEmptyRect(652,140 + 110*(i+1)-12,100,100,"#FFAEBC");
        }
        else {
            DesenhaEmptyRect(652,140 + 110*(i+1)-12,100,100,"#FBE7C6");
        }
    }
    
    if (etapa == 'Posicionar Poderes') {
        for (var i = 0; i < jogadorAtual.poderes.length; i++) {
            imgPoder = new Image();
            imgPoder.src = jogadorAtual.poderes[i].img;
            ctx.drawImage(imgPoder, 665, 140 + 110*(i+1),75,75);
        }
    }
    else {
        for (var i = 0; i < poderesAtivados.length; i++) {
            imgPoder = new Image();
            imgPoder.src = poderesAtivados[i].img;
            ctx.drawImage(imgPoder, 665, 140 + 110*(i+1),75,75);
        }
    }
}

DesenhaEmptyRect = (x,y,width,height,color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
    ctx.clearRect(x+5,y+5,width-10,height-10);
    ctx.fillStyle = "#B4F8C8";
    ctx.fillRect(x+5,y+5,width-10,height-10);
    ctx.fillStyle = "black";
}

ControlaMusica = (inGame) => {
    if (inGame) {
        jogo_da_velha_ost.play();
    }
    else {
        jogo_da_velha_ost.stop();
    }
}

EntrarSala = (nomeJogador) => {
    formDiv.style.display = "none";
    gameDiv.style.display = "block";
    roomListDiv.style.display = "block";

    socket.emit("EntrarSala",nomeJogador);
}

IniciarJogo = (maximoJogadores) => {
    maximoJogadores = parseInt(maximoJogadores);
    if (maximoJogadores < 1 || isNaN(maximoJogadores)) {
        maximoJogadores = 1;
    }
    if (maximoJogadores > 4) {
        maximoJogadores = 4;
    }
    document.getElementById("maximoJogadores").value = maximoJogadores;
    socket.emit("IniciarJogo",maximoJogadores);
}

Preparar = () => {
    text = document.getElementById("BotaoPreparar").innerHTML;
    if (text == "Preparar") {
        document.getElementById("BotaoPreparar").innerHTML = "Despreparar";
    }
    else {
        document.getElementById("BotaoPreparar").innerHTML = "Preparar";
    }
    socket.emit("Ready");
}