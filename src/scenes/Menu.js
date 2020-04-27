class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load image
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.image('UI old',  './assets/UI old.png');
        this.load.image('mainBack', './assets/mainback.png');
        this.load.image('textBack', './assets/textBack.png');
    }

    create(){
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#00000000',
            color: '#E0FFF6',
            align:'right',
            padding:{
                top:5,
                bottom:5,
            },
            fixedWidth:0
        }

        let titleConfig = {
            fontFamily: 'fantasy',
            fontSize: '27px',
            backgroundColor: '#00000000',
            color: '#E0FFF6',
            align: 'right',
            padding: {
                top:5,
                bottom:5,
            },
            fixedWidth:0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;


        this.mainBack = this.add.tileSprite(0, 0, 680, 480, 'mainBack').
        setOrigin(0,0);
        this.UI =  this.add.tileSprite(centerX, centerY - 130, 551, 64, 'UI old').
        setOrigin(0.5);
        this.textBack =  this.add.tileSprite(centerX, 270, 624, 130, 'textBack').
        setOrigin(0.5);

        this.add.text(centerX, centerY - 130, 'Fish Racing Escape', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use arrows to change swimming position', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Press ← for EASY or → for HARD', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 45000   
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 6,
                gameTimer: 30000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}