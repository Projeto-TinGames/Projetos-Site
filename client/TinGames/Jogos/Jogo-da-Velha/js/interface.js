var cor1 = {principal:"#c584fd",secundario:"#d5a3ff"};
var cor2 = {principal:"#f990aa",secundario:"#fca7bc"};
var cor3 = {principal:"#fda385",secundario:"#ffbca6"};
var cor4 = {principal:"#fdca7c",secundario:"#ffe0b0"};
var cor5 = {principal:"#fff487",secundario:"#fff7a6"};

var inputSelecionado = undefined;

var clientMouse = {
    x:0,
    y:0,
    clicou:false,
}

function CampoInput(x,y,cor,maximoChars,placeholder,tipo,valoresAceitos) {
    this.x = x;
    this.y = y;

    this.placeholder = placeholder;

    this.largura = 14.6*this.placeholder.length+(this.placeholder.length == 0)*22;
    this.altura = 30;

    this.valor = '';
    this.valorMostrado = '';
    this.valoresAceitos = valoresAceitos;
    this.tipo = tipo;
    this.bloqueado = false;

    this.cor = cor;
    this.maximoChars = maximoChars;
    this.maximoCharsShow = Math.round(this.largura/14);
    this.selecionado = false;
    this.indicadorEscrever = true;
    this.indicadorEscreverCounter = 0;

    this.Atualizar = function() {
        this.Clicar();
        this.Desenhar();

        if (inputSelecionado == this) {
            this.selecionado = true;
        }
        else {
            this.selecionado = false;
        }
    }

    this.Clicar = function() {
        if (clientMouse.clicou == true && !this.bloqueado) {
            if (clientMouse.x > this.x && clientMouse.x < this.x + this.largura &&
                clientMouse.y > this.y && clientMouse.y < this.y + this.altura) {
                clientMouse.clicou = false;
                inputSelecionado = this;
            }
            else {
                inputSelecionado = undefined;
            }
        }
    };

    this.Desenhar = function() {
        DesenharCaixa(this.x,this.y,this.largura,this.altura,this.cor,this.selecionado);
        this.DesenharIndicadorEscrever();
        this.DesenharValor();
    };

    this.DesenharIndicadorEscrever = function() {
        if (this.selecionado == true) {
            this.indicadorEscreverCounter++;
            if (this.indicadorEscreverCounter == 20) {
                this.indicadorEscreverCounter = 0;
                this.indicadorEscrever = !this.indicadorEscrever;
            }

            if (this.indicadorEscrever) {
                ctx.fillStyle = 'black';
                ctx.fillRect(this.x+5+13.25*this.valorMostrado.length,this.y+5,5,this.altura-10)
            }    
        }
    };

    this.DesenharValor = function() {
        ctx.fillStyle = 'black';
        ctx.font = 'bold 24px Monospace';
        if (this.valorMostrado.length == 0 && this.selecionado == false) {
            var val = this.placeholder;
        }
        else {
            if (this.tipo == 'password') {
                var val = '*'.repeat(this.valorMostrado.length);
            }
            else {
                var val = this.valorMostrado;
            }
        }
        ctx.fillText(val,this.x+5,this.y+22);
    };

    this.Escrever = function(char) {
        if (char == "Backspace") {
            this.valor = this.valor.slice(0,-1);
        }
        else {
            if (this.valor.length+1 <= this.maximoChars) {
                if (this.valoresAceitos != undefined && !this.valoresAceitos.includes(char)) {
                    return;
                }
                this.valor += char;
                if (isNaN(char) == true && this.tipo == 'number') {
                    this.valor = this.valor.slice(0,-1);
                }
            }
        }
        this.valorMostrado = this.valor.substring(this.valor.length-this.maximoCharsShow,this.valor.length);

        this.indicadorEscreverCounter = 0;
        this.indicadorEscrever = true;
    }
}

function InterruptorValores(x,y,valores) {
    this.x = x;
    this.y = y;

    this.vIndex = 0;
    this.valores = valores;
    this.valor = this.valores[0];

    this.Atualizar = function() {
        this.Desenhar();
    };

    this.Desenhar = function() {
        ctx.fillText(this.valor,this.x,this.y);
    };

    this.AtualizarValor = function() {
        this.vIndex++;
        if (this.vIndex == this.valores.length) {
            this.vIndex = 0;
        }
        this.valor = this.valores[this.vIndex];
    }
}

function Botao(x,y,cor,texto,func,parametros) {
    this.x = x;
    this.y = y;

    this.texto = texto;
    this.largura = 14.6*this.texto.length;
    this.altura = 30;

    this.selecionado = false;
    this.function = func;
    this.valor = parametros[0];
    this.parametros = parametros;
    this.cor = cor;

    this.Atualizar = function() {
        this.Clicar();
        this.Desenhar();
    }

    this.Clicar = function() {
        this.selecionado = false;
        if (clientMouse.clicou == true) {
            if (clientMouse.x > this.x && clientMouse.x < this.x + this.largura &&
            clientMouse.y > this.y && clientMouse.y < this.y + this.altura) {
                this.function(this.parametros);
                this.selecionado = true;
                clientMouse.clicou = false;
            }
        }
    };

    this.Desenhar = function() {
        DesenharCaixa(this.x,this.y,this.largura,this.altura,this.cor,this.selecionado);
        if (this.texto != '') {
            this.DesenharTexto();
        }
    };

    this.DesenharTexto = function() {
        ctx.fillStyle = 'black';
        ctx.font = 'bold 24px Monospace';
        ctx.fillText(this.texto,this.x+5,this.y+22);
    };
}

function DesenharCaixa(x, y, largura, altura, cor, selecionado) {
    ctx.fillStyle = "black";
    ctx.fillRect(x-5, y-5, largura+10, altura+10);
    if (selecionado == false) {
        ctx.fillStyle = cor.principal;
    }
    else {
        ctx.fillStyle = cor.secundario;
    }
    ctx.fillRect(x, y, largura, altura);
}