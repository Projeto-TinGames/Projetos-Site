const Jogador = require("./jogadores.js");
const Tabuleiro = require("./tabuleiro.js");

function Sala(index,privado,senha,maximoJogadores,criadoJogador) {
    this.index = index;
    this.privado = privado;
    this.senha = senha;
    this.maximoJogadores = maximoJogadores;
    this.criadoJogador = criadoJogador;

    this.jogadores = {};
    this.jogadoresLength = 0;
    this.jogadoresInativos = [];

    this.evento = undefined;
    this.deleta = false;

    this.IniciarSala = () => {
        this.jogando = false;
        this.tabuleiro = new Tabuleiro(this.maximoJogadores);
        this.turno = 0;
        this.etapa = "Posicionar Poderes";
        this.poderesAtivados = [];
        this.cancelarTesteVitoria = false;
        this.jogadoresInvertidos = false;
        this.cancelarPassarTurno = 0;
        this.partidaFinalizada = false;
        this.jogadoresConectados = 0;

        this.IniciarContadoresConexao();
    }

    this.IniciarContadoresConexao = () => {
        for (var i in this.jogadores) {
            this.jogadores[i].contadorExpiracao = 0;
        }
        this.contadorExpiracao = 0;
    }

    this.IniciarSala();

    this.Atualizar = () => {
        this.Reiniciar();
        this.ExpirarConexoes();
    }

    this.Reiniciar = () => {
        if (this.partidaFinalizada) {
            this.IniciarSala();
            for (var i in this.jogadores) {
                //this.ManterJogador(this.jogadores[i].id)
                this.jogadores[i].continuarSala = false;
            }
        }
    }

    this.ExpirarConexoes = () => {
        if (!this.jogando) {
            for (var i in this.jogadores) {
                if (this.jogadores[i].ExpirarConexao()) {
                    this.jogadoresInativos.push(this.jogadores[i]);
                }
            }
            if (this.criadoJogador) {
                this.contadorExpiracao++
                if (this.contadorExpiracao >= 600) {
                    this.DeletarSala();
                }
            }
        }
    }

    this.ConectarJogador = (nome,socket) => {
        casasValidas = (4 + this.maximoJogadores - 2)*(4 + this.maximoJogadores - 2);
        jogador = new Jogador(nome,socket.id,this.jogadoresConectados,casasValidas,poderes);
        this.jogadores[jogador.id] = jogador;
        this.jogadoresLength++;
        this.jogadoresConectados++;

        this.ComecarJogo();

        socket.emit("DefinirSala",this)
    }

    this.ManterJogador = (id) => {
        this.jogadores[id].continuarSala = true;
        this.jogadoresConectados++;
        this.ComecarJogo();
    }

    this.ComecarJogo = () => {
        if (this.jogadoresConectados == this.maximoJogadores) {
            for (var i in this.jogadores) {
                this.jogadores[i].DefinePoderes();
            }
            this.jogando = true;
            this.IniciarContadoresConexao();
            this.evento = {nome:"PosicionarPoderes"};
        }
    }

    this.AtualizaJogo = (x,y,socket) => {
        if (this.jogando) {
            jogador = this.jogadores[socket.id];
            casaSelecionada = this.tabuleiro.TestaColisoes(x,y);
            if (casaSelecionada != undefined && jogador.index == this.turno) {
                if (this.etapa == "Posicionar Poderes") {
                    this.AtualizaPosicionaPoder(casaSelecionada,jogador,socket);
                }
                else {
                    if (!jogador.casasInvalidas.includes(casaSelecionada)) {
                        this.AtualizaJogoDaVelha(casaSelecionada,jogador);
                    }
                }
            }
        }
    }
    
    this.AtualizaPosicionaPoder = (casa,jogador,socket) => {
        jogador.PosicionaPoder(casa,socket);
        
        if (jogador.poderes.length == 0) {
            this.turno++;
            if (this.turno == this.maximoJogadores) {
                this.turno = 0;
                this.etapa = "Jogo da Velha";
                this.evento = {nome:"JogoDaVelha"};
            }
        }
    }
    
    this.AtualizaJogoDaVelha = (casa,jogador) => {
        for (i in this.jogadores) {
            this.jogadores[i].ReduzirCasa(casa);
        }
        casa.valor = jogador.valor;
        casa.ExecutaPoderes(jogador,this);
        if (!this.cancelarTesteVitoria) {
            this.TesteVitoria(casa.valor)
        }
    
        if (this.cancelarPassarTurno == 0) {
            this.turno++;
            if (this.turno == this.maximoJogadores) {
                this.turno = 0;
            }
        }
        else {
            this.cancelarPassarTurno--;
        }
    
        //Empate
        for (i in this.jogadores) {
            if (this.jogadores[i].index == this.turno) {
                if (this.jogadores[i].casasValidas == 0) {
                    this.FinalizarPartida(socket);
                }
                break;
            }
        }
    }
    
    this.TesteVitoria = (valor) => {
        return this.TesteHorizontal(valor) || this.TesteVertical(valor) || this.TesteDiagonalHorizontal(valor) || this.TesteDiagonalVertical(valor);
    }
    
    this.TesteHorizontal = (valor) => {
        for (l = 0; l < this.tabuleiro.linhas; l++) {
            contador = 0;
            casasVitoria = [];
            for (c = 0; c < this.tabuleiro.colunas; c++) {
                if (this.tabuleiro.casas[l][c].valor == valor) {
                    contador += 1;
                    casasVitoria.push(this.tabuleiro.casas[l][c]);
                }
                else {
                    contador = 0;
                    casasVitoria = [];
                }
                if (contador == 3) {
                    this.FinalizarPartida(casasVitoria);
                    return true;
                }
            }
        }
    }
    
    this.TesteVertical = (valor) => {
        for (c = 0; c < this.tabuleiro.linhas; c++) {
            contador = 0;
            casasVitoria = [];
            for (l = 0; l < this.tabuleiro.linhas; l++) {
                if (this.tabuleiro.casas[l][c].valor == valor) {
                    contador += 1;
                    casasVitoria.push(this.tabuleiro.casas[l][c]);
                }
                else {
                    contador = 0;
                    casasVitoria = [];
                }
                if (contador == 3) {
                    this.FinalizarPartida(casasVitoria);
                    return true; 
                }
            }
        }
    }
    
    this.TesteDiagonalHorizontal = (valor) => {
        for (c = 0; c < this.tabuleiro.colunas - 2; c++) {
            contador = 0
            casasVitoria = []
            for (l = 0; l < this.tabuleiro.linhas; l++) {
                if (l+c < this.tabuleiro.colunas) {
                    if (this.tabuleiro.casas[l][l+c].valor == valor) {
                        contador += 1;
                        casasVitoria.push(this.tabuleiro.casas[l][l+c]);
                    }
                    else {
                        contador = 0;
                        casasVitoria = [];
                    }
                    if (contador == 3) {
                        this.FinalizarPartida(casasVitoria);
                        return true;
                    }
                }
            }
        }
                    
        for (c = 0; c < this.tabuleiro.colunas - 2; c++) {
            contador = 0;
            casasVitoria = [];
            for (l = 0; l < this.tabuleiro.linhas; l++) {
                if (l+c < this.tabuleiro.colunas) {
                    if (this.tabuleiro.casas[l][this.tabuleiro.colunas-1-l-c].valor == valor) {
                        contador += 1;
                        casasVitoria.push(this.tabuleiro.casas[l][this.tabuleiro.colunas-1-l-c]);
                    }
                    else {
                        contador = 0;
                        casasVitoria = [];
                    }
                    if (contador == 3) {
                        this.FinalizarPartida(casasVitoria);
                        return true;
                    }
                }
            }
        }
    }
    
    this.TesteDiagonalVertical = (valor) => {
        for (l = 0; l < this.tabuleiro.linhas - 2; l++) {
            contador = 0;
            casasVitoria = [];
            for (c = 0; c < this.tabuleiro.colunas; c++) {
                if (l+c < this.tabuleiro.linhas) {
                    if (this.tabuleiro.casas[l+c][c].valor == valor) {
                        contador += 1;
                        casasVitoria.push(this.tabuleiro.casas[l+c][c]);
                    }
                    else {
                        contador = 0;
                        casasVitoria = [];
                    }
                    if (contador == 3) {
                        this.FinalizarPartida(casasVitoria);
                        return true;
                    }
                }
            }
        }
                    
        for (l = 0; l < this.tabuleiro.linhas - 2; l++) {
            contador = 0
            casasVitoria = []
            for (c = 0; c < this.tabuleiro.colunas; c++) {
                if (l+c < this.tabuleiro.linhas) {
                    if (this.tabuleiro.casas[c+l][this.tabuleiro.colunas-1-c].valor == valor) {
                        contador += 1;
                        casasVitoria.push(this.tabuleiro.casas[c+l][this.tabuleiro.colunas-1-c]);
                    }
                    else {
                        contador = 0;
                        casasVitoria = [];
                    }
                    if (contador == 3) {
                        this.FinalizarPartida(casasVitoria);
                        return true;
                    }
                }
            }
        }
    }

    this.FinalizarPartida = (casasVitoria) => {
        if (casasVitoria.length > 0) {
            this.LinhaVitoria(casasVitoria);
        }
        else {
            console.log("Empate");
        }
        this.partidaFinalizada = true;
    }
    
    this.LinhaVitoria = (casasVitoria) => {
        primeiraCasaX = casasVitoria[0].x+casasVitoria[0].width/2;
        primeiraCasaY = casasVitoria[0].y+casasVitoria[0].height/2;
        posicaoPrimeiraCasa = [primeiraCasaX,primeiraCasaY];
    
        ultimaCasaX = casasVitoria[2].x+casasVitoria[2].width/2;
        ultimaCasaY = casasVitoria[2].y+casasVitoria[2].height/2;
        posicaoUltimaCasa = [ultimaCasaX,ultimaCasaY];
    
        this.tabuleiro.casasVitoria = {primeiraCasa:posicaoPrimeiraCasa, ultimaCasa:posicaoUltimaCasa};
    }

    this.DesconectarJogador = (id) => {
        if (this.jogadores[id] != undefined) {
            this.jogadoresLength--;
            delete this.jogadores[id];
            if (this.jogando) {
                this.partidaFinalizada = true;
            }
            else if (this.jogadoresConectados > 0) {
                this.jogadoresConectados--;
            }
            var contador = 0;
            for (i in this.jogadores) {
                this.jogadores[i].Redefine(contador);
                contador++;
            }
        }
    }

    this.DeletarSala = () => {
        for (i in this.jogadores.length) {
            this.jogadoresInativos.push(this.jogadores[i]);
        }
        this.deleta = true;
    }
}

salas = [];
for (var i = 0; i < 18; i++) {
    if (i == 0) {
        var sala = new Sala(i,false,"",2,false);
    }
    else {
        var sala = new Sala(i,false,"",Math.ceil(i/3+1),false);
    }
    salas[i] = sala;
}

pack = {
    Sala:Sala,
    salas:salas
}

module.exports = pack;