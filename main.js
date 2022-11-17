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
        this.maxSpeed = 2;
        this.image = document.getElementById('owlbear');
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
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

    update(deltaTime) {
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
        if (this.frameTimer > this.frameInterval) {
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    setSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
    }
}

class Obstacle {
    constructor(game, imageWidth, imageHeight) {
        this.game = game;
        this.width = imageWidth;
        this.height = imageHeight;
        this.x = Math.random() * this.game.width - this.width;
        this.y = this.game.topMargin + Math.random() * (this.game.height - this.height - this.game.topMargin);
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {

    }
}

class Bush extends Obstacle {
    constructor(game) {
        super(game, 216, 100);
        this.game = game;
        this.image = document.getElementById('bush');
    }
}

class Plant extends Obstacle {
    constructor(game) {
        super(game, 212, 118);
        this.game = game;
        this.image = document.getElementById('plant');
    }
}

class Grass extends Obstacle {
    constructor(game) {
        super(game, 103, 183);
        this.game = game;
        this.image = document.getElementById('grass');
    }
}

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.lastKey = undefined;
        this.input = new InputHandler(this);
        this.owlbear = new Owlbear(this);
        this.topMargin = 175;
        this.numberOfObstacles = 10;
        this.obstacles = [];
        this.gameObjects = [];
    }

    render(context, deltaTime) {
        this.gameObjects = [this.owlbear, ...this.obstacles];
        this.gameObjects.sort((a, b) => (a.y + a.height) - (b.y + b.height));
        this.gameObjects.forEach(object => {
            object.draw(ctx);
            object.update(deltaTime);
        })
    }

    init() {
        for (let i = 0; i < this.numberOfObstacles; i++) {
            const randomNumber = Math.random();
            if (randomNumber < 0.3) {
                this.obstacles.push(new Bush(this));
            } else if (randomNumber < 0.6) {
                this.obstacles.push(new Plant(this));
            } else {
                this.obstacles.push(new Grass(this));
            }
        }
    }
}

const game = new Game(canvas.width, canvas.height);
game.init();

let lastTime = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
}

animate(0);
