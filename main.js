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
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 30;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = 200;
        this.y = 200;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 3;
        this.image = document.getElementById('owlbear');
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        switch (this.game.lastKey) {
            case 'PArrowLeft':
                this.setSpeed(-this.maxSpeed, 0);
                this.frameY = 3;
                break;
            case 'RArrowLeft':
                if (this.speedX < 0) {
                    this.setSpeed(0, 0);
                    this.frameY = 2;
                }
                break;
            case 'PArrowRight':
                this.setSpeed(this.maxSpeed, 0);
                this.frameY = 5;
                break;
            case 'RArrowRight':
                if (this.speedX > 0) {
                    this.setSpeed(0, 0);
                    this.frameY = 4;
                }
                break;
            case 'PArrowUp':
                this.setSpeed(0, -this.maxSpeed * 0.6);
                this.frameY = 7;
                break;
            case 'RArrowUp':
                if (this.speedY < 0) {
                    this.setSpeed(0, 0);
                    this.frameY = 6;
                }
                break;
            case 'PArrowDown':
                this.setSpeed(0, this.maxSpeed * 0.6);
                this.frameY = 1;
                break;
            case 'RArrowDown':
                if (this.speedY > 0) {
                    this.setSpeed(0, 0);
                    this.frameY = 0;
                }
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

        //sprite animation
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
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
