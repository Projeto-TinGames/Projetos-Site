const poderes = require("./poderes.js");

function Jogador(nome,id,index,casasValidas,poderes) {
    this.nome = nome;
    this.id = id;
    this.valores = ["X","O","Δ","[]"];
    this.casasInvalidas = [];
    this.casasValidas = casasValidas;
    this.continuarSala = true;
    this.contadorExpiracao = 0;

    this.Redefine = (index) => {
        this.index = index;
        this.valor = this.valores[index];
        this.img = "../../client/TinGames/Jogo-da-Velha/img/Jogadores/" + this.valor + ".png";

        this.poderes = [];
    }

    this.DefinePoderes = () => {
        for (i = 0; i < 3; i++) {
            random = Math.floor(Math.random() * poderes.length);
            this.poderes.push(poderes[random]);
        }
    }

    this.ExpirarConexao = () => {
        if (!this.continuarSala) {
            this.contadorExpiracao++;
        }
        return this.contadorExpiracao >= 600;
    }

    this.PosicionaPoder = (casa,socket) => {
        this.poderes[0].id = Math.random().toFixed(16);
        socket.emit("PosicionaPoder", {casa:casa,poder:jogador.poderes[0]})
        casa.ColocaPoder(this.poderes.shift());
        this.casasInvalidas.push(casa);
        this.casasValidas--;
    }

    this.ReduzirCasa = (casa) => {
        if (!this.casasInvalidas.includes(casa) && casa.valor == undefined) {
            this.casasValidas--;
        }
    }

    this.Redefine(index);
}

Jogador.onDisconnect = (socket) => {
    delete Jogador.list[socket.id];
}

module.exports = Jogador;