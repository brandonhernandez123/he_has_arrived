import Phaser from "phaser";



export default class Cutscene1 extends Phaser.Scene {
    constructor(config) {
        super({ key: 'Cutscene1' })
    }




    preload() {


    }

    gameState = {}
    create() {

        this.add.text(300, 300, "Hello World")

    }

    update() {


    }
}