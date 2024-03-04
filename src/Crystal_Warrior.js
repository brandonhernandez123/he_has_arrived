import Phaser from "phaser";
import Boulder from "./Boulder";

export default class Crystal_Warrior extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'crystal_char_idle')


        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true);
        this.setSize(15, 40);
        this.setOffset(135, 85)



        scene.anims.create({
            key: 'crystal_char_idle',
            frames: scene.anims.generateFrameNumbers('crystal_char_idle', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'crystal_char_hit',
            frames: scene.anims.generateFrameNumbers('crystal_char_hit', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: 0
        });

        scene.anims.create({
            key: 'crystal_char_death',
            frames: scene.anims.generateFrameNumbers('crystal_char_death', { start: 0, end: 14 }),
            frameRate: 8,
            repeat: 0
        });


        this.crystalWarriorHealth = 100
        this.currentState = 'idle'

        this.hp = scene.add.text(this.x, this.y - 10, 'HP: ' + this.crystalWarriorHealth, {fontSize: '8px', fill: '#fff'})


        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function (animation) {
            if (animation.key === 'crystal_char_hit') {
                this.currentState = 'idle'
                this.anims.play('crystal_char_idle', true)
            } else if (animation.key === 'crystal_char_death') {
                this.anims.stop()
                this.hp.destroy()
            }
        })

    }


    damageTaken(dmg) {
        console.log(this.crystalWarriorHealth)
        this.crystalWarriorHealth -= dmg
        this.currentState = 'hit'
        this.anims.play('crystal_char_hit', true)
        this.hp.setText('hp: ', this.crystalWarriorHealth)
        

    }

    charDead() {
        this.anims.play('crystal_char_death', true)
    }


    update() {
        if (this.currentState !== 'hit') {
            this.anims.play('crystal_char_idle', true)
        }

        
        this.hp.x = this.x
        this.hp.y = (this.y + 5)
        console.log(this.crystalWarriorHealth)
        this.hp.setText('HP: ' + this.crystalWarriorHealth)






    }
}