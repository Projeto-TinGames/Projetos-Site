function Sound(src,loop,volume) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.loop = loop;
    this.sound.style.display = "none";
    this.sound.volume = volume;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}

var ost = new Sound("../client/TinGames/Jogo-da-Velha/sons/jogo_da_velha_ost.wav",true,0.3);

AtualizaSom = (ativar) => {
    ControlaMusica(ost,ativar);
}

ControlaMusica = (musica, ativar) => {
    if (ativar) {
        musica.play();
        return;
    }
    musica.stop();
}