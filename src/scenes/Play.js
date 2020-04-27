class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield1', './assets/starfield1.png');
        this.load.image('starfield2', './assets/starfield2.png');
        this.load.image('starfield3', './assets/starfield3.png');
        this.load.image('starfield4', './assets/starfield4.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').
        setOrigin(0, 0);
        this.starfield0 = this.add.tileSprite(0, 50, 640, 70, 'starfield1').
        setOrigin(0,0);
        this.starfield1 = this.add.tileSprite(0, 120, 640, 70, 'starfield1').
        setOrigin(0,0);
        this.starfield2 = this.add.tileSprite(0, 190, 640, 70, 'starfield2').
        setOrigin(0,0);
        this.starfield3 = this.add.tileSprite(0, 260, 640, 70, 'starfield3').
        setOrigin(0,0);
        this.starfield4 = this.add.tileSprite(0, 330, 640, 73, 'starfield4').
        setOrigin(0,0);

        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        // this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 350, 'rocket').setOrigin(0, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // player 1 score
        this.p1Score = 0;
        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //typeface for ending
        let endConfig = {
            fontFamily: 'fantasy',
            fontSize: '28px',
            backgroundColor: '#5DDEDE',
            color: '#000000',
            align: 'right',
            padding: {
                top:5,
                bottom:5,
            },
            fixedWidth: 100
        }


        //get timer
        //timer tutorial: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
        var timer = this.time.addEvent({
            delay: 1000,
            callback: this.isTiming,
            callbackScope: this,
            repeat: (game.settings.gameTimer/1000)+1,
        });

        //game over flag
        this.gameOver = false;

        //60S play clock
        endConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>{  
            this.add.text(game.config.width/2, game.config.height/2 - 180, 'Faster', endConfig).setOrigin(0.5); 
            game.settings = {
                spaceshipSpeed: game.settings.spaceshipSpeed+=3,   
            }
        }, null, this);

        this.clock = this.time.delayedCall(game.settings.gameTimer*2, () =>{  
            this.add.text(game.config.width/2, game.config.height/2 - 180, 'Want more speed?', endConfig).setOrigin(0.5); 
            game.settings = {
                spaceshipSpeed: game.settings.spaceshipSpeed+=6,   
            }
        }, null, this);

    }

    update() {
        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // 当玩家爆炸，游戏结束
        if (this.gameOver) {
             this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
             this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        }

        //scroll starfield
        this.starfield0.tilePositionX -= 3;
        this.starfield1.tilePositionX -= 2.5;
        this.starfield2.tilePositionX -= 2;
        this.starfield3.tilePositionX -= 1.5;
        this.starfield4.tilePositionX -= 1;

        this.starfield0.tilePositionY -= 0.3;
        this.starfield1.tilePositionY -= 0.3;   
        this.starfield2.tilePositionY -= 0.3;   
        this.starfield3.tilePositionY -= 0.3;   
        this.starfield4.tilePositionY -= 0.3; 

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }             
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            //this.shipExplode(this.ship03); 
            this.rocketExplode(this.p1Rocket.x, this.p1Rocket.y);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            //this.shipExplode(this.ship02);
            this.rocketExplode(this.p1Rocket.x, this.p1Rocket.y);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            //this.shipExplode(this.ship01);
            this.rocketExplode(this.p1Rocket.x, this.p1Rocket.y);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    // shipExplode(ship) {
    //     ship.alpha = 0;                         // temporarily hide ship
    //     // create explosion sprite at ship's position
    //     let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    //     boom.anims.play('explode');             // play explode animation
    //     boom.on('animationcomplete', () => {    // callback after animation completes
    //         ship.reset();                       // reset ship position
    //         ship.alpha = 1;                     // make ship visible again
    //         boom.destroy();                     // remove explosion sprite
    //     });
    //     // score increment and repaint
    //     this.p1Score += ship.points;
    //     this.scoreLeft.text = this.p1Score;     
    //     // play sound
    //     this.sound.play('sfx_explosion');  
    // }

    // 玩家爆炸
    rocketExplode(x, y) {
        this.p1Rocket.alpha = 0;
        let boom = this.add.sprite(x, y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            this.p1Rocket.reset();
            boom.destroy();
            this.gameOver = true;
        });
        this.sound.play('sfx_explosion');
    }
}