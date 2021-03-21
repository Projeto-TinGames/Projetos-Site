function Jogador(id,index,casasValidas,poderes) {
    this.id = id;
    this.index = index;
    var valores = ["X","O","Δ","[]"];
    this.valor = valores[index];
    this.poderes = [];
    this.casasInvalidas = [];
    this.casasValidas = casasValidas;

    for (i = 0; i < 3; i++) {
        this.poderes.push(poderes[Math.floor(Math.random() * poderes.length)]);
    }

    this.PosicionaPoder = (casa) => {
        this.poderes.shift();
        this.casasInvalidas.push(casa);
        this.casasValidas--;
    }

    this.ReduzirCasa = (casa) => {
        if (!this.casasInvalidas.includes(casa) && casa.valor == undefined) {
            this.casasValidas--;
        }
    }

    Jogador.list[this.id] = this;
}

Jogador.onConnect = (socket, valorIndex, maximoJogadores, poderes) => {
    casasValidas = (4 + maximoJogadores - 2)*(4 + maximoJogadores - 2)
    jogador = new Jogador(socket.id,valorIndex,casasValidas, poderes);
    Jogador.list[socket.id] = jogador;
}

Jogador.Update = () => {
    var pack = [];
    for (var i in Jogador.list) {
        jogador = Jogador.list[i];
        pack.push({
            id: jogador.id,
            valor: jogador.valor
        })
    }
    return pack;
}

Jogador.onDisconnect = (socket) => {
    delete Jogador.list[socket.id];
}

Jogador.list = {}

Jogador.CriarLista = (socketList, maximoJogadores, poderes) => {
    var valorIndex = 0;
    for (i in socketList) {
        if (valorIndex < maximoJogadores) {
            Jogador.onConnect(socketList[i],valorIndex,maximoJogadores,poderes);
            valorIndex++;
        }
        else {
            break;
        }
    }
}

module.exports = Jogador;