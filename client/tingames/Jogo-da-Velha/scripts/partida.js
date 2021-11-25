var poderesPosicionados = [];
var casasPoder = [];
var janelaOpcoes = false;
var listaJogadores = false;
var ativarMusica = true;
var mensagemPopup;
var objetosPopup = [];
var xPopup;
var yPopup;
var timerPopup = 0;

AtualizaPartida = (sala) => {
    DesenhaPartida(sala);
}

DesenhaPartida = (sala) => {
    DesenhaTabuleiro(sala.tabuleiro);
    if (!sala.partidaFinalizada) {
        DesenhaUI(sala);
    }
    else {
        DesenhaFinalizacao(sala);
    }
    if (timerPopup > 0) {
        DesenhaPopup(mensagemPopup,objetosPopup,xPopup,yPopup);
        timerPopup--;
    }
    else {
        objetosPopup = [];
    }
}

DesenhaTabuleiro = (tabuleiro) => {
    ctx.fillStyle = cor1.principal;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.strokeStyle = cor1.secundario;
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
    for (var i in casasPoder) {
        var imgPoder = new Image();
        imgPoder.src = poderesPosicionados[i].img;
        ctx.drawImage(imgPoder, casasPoder[i].x + Math.floor(casasPoder[i].width/4), casasPoder[i].y + Math.floor(casasPoder[i].height/4), Math.floor(casasPoder[i].width/2), Math.floor(casasPoder[i].height/2));
    }
    for (var l = 0; l < tabuleiro.linhas; l++) {
        for (var c = 0; c < tabuleiro.colunas; c++) {
            if (tabuleiro.casas[l][c].valor != undefined) {
                ctx.clearRect(tabuleiro.casas[l][c].x + Math.floor(tabuleiro.casas[l][c].width/4), tabuleiro.casas[l][c].y + Math.floor(tabuleiro.casas[l][c].height/4), Math.floor(tabuleiro.casas[l][c].width/2), Math.floor(tabuleiro.casas[l][c].height/2));
                ctx.fillRect(tabuleiro.casas[l][c].x + Math.floor(tabuleiro.casas[l][c].width/4), tabuleiro.casas[l][c].y + Math.floor(tabuleiro.casas[l][c].height/4), Math.floor(tabuleiro.casas[l][c].width/2), Math.floor(tabuleiro.casas[l][c].height/2));
                var imgJogador = new Image();
                imgJogador.src = "../client/TinGames/Jogo-da-Velha/img/Jogadores/" + tabuleiro.casas[l][c].valor + ".png";
                ctx.drawImage(imgJogador, tabuleiro.casas[l][c].x + Math.floor(tabuleiro.casas[l][c].width/4), tabuleiro.casas[l][c].y + Math.floor(tabuleiro.casas[l][c].height/4), Math.floor(tabuleiro.casas[l][c].width/2), Math.floor(tabuleiro.casas[l][c].height/2));
            }
        }
    }
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
}

DesenhaUI = (sala) => {
    var jogadorAtual = undefined;
    for (i in sala.jogadores) {
        if (sala.jogadores[i].index == sala.turno) {
            jogadorAtual = sala.jogadores[i];
        }
    }
    if (jogadorAtual != undefined) {
        DesenhaTurno(jogadorAtual);
        DesenhaPoderes(jogadorAtual, sala.etapa, sala.poderesAtivados);
    }
    DesenhaLista(sala);
    MenuOpcoesJogando();
}

DesenhaTurno = (jogadorAtual) => {
    DesenharCaixa(652,38,100,100,cor1,true);
    imgJogador = new Image();
    imgJogador.src = jogadorAtual.img;
    ctx.drawImage(imgJogador, 665, 50, 75, 75);
}

DesenhaPoderes = (jogadorAtual, etapa, poderesAtivados) => {
    for (var i = 0; i < 3; i++) {
        if (etapa == 'Posicionar Poderes' && i == 0) {
            DesenharCaixa(652,140 + 120*(i+1)-20,100,100,cor1,true);
        }
        else {
            DesenharCaixa(652,140 + 120*(i+1)-20,100,100,cor1,true);
        }
    }
    
    if (etapa == 'Posicionar Poderes') {
        for (var i = 0; i < jogadorAtual.poderes.length; i++) {
            imgPoder = new Image();
            imgPoder.src = jogadorAtual.poderes[i].img;
            ctx.drawImage(imgPoder, 665, 140 + 120*(i+1)-8,75,75);
        }
    }
    else {
        for (var i = 0; i < poderesAtivados.length; i++) {
            imgPoder = new Image();
            imgPoder.src = poderesAtivados[i].img;
            ctx.drawImage(imgPoder, 665, 140 + 120*(i+1)-8,75,75);
        }
    }
}

DesenhaLista = (sala) => {
    if (listaJogadores) {
        DesenharCaixa(245, 156, 300, 300, cor2, false);
        ctx.fillStyle = cor5.principal;
        var contador = 0;
        for (i in sala.jogadores) {
            ctx.fillText(sala.jogadores[i].nome, 255, 176 + 30*contador);
            ctx.beginPath();
            ctx.moveTo(245,176 + 30*contador+6);
            ctx.lineTo(545,176 + 30*contador+6);
            ctx.stroke();
            var imgJogador = new Image();
            imgJogador.src = "../client/TinGames/Jogo-da-Velha/img/Jogadores/" + sala.jogadores[i].valor + ".png";
            ctx.drawImage(imgJogador, 525, 176+30*contador-16, 16, 16);
            ctx.drawImage(imgJogador, 525, 176+30*contador-16, 16, 16);
            ctx.drawImage(imgJogador, 525, 176+30*contador-16, 16, 16);
            ctx.drawImage(imgJogador, 525, 176+30*contador-16, 16, 16);
            ctx.drawImage(imgJogador, 525, 176+30*contador-16, 16, 16);
            ctx.drawImage(imgJogador, 525, 176+30*contador-16, 16, 16);
            ctx.drawImage(imgJogador, 525, 176+30*contador-16, 16, 16);
            ctx.drawImage(imgJogador, 525, 176+30*contador-16, 16, 16);
            ctx.drawImage(imgJogador, 525, 176+30*contador-16, 16, 16);
            contador++;
        }
    }
}

PopUp = (mensagem,objetos,x,y) => {
    mensagemPopup = mensagem;
    if (objetos.length > 0) {
        objetosPopup = objetos[0];
    }
    xPopup = x;
    yPopup = y;
    timerPopup = 40;
}

DesenhaPopup = (mensagem,objetos,x,y) => {
    DesenharCaixa(50, 200, 500, 200, cor2, false);
    ctx.fillStyle = "black";
    ctx.fillText(mensagem,x,y);
    for (var i = 0; i < objetos.length; i++) {
        var imgObjeto = new Image();
        imgObjeto.src = objetos[i].img;

        var x = 300 + 50*i - 25*objetos.length;
        var y = 270;

        var largura = 40;
        var altura = 40;

        ctx.drawImage(imgObjeto,x,y,largura,altura)
    }
}

DesenhaFinalizacao = (sala) => {
    if (sala.tabuleiro.casasVitoria != undefined) {
        DesenhaLinhaVitoria(sala.tabuleiro.casasVitoria);
    }
    for (var i = 0; i < elementosFinalizacao.length; i++) {
        elementosFinalizacao[i].Atualizar();
    }
}

DesenhaLinhaVitoria = (casasVitoria) => {
    ctx.strokeStyle = "#fdca7c";
    ctx.beginPath();
    ctx.moveTo(casasVitoria.primeiraCasa[0],casasVitoria.primeiraCasa[1]);
    ctx.lineTo(casasVitoria.ultimaCasa[0],casasVitoria.ultimaCasa[1]);
    ctx.stroke();
}