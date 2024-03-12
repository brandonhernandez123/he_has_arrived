import Phaser from "phaser";

export default class Eclipsor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'eclipsor_idle')

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        //create under here
        this.CreateAnimations()

        this.setSize(60, 100);
        this.setOffset(80, 30)




        // create ends here
    }




    //update method
    update() {
        //update method begins here



        //update method ends here
    }



    //generate anims start here
    CreateAnimations() {
        this.scene.anims.create({
            key: 'eclipsor_idle',
            frames: this.scene.anims.generateFrameNumbers('eclipsor_idle', { start: 0, end: 14 }),
            frameRate: 8,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'eclipseWalk',
            frames: this.scene.anims.generateFrameNumbers('eclipseWalk', { start: 0, end: 11 }),
            frameRate: 8,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'eclipsor_fly',
            frames: this.scene.anims.generateFrameNumbers('eclipsor_fly', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'eclipseAtk',
            frames: this.scene.anims.generateFrameNumbers('eclipseAtk', { start: 0, end: 6 }),
            frameRate: 8,
            repeat: 0
        })
    }

    //anims end here
}