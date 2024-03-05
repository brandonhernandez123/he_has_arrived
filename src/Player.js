import Phaser from "phaser";
import Boulder from '../src/Boulder'
import Fireball from "../src/Fireball";
import Special from "../src/Special";
import Crystal_Warrior from "./Crystal_Warrior";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_idle');
       
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setSize(15, 40);
        this.setOffset(135, 80)

     
        this.currentState = 'idle';
        this.gameState = {
            cursors: scene.input.keyboard.createCursorKeys(),
            atk: scene.input.keyboard.addKey('Z'),
            sp_atk: scene.input.keyboard.addKey('X'),
            special: scene.input.keyboard.addKey('C')

        };

        this.CreateAbilityWaitTimes()

        this.createAnims()
        this.OnAnimComplete()
        this.CreatePhysicsGroups()



       



        



    }







    update() {

        this.PlayerMovement()
       



    }

    spawnFireball() {

        if (!this.isFireSpawning) {
            this.isFireSpawning = true
            const ballX = this.x
            const ballY = this.y + 30
            const ballDirection = this.flipX ? -1 : 1;

            const fireBall = new Fireball(this.scene, ballX, ballY, 'fireball')
            this.fireBallGroup.add(fireBall)
           
            fireBall.setVelocityX(500 * ballDirection)

            if (fireBall.x > this.x * 3) {
                fireBall.destroy()
            }

            this.scene.time.delayedCall(3000, () => {
                fireBall.destroy
                this.isFireSpawning = false
            })

        }




    }


    spawnBoulder() {

        if (!this.isBoulderSpawning) {
            this.isBoulderSpawning = true
            const boulderX = this.x
            const boulderY = this.y + 30
            const boulderDirection = this.flipX ? -1 : 1;

            const boulder = new Boulder(this.scene, boulderX, boulderY, 'boulder')
            this.boulderGroup.add(boulder)
            boulder.setVelocityX(500 * boulderDirection)

            if (boulder.x > this.x * 3) {
                boulder.destroy()
            }




            this.scene.time.delayedCall(3000, () => {
                boulder.destroy
                this.isBoulderSpawning = false
            })
























        }



    }



    spawnSpecial() {

        if (!this.isSpecialSpawning) {
            this.isSpecialSpawning = true

            const specialDirection = this.flipX ? -40 : 40;
            const specialX = this.x + specialDirection
            const specialY = this.y


            const specialObj = new Special(this.scene, specialX, specialY, 20, 50, 'red')
            this.specialGroup.add(specialObj)




            this.scene.time.delayedCall(500, () => {
                specialObj.destroy()
                this.isSpecialSpawning = false
            })

        }




    }





createAnims(){
    this.scene.anims.create({
        key: 'player_idle_anim',
        frames: this.scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });

    this.scene.anims.create({
        key: 'player_jump',
        frames: this.scene.anims.generateFrameNumbers('player_jump', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.scene.anims.create({
        key: 'player_falling',
        frames: this.scene.anims.generateFrameNumbers('player_falling', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.scene.anims.create({
        key: 'player_run_anim',
        frames: this.scene.anims.generateFrameNumbers('player_run', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.scene.anims.create({
        key: 'player_atk_basic',
        frames: this.scene.anims.generateFrameNumbers('player_atk_basic', { start: 0, end: 7 }),
        frameRate: 24,

        repeat: 0
    });

    this.scene.anims.create({
        key: 'player_sp_atk',
        frames: this.scene.anims.generateFrameNumbers('player_sp_atk', { start: 0, end: 7 }),
        framerate: 8,
        repeat: 0
    })

    this.scene.anims.create({
        key: 'player_super_atk',
        frames: this.scene.anims.generateFrameNumbers('player_super_atk', { start: 0, end: 24 }),
        framerate: 2,
        repeat: 0
    })
}




OnAnimComplete(){
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function (animation) {
        if (animation.key === 'player_atk_basic') {

            this.spawnBoulder()
            this.boulderWaitTime = true
            this.anims.play('player_idle_anim')
            this.boulderGui = this.scene.add.image(this.x - 200, this.y - 200, 'boulder').setScale(0.01)



            if (this.boulderWaitTime === true) {
                this.scene.time.delayedCall(2500, () => {
                    this.boulderWaitTime = false
                    console.log('timer expired switching to true')
                })


            }


        } else if (animation.key === 'player_sp_atk') {
            this.spawnFireball()
            this.fireBallWaitTime = true
            this.anims.play('player_idle_anim')


            if (this.fireBallWaitTime === true) {
                this.scene.time.delayedCall(3000, () => {
                    this.fireBallWaitTime = false
                    console.log('fire : timer expired switching to true')
                })


            }


        } else if (animation.key === 'player_super_atk') {
            this.spawnSpecial()
            this.specialWaitTime = true
            this.anims.play('player_idle_anim')


            if (this.specialWaitTime === true) {
                this.scene.time.delayedCall(5000, () => {
                    this.specialWaitTime = false
                    console.log('special : timer expired switching to true')
                })


            }


        }
    }, this)
}



CreateAbilityWaitTimes(){
    this.boulderWaitTime = false
    this.fireBallWaitTime = false
    this.specialWaitTime = false
}





PlayerMovement(){
    if (this.gameState.cursors.right.isDown && this.body.touching.down) {
        this.setVelocityX(200);
        this.flipX = false;
        this.currentState = 'running';
        this.anims.play('player_run_anim', true);
    } else if (this.gameState.cursors.left.isDown && this.body.touching.down) {
        this.setVelocityX(-200);
        this.flipX = true;
        this.currentState = 'running';
        this.anims.play('player_run_anim', true);
    } else if (this.gameState.cursors.up.isDown && (this.body.blocked.down || this.body.touching.down)) {
        this.setVelocityY(-400)
        this.anims.play('player_jump', true)
        console.log(this.anims.isPlaying)
        console.log(this.anims.currentAnim)
        this.currentState = 'jumping'
    } else if (this.body.velocity.y > 0 && !this.body.touching.down) {
        this.anims.play('player_falling', true)
    } else if (this.body.velocity.y < 0) {
        this.anims.play('player_jump', true)
    } else if (this.gameState.cursors.up.isDown && this.gameState.cursors.right.isDown) {
        this.setVelocityX(200)
        this.setVelocityY(-200)
        this.flipX = false
        this.currentState = 'jumping'

    }





    else if (this.gameState.atk.isDown && this.currentState !== 'running') {
        if (this.boulderWaitTime === false) {
            this.setVelocityX(0)
            this.play('player_atk_basic', true);
            this.currentState = 'attacking';

        }


    }

    else if (this.gameState.sp_atk.isDown && this.currentState !== 'running') {

        if (this.fireBallWaitTime === false) {
            this.setVelocityX(0)

            this.play('player_sp_atk', true)
            this.currentState = 'attacking'

        }
    }

    else if (this.gameState.special.isDown && this.currentState !== 'running' && this.body.touching.down) {
        if (this.specialWaitTime === false) {
            this.setVelocityX(0)

            this.play('player_super_atk', true);
            this.currentState = 'attacking';
            console.log(this.specialWaitTime)
        }



    }



    else {
        this.setVelocityX(0);
        this.currentState = 'idle';
        this.anims.play('player_idle_anim', true);
    }



    if (this.currentState === 'jumping') {
        this.setGravityY(400); // Adjust the gravity value based on your game
    }

    // Check if the player is on the ground to reset the jumping state
    if (this.body.blocked.down || this.body.touching.down) {
        this.currentState = 'idle';
    }

}



CreatePhysicsGroups(){
        this.boulderGroup = this.scene.physics.add.group()
        this.fireBallGroup = this.scene.physics.add.group()
        this.specialGroup = this.scene.physics.add.group()
}






































}