Sala = require("./salas.js").Sala;
salas = require("./salas.js").salas;
var salasUsadas = [];

var SOCKET_LIST = {};

module.exports = (socket) => {
    SOCKET_LIST[socket.id] = socket;

    socket.on("Entrar", (data) => {
        if (data.privado) {
            EntrarSalaPrivada(socket,data);
        }
        else {
            EntrarSalaPublica(socket,data);
        }
    })

    socket.on("CriarSala", (data) => {
        salaCriada = new Sala(salas.length,data.privado,data.senha,data.maximoJogadores,true);
        salas[salaCriada.index] = salaCriada;
        salaCriada.ConectarJogador(data.nome,socket);
    })

    socket.on("MouseDown", (data) => {
        salas[data.salaID].AtualizaJogo(data.x,data.y,socket)
    })

    socket.on("Continuar", (data) => {
        salas[data.salaID].ManterJogador(socket.id);
    })

    socket.on("NovaPartida", (data) => {
        salas[data.salaID].DesconectarJogador(socket.id);
        EntrarSalaPublica(socket,data);
    })

    socket.on("SairSala", () => {
        Desconectar(socket,false);
    })

    socket.on("disconnect", () => {
        Desconectar(socket,true);
    })
};

EntrarSalaPrivada = (socket,data) => {
    for (var i = 0; i < salas.length; i++) {
        if (data.senha == salas[i].senha) {
            socket.salaIndex = salas[i].index;
            salas[i].ConectarJogador(data.nome,socket);
        }
        else {
            socket.emit("Erro", "Sala não encontrada");
        }
    }
}

EntrarSalaPublica = (socket,data) => {
    for (var i = 0; i < salas.length; i++) {
        if (data.maximoJogadores == salas[i].maximoJogadores && salas[i].jogadoresLength < salas[i].maximoJogadores) {
            socket.salaIndex = salas[i].index;
            salas[i].ConectarJogador(data.nome,socket);
            return;
        }
    }
    socket.emit("Erro", "Não há salas disponíveis")
}

AtualizarSala = (sala) => {
    sala.Atualizar();
    EventosJogo(sala);
}

EventosJogo = (sala) => {
    EventoCliente(sala);
    EventoDesconectarJogadoresInativos(sala);
    EventoDeletarSala(sala);
}

EventoCliente = (sala) => {
    if (sala.evento != undefined) {
        for (var i in sala.jogadores) {
            var socket = SOCKET_LIST[sala.jogadores[i].id];
            socket.emit("AcionarEvento", sala.evento);
        }
        sala.evento = undefined;
    }
}

EventoDesconectarJogadoresInativos = (sala) => {
    if (sala.jogadoresInativos.length > 0) {
        for (var i = 0; i < sala.jogadoresInativos.length; i++) {
            var socket = SOCKET_LIST[sala.jogadoresInativos[i].id];
            if (socket != undefined) {
                sala.jogadoresInativos.splice(i,1);
                socket.emit("DesconectarCliente");
                Desconectar(socket,false);
            }
        }
    }
}

EventoDeletarSala = (sala) => {
    if (sala.deleta) {
        for (var i in sala.jogadores) {
            var socket = SOCKET_LIST[sala.jogadores[i].id];
            salas.splice(sala.index,1);
            socket.emit("DesconectarCliente");
        }
        sala.deleta = false;
    }
}

Desconectar = (socket,deletarSocket) => {
    if (socket.salaIndex != undefined) {
        salas[socket.salaIndex].DesconectarJogador(socket.id);
    }
    if (deletarSocket) {
        delete SOCKET_LIST[socket.id];
    }
    for (socketRestante in SOCKET_LIST) {
        if (socketRestante != socket && socketRestante.salaIndex != undefined) {
            socketRestante.emit("AtualizarLista", salas[socketRestante.salaIndex].jogadores);
        }
    }
}

setInterval(() => {
    salasUsadas = [];
    for (var i = 0; i < salas.length; i++) {
        if (salas[i].jogando) {
            salasUsadas[salas[i].index] = salas[i];
        }
    }
    for (var i in SOCKET_LIST) {
        socket = SOCKET_LIST[i];
        socket.emit('Atualizar', salasUsadas);
    }
    for (var i = 0; i < salas.length; i++) {
        AtualizarSala(salas[i]);
    }
}, 1000/25);