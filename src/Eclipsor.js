import Phaser from "phaser";

export default class Eclipsor extends Phaser.Physics.Arcade.Sprite() {
    constructor(scene, x, y) {
        super(scene, x, y, 'eclipsor_idle')
        //create under here
        this.Animations()






        // create ends here
    }




    //update method
    update() {
        //update method begins here



        //update method ends here
    }



    //generate anims start here
    Animations() {
        this.scene.anim.create({
            key: 'eclipsor_idle',
            frames: this.scene.anims.generateFrameNumbers('eclipsor_idle', { start: 0, end: 14 }),
            frameRate: 8,
            repeat: -1
        })

        this.scene.anim.create({
            key: 'eclipsor_walk',
            frames: this.scene.anims.generateFrameNumbers('eclipsor_walk', { start: 0, end: 11 }),
            frameRate: 8,
            repeat: -1
        })

        this.scene.anim.create({
            key: 'eclipsor_fly',
            frames: this.scene.anims.generateFrameNumbers('eclipsor_fly', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        })

        this.scene.anim.create({
            key: 'eclipsor_atk1',
            frames: this.scene.anims.generateFrameNumbers('eclipsor_atk1', { start: 0, end: 6 }),
            frameRate: 8,
            repeat: 0
        })
    }

    //anims end here
}