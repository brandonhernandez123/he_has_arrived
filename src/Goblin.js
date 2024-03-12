import Phaser from "phaser";
import Player from "./Player";

export default class Goblin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'goblin_idle')

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setSize(30, 60);
        this.setOffset(70, 70)
        this.health = 49
        this.atkStat = 30
        this.defStat = 22
        this.xp = 45
        this.possessed = false

        this.CreateAnims()

    }


    update() {

        console.log(this.possessed)
        if (this.health > 0) {
            this.anims.play('goblin_idle', true)
            this.FollowPlayer(this.scene.player)


        } else if (this.health > 0 && this.possessed) {
            this.EnemyPossessed()
        }


    }


    CreateAnims() {
        this.scene.anims.create({
            key: 'goblin_idle',
            frames: this.scene.anims.generateFrameNumbers('goblin_idle', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        })
    }


    FollowPlayer(player) {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (distance < 50) {
            console.log('Attack!');
            this.setVelocity(0, 0); // Stop moving
            // Add your attack logic here
        } else {
            console.log('Chase');
            this.scene.physics.moveToObject(this, player, 100); // Adjust speed as needed
        }
    }



    EnemyPossessed() {
        if (this.possessed === true && this.health <= 50) {
            this.cursors = scene.input.keyboard.createCursorKeys()
            this.right = this.scene.input.keyboard.addKey("D")
            this.left = this.scene.input.keyboard.addKey("A")


            if (this.right.isDown) {
                this.setVelocityX(100)
            } else if (this.left.isDown) {
                this.setVelocityX(-100)
            } else {
                this.setVelocityX(0)
            }
        }
    }

}