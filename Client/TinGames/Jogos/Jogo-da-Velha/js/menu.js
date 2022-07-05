var indexMenu = 0;
var tutorialJogando = false;
var opcoesJogando = false;

var Principal = function() {
    AtualizaMenu = MenuPrincipal;
}

var Jogar = function() {
    AtualizaMenu = MenuJogar;
}

var Criar = function() {
    AtualizaMenu = MenuCriar;
}

var Tutorial = function() {
    AtualizaMenu = MenuTutorial;
}

var TutorialJogando = function() {
    tutorialJogando = true;
}

var Opcoes = function() {
    AtualizaMenu = MenuOpcoes;
}

var OpcoesJogando = function() {
    opcoesJogando = true;
}

var Feedback = function() {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLScYKyxee7xUNUXC8xCD9ftVEYayF-7GIpHVoy_o7e8MdAbb3g/viewform?usp=sf_link");
}

var AtualizarInterruptor = function(interruptor) {
    interruptor[0].AtualizarValor();
}

var AvancarTutorial = function() {
    indexMenu++;
    if (indexMenu > 6) {
        if (tutorialJogando) {
            tutorialJogando = false;
        }
        else {
            Principal();
        }
        indexMenu = 0;
    }
}

var VoltarTutorial = function() {
    indexMenu--;
}

var OpcaoMusica = function(bool) {
    ativarMusica = bool[0];
}

var VoltarOpcoes = function() {
    if (janelaOpcoes) {
        opcoesJogando = false;
    }
    else {
        Principal();
    }
}

var VoltarOpcoesJogando = function() {
    janelaOpcoes = false;
}

var Sair = function() {
    SairSala();
}

//Elementos tela principal
var botaoPrincipal1 = new Botao(360,170,cor3,"Jogar",Jogar,[]);
var botaoPrincipal2 = new Botao(325,230,cor3,"Criar Sala",Criar,[]);
var botaoPrincipal3 = new Botao(339,290,cor3,"Tutorial",Tutorial,[]);
var botaoPrincipal4 = new Botao(353,350,cor3,"Opções",Opcoes,[]);
var botaoPrincipal5 = new Botao(339,410,cor3,"Feedback",Feedback,[]);
var elementosPrincipal = [botaoPrincipal1,botaoPrincipal2,botaoPrincipal3,botaoPrincipal4,botaoPrincipal5];

//Elementos tela jogar
var campoJogar1 = new CampoInput(292,170,cor4,20,"Digite seu nome");
var interruptorJogar1 = new InterruptorValores(435,252,["Não","Sim"])
var botaoJogar1 = new Botao(310,230,cor4,"Privado:",AtualizarInterruptor,[interruptorJogar1]);
var campoJogar2 = new CampoInput(490,290,cor4,1,"","number",undefined);
var campoJogar3 = new CampoInput(299,290,cor4,20,"Digite a senha","password");
var campoMostrado1;
var botaoJogar2 = new Botao(353,350,cor4,"Entrar",EntrarSala,[]);
var botaoJogar3 = new Botao(353,410,cor4,"Voltar",Principal,[]);
var elementosJogar = [campoJogar1,botaoJogar1,interruptorJogar1,campoMostrado1,botaoJogar2,botaoJogar3];

//Elementos tela criar
var campoCriar1 = new CampoInput(292,170,cor4,20,"Digite seu nome");
var interruptorCriar1 = new InterruptorValores(420,252,["Não","Sim"])
var botaoCriar1 = new Botao(292,230,cor4,"Privado:",AtualizarInterruptor,[interruptorCriar1]);
var campoCriar2 = new CampoInput(490,290,cor4,1,"","number",undefined);
var campoCriar3 = new CampoInput(425,230,cor4,20,"Senha","password");
var botaoCriar2 = new Botao(360,350,cor4,"Criar",CriarSala,[]);
var botaoCriar3 = new Botao(353,410,cor4,"Voltar",Principal,[]);
var elementosCriar = [campoCriar1,botaoCriar1,interruptorCriar1,campoCriar2,botaoCriar2,botaoCriar3];

//Elementos tela Tutorial
var botaoAvancar = new Botao(600,50,cor5,"Avançar",AvancarTutorial,[]);
var botaoVoltarTutorial = new Botao(100,50,cor5,"Voltar",VoltarTutorial,[]);

//Elementos tela Opções
var botaoMusicaOn = new Botao(390,250,cor2,"Ativar",OpcaoMusica,[true]);
var botaoMusicaOff = new Botao(390,250,cor2,"Desativar",OpcaoMusica,[false]);
var botaoMusica = botaoMusicaOff;
var botaoVoltarOpcoes = new Botao(350,350,cor2,"Voltar",VoltarOpcoes,[]);
var elementosOpcoes = [botaoMusica,botaoVoltarOpcoes];

//Elementos tela OpçõesJogando
var botaoTutorial = new Botao(337,200,cor3,"Tutorial",TutorialJogando,[]);
var botaoOpcoes = new Botao(351,260,cor3,"Opções",OpcoesJogando,[]);
var botaoVoltarOpcoesJogando = new Botao(351,320,cor3,"Voltar",VoltarOpcoesJogando,[]);
var botaoSair = new Botao(310,380,cor3,"Sair da Sala",Sair,[]);
var elementosOpcoesJogando = [botaoTutorial,botaoOpcoes,botaoVoltarOpcoesJogando,botaoSair];

//Elementos Finalização
var botaoContinuar = new Botao(635,260,cor3,"Continuar",Continuar,[]);
var botaoNovaPartida = new Botao(614,320,cor3,"Nova Partida",NovaPartida,[]);
var botaoSair = new Botao(670,380,cor3,"Sair",Sair,[]);
var elementosFinalizacao = [botaoContinuar,botaoNovaPartida,botaoSair];

var MenuPrincipal = function() {
    ctx.fillStyle = cor1.principal;
    ctx.fillRect(0,0,800,600);
    DesenharCaixa(245, 156, 300, 300, cor2, false);
    for (var i = 0; i < elementosPrincipal.length; i++) {
        elementosPrincipal[i].Atualizar();
    }
}

var MenuJogar = function() {
    ctx.fillStyle = cor2.principal;
    ctx.fillRect(0,0,800,600);
    DesenharCaixa(245, 156, 300, 300, cor3, false);
    botaoJogar2.parametros = [campoJogar1.valor,interruptorJogar1.valor == "Sim",campoJogar2.valor,campoJogar3.valor];
    ctx.fillStyle = "black";
    if (interruptorJogar1.valor == "Não") {
        ctx.fillText("Jogadores(2-4):",280,312)
        elementosJogar[3] = campoJogar2;
    }
    else {
        elementosJogar[3] = campoJogar3;
    }
    for (var i = 0; i < elementosJogar.length; i++) {
        elementosJogar[i].Atualizar();
    }
}

var MenuCriar = function() {
    ctx.fillStyle = cor3.principal;
    ctx.fillRect(0,0,800,600);
    DesenharCaixa(245, 156, 300, 300, cor4, false);
    botaoCriar2.parametros = [campoCriar1.valor,interruptorCriar1.valor == "Sim",campoCriar2.valor,campoCriar3.valor];
    ctx.fillStyle = "black";
    ctx.fillText("Jogadores(2-4):",280,310);
    for (var i = 0; i < elementosCriar.length; i++) {
        elementosCriar[i].Atualizar();
    }
    if (interruptorCriar1.valor == "Sim") {
        campoCriar3.Atualizar();
    }
}

var MenuTutorial = function() {
    ctx.fillStyle = cor4.principal;
    ctx.fillRect(0,0,800,600);
    var imgTutorial = new Image();
    imgTutorial.src = "/Client/TinGames/Jogos/Jogo-da-Velha/img/Tutoriais/Tutorial" + indexMenu + ".png";
    ctx.drawImage(imgTutorial,0,0,800,600);
    botaoAvancar.Atualizar();
    if (indexMenu > 0) {
        botaoVoltarTutorial.Atualizar();
    }
}

var MenuOpcoesJogando = function() {
    if (janelaOpcoes) {
        if (opcoesJogando) {
            MenuOpcoes();
        }
        else if (tutorialJogando) {
            MenuTutorial();
        }
        else {
            DesenharCaixa(245, 156, 300, 300, cor4, false);
            for (var i = 0; i < elementosOpcoesJogando.length; i++) {
                elementosOpcoesJogando[i].Atualizar();
            }
        }
    }
}

var MenuOpcoes = function() {
    if (!janelaOpcoes) {
        ctx.fillStyle = cor5.principal;
        ctx.fillRect(0,0,800,600);
    }
    DesenharCaixa(245, 156, 300, 300, cor3, false);
    
    ctx.fillStyle = "black";
    ctx.fillText("Música:",280,275);
    if (ativarMusica) {
        elementosOpcoes[0] = botaoMusicaOff;
    }
    else {
        elementosOpcoes[0] = botaoMusicaOn;
    }
    for (var i = 0; i < elementosOpcoes.length; i++) {
        elementosOpcoes[i].Atualizar();
    }
}

var AtualizaMenu = MenuPrincipal;