import Phaser from "phaser";

export default class FireBall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'fireball')

        scene.add.existing(this)
        scene.physics.add.existing(this)


        this.setScale(0.04)

        this.body.setGravity(0)






    }
}