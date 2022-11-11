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

class Owlbear {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = 200;
        this.y = 200;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 3;
    }

    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        switch (this.game.lastKey) {
            case 'PArrowLeft':
                this.setSpeed(-this.maxSpeed, 0);
                break;
            case 'PArrowRight':
                this.setSpeed(this.maxSpeed, 0);
                break;
            case 'PArrowUp':
                this.setSpeed(0, -this.maxSpeed);
                break;
            case 'PArrowDown':
                this.setSpeed(0, this.maxSpeed);
                break;
            default:
                this.setSpeed(0, 0);
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // boundaries
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }
        if (this.y < this.game.topMargin) {
            this.y = this.game.topMargin;
        }
        if (this.y > this.game.height - this.height) {
            this.y = this.game.height - this.height;
        }
    }

    setSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
    }
}

class Plant { }

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.lastKey = undefined;
        this.input = new InputHandler(this);
        this.owlbear = new Owlbear(this);
        this.topMargin = 175;
    }

    render(context) {
        this.owlbear.draw(context);
        this.owlbear.update();
    }
}

const game = new Game(canvas.width,canvas.height);
console.log(game);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
}

animate();
