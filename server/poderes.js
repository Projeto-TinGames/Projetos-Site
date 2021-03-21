
var manager = require("../app.js");

function Poder() {
    this.img = "../client/TinGames/Jogo-da-Velha/img/Jogadores/X.png";

    this.Executa = (obj,casa) => {
        manager = require("../app.js");
        if (manager.poderesAtivados.length == 3) {

            manager.poderesAtivados.shift();
        }
        manager.poderesAtivados.unshift(obj);
    }
}

function Repeticao() {
    Poder.call(this);

    this.img = "../client/TinGames/Jogo-da-Velha/img/Poderes/repeticao.png";

    super_executa = this.Executa;
    this.Executa = (casa,jogador) => {
        super_executa(this,casa);
        manager.poderAtivado.push([this.constructor.name,casa]);
        manager.cancelarPassarTurno++;
    }
}

function Troca() {
    Poder.call(this);

    this.img = "../client/TinGames/Jogo-da-Velha/img/Poderes/troca.png";

    super_executa = this.Executa;
    this.Executa = (casa,jogador) => {
        super_executa(this,casa);
        manager.poderAtivado.push([this.constructor.name,casa]);
        jogadores = [];
        jogadoresMudar = [];
        jogadoresMudarPara = [];

        for (var i in manager.Jogador.list) {
            jogadores.push(manager.Jogador.list[i]);
            jogadoresMudar.push(manager.Jogador.list[i]);
            jogadoresMudarPara.push(manager.Jogador.list[i]);
        }


        for (var i = 0; i < jogadoresMudar.length; i++) {
            while (jogadoresMudar[i] == jogadoresMudarPara[i]) {
                jogadoresMudarPara[i] = jogadores[Math.floor(Math.random() * jogadores.length)];
            }
            jogadores.splice(jogadores.indexOf(jogadoresMudarPara[i]),1);
        }

        manager.cancelarTesteVitoria = true;

        for (var l = 0; l < manager.tabuleiro.linhas; l++) {
            for (var c = 0; c < manager.tabuleiro.colunas; c++) {
                if (manager.tabuleiro.casas[l][c].valor != undefined) {
                    for (i in manager.Jogador.list) {
                        if (manager.tabuleiro.casas[l][c].valor == manager.Jogador.list[i].valor) {
                            indexMudar = manager.Jogador.list[i].index;
                        }
                    }
                    manager.cancelarPassarTurno = 1;
                    manager.AtualizaJogoDaVelha(manager.tabuleiro.casas[l][c],jogadoresMudarPara[indexMudar]);
                }
            }
        }

        manager.cancelarTesteVitoria = false;

        for (var i in manager.Jogador.list) {
            manager.TesteVitoria(manager.Jogador.list[i]);
        }
    }
}

function Remocao() {
    Poder.call(this);

    this.img = "../client/TinGames/Jogo-da-Velha/img/Poderes/remocao.png";

    super_executa = this.Executa;
    this.Executa = (casa,jogador) => {
        super_executa(this,casa);
        manager.poderAtivado.push([this.constructor.name,casa]);

        var posicoesCasasComValor = []

        for (l = 0; l < manager.tabuleiro.linhas; l++) {
            for (c = 0; c < manager.tabuleiro.colunas; c++) {
                casaComValor = manager.tabuleiro.casas[l][c];
                if (casaComValor.valor != jogador.valor && casaComValor.valor != undefined) {
                    posicoesCasasComValor.push([l,c]);
                }
            }
        }

        if (posicoesCasasComValor.length > 0) {
            indexAleatoria = Math.floor(Math.random() * posicoesCasasComValor.length);
            casaEliminada = posicoesCasasComValor[indexAleatoria];
            manager.tabuleiro.casas[casaEliminada[0]][casaEliminada[1]].valor = undefined;
        }
    }
}

function Pular_Vez() {
    Poder.call(this);

    this.img = "../client/TinGames/Jogo-da-Velha/img/Poderes/pular_vez.png";

    super_executa = this.Executa;
    this.Executa = (casa,jogador) => {
        super_executa(this,casa);
        manager.poderAtivado.push([this.constructor.name,casa]);
        manager.turno++;
        if (manager.turno > manager.maximoJogadores-1) {
            manager.turno = 0;
        }
    }
}

function Inverter_Ordem() {
    Poder.call(this);

    this.img = "../client/TinGames/Jogo-da-Velha/img/Poderes/inverter_ordem.png";

    super_executa = this.Executa;
    this.Executa = (casa,jogador) => {
        super_executa(this,casa);
        manager.poderAtivado.push([this.constructor.name,casa]);
        if (manager.jogadoresInvertidos) {
            var indexInicial = 0;
            var somaIndex = 1;
        }
        else {
            var indexInicial = manager.maximoJogadores-1;
            var somaIndex = -1;
        }
        manager.jogadoresInvertidos = !manager.jogadoresInvertidos;
        var soma = 0;
        for (i in manager.Jogador.list) {
            manager.Jogador.list[i].index = indexInicial + soma;
            soma += somaIndex;
        }
        manager.turno = manager.Jogador.list[jogador.id].index;
    }
}

function Voltar_Turno() {
    Poder.call(this);

    this.img = "../client/TinGames/Jogo-da-Velha/img/Poderes/voltar_turno.png";

    super_executa = this.Executa;
    this.Executa = (casa,jogador) => {
        super_executa(this,casa);
        manager.poderAtivado.push([this.constructor.name,casa]);
        manager.cancelarPassarTurno++;
        manager.turno--;
        if (manager.turno < 0) {
            manager.turno = manager.maximoJogadores-1;
        }
    }
}

poderes = [new Repeticao(),new Troca(),new Remocao(),new Pular_Vez(),new Inverter_Ordem(),new Voltar_Turno()];
module.exports = poderes;