import Phaser from "phaser";

export default class Boulder extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'boulder')

        scene.add.existing(this)
        scene.physics.add.existing(this)


        this.setScale(0.02)

        this.body.setGravity(0)






    }
}