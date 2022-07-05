function Tabuleiro(quantidadeJogadores) {
    this.tamanho = [600,600];
    this.quantidadeJogadores = quantidadeJogadores;
    this.linhas = 4 + this.quantidadeJogadores - 2;
    this.colunas = 4 + this.quantidadeJogadores - 2;
    this.quantidadeCasas = this.linhas*this.colunas;
    this.casasVitoria = undefined;

    this.DefineCasas = () => {
        var casas = [];

        for (l = 0; l < this.linhas; l++) {

            casas[l] = [];
            for (c = 0; c < this.colunas; c++) {
                var width = Math.floor(this.tamanho[0]/this.colunas);
                var height = Math.floor(this.tamanho[1]/this.linhas);
                var x = width*c;
                var y = height*l;

                casas[l][c] = new Casa(x,y,width,height);
            }
        }
        return casas;
    }

    this.TestaColisoes = (x,y) => {
        for (l = 0; l < this.linhas; l++) {
            for (c = 0; c < this.colunas; c++) {
                if (this.casas[l][c].TestaColisao(x,y)) {
                    return this.casas[l][c];
                }
            }
        }
    }

    this.casas = this.DefineCasas();
}

function Casa(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.valor = undefined;
    this.poderes = [];

    this.TestaColisao = (x,y) => {
        if (this.valor == undefined) {
            if (x > this.x && x < this.x + this.width) {
                if (y > this.y && y < this.y + this.height) {
                    return true;
                }
            }
        }
        return false;
    }
    this.ColocaPoder = (poder) => {
        this.poderes.push(poder);
    }

    this.ExecutaPoderes = (jogador,sala) => {
        if (sala.evento == undefined) {
            sala.evento = {nome:"AcionaPoderes",poderes:this.poderes.slice(0,this.poderes.length)};
        }
        while (this.poderes.length > 0) {
            this.poderes.shift().Executa(this,jogador,sala);
        }
    }
}

module.exports = Tabuleiro;