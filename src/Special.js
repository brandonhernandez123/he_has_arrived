import Phaser from "phaser";

export default class Special extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, color) {
        super(scene, x, y, width, height, color)

        scene.add.existing(this)
        // scene.physics.add.existing(this)
        this.setOrigin(0, 0)











    }
}