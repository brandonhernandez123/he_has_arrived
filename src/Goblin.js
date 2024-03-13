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
            // this.FollowPlayer(this.scene.player)


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

        this.scene.anims.create({
            key: 'goblin_hit',
            frames: this.scene.anims.generateFrameNumbers('goblin_hit', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'goblin_Death',
            frames: this.scene.anims.generateFrameNumbers('goblin_Death', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0
        })
    }


    // FollowPlayer(player) {
    //     const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

    //    console.log(distance)

    //    if(this.x > player.x + 15){
    //     this.flipX = true
    //     this.setVelocityX(-50)
    //    } else if(this.x < player.x) {
    //     this.flipX = false
    //     this.setVelocityX(50)
    //    }




    // }



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


    Dmg(damage){
    
        let subHealth =  this.defStat - damage
        console.log('damage minus defsat = ', subHealth)
        this.health -= subHealth
        console.log(this.health)
    }

}