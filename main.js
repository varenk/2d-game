const canvas = document.getElementById('canvas1');
canvas.width = 1280;
canvas.height = 720;

const ctx = canvas.getContext('2d');

class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', e => {
            this.game.lastKey = 'P' + e.key;
        })
        window.addEventListener('keyup', e => {
            this.game.lastKey = 'R' + e.key;
        })
    }
}

class Owlbear { }

class Plant { }

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.lastKey = undefined;
        this.input = new InputHandler(this);
    }
}

const game = new Game(canvas.width,canvas.height);
console.log(game);
