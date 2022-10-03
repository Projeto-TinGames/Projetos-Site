const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const port = process.env.PORT || 3000; //|| 21285;

server.listen(port);

console.log("Server Iniciado");
const io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket) {
    socket.id = Math.random().toFixed(16);;
    console.log(socket.id + " Connected");
    require('/server/jogo_da_velha/comunicacao_io.js')(socket);
    //require('./outroArquivo.js')(socket);
})
