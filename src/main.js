// game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

// main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 4,
    gameTimer: 45000  
}

// reserve keyboard vars
let keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;