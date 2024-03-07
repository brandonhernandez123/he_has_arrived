import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import Menu from './menu'
import Cutscene1 from './cutscene1';
import Level1 from './level1';


class MyGame extends Phaser.Scene {
    constructor() {
        super({ key: 'myGame' });
    }

    preload() {
        //  This is an example of a bundled image:
        this.load.image('logo', logoImg);

        //  This is an example of loading a static image from the public folder:
        this.load.image('background', 'assets/bg.jpg');
    }

    create() {
        this.add.image(400, 300, 'background');

        const logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}

const config = {
    type: Phaser.AUTO,

    width: 480,
    height: 270,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            enableBody: true,
            debug: true
        },
    },
    scene: [Level1, Menu, Cutscene1,]
};

const game = new Phaser.Game(config);
