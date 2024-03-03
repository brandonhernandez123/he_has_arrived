import Phaser from "phaser";
import Boulder from '../src/Boulder'
import Fireball from "../src/Fireball";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_idle');
        this.boulderWaitTime = false
        this.fireBallWaitTime = false
        this.specialWaitTime = false
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setSize(15, 120);

        scene.anims.create({
            key: 'player_idle_anim',
            frames: scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'player_jump',
            frames: scene.anims.generateFrameNumbers('player_jump', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'player_falling',
            frames: scene.anims.generateFrameNumbers('player_falling', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'player_run_anim',
            frames: scene.anims.generateFrameNumbers('player_run', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'player_atk_basic',
            frames: scene.anims.generateFrameNumbers('player_atk_basic', { start: 0, end: 7 }),
            frameRate: 30,

            repeat: 0
        });

        scene.anims.create({
            key: 'player_sp_atk',
            frames: scene.anims.generateFrameNumbers('player_sp_atk', { start: 0, end: 6 }),
            framerate: 30,
            repeat: 0
        })

        scene.anims.create({
            key: 'player_super_atk',
            frames: scene.anims.generateFrameNumbers('player_super_atk', { start: 0, end: 24 }),
            framerate: 23,
            repeat: 0
        })
        this.currentState = 'idle';
        this.gameState = {
            cursors: scene.input.keyboard.createCursorKeys(),
            atk: scene.input.keyboard.addKey('Z'),
            sp_atk: scene.input.keyboard.addKey('X'),
            special: scene.input.keyboard.addKey('C')

        };

        // this.cKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        // this.zKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)





        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function (animation) {
            if (animation.key === 'player_atk_basic') {

                this.spawnBoulder()
                this.boulderWaitTime = true
                this.anims.play('player_idle_anim')
                this.boulderGui = scene.add.image(this.x - 200, this.y - 200, 'boulder').setScale(0.01)



                if (this.boulderWaitTime === true) {
                    this.scene.time.delayedCall(3000, () => {
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




    update() {


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
        } else if (this.gameState.cursors.right.isDown && this.gameState.cursors.up.isDown) {
            this.setVelocityX(200)
            this.setVelocityY(-200)
            this.flipX = false
            this.currentState = 'jumping'

        }





        else if (this.gameState.atk.isDown && this.currentState !== 'running') {
            if (this.boulderWaitTime === false) {
                this.play('player_atk_basic', true);
                this.currentState = 'attacking';

            }


        }

        else if (this.gameState.sp_atk.isDown && this.currentState !== 'running') {

            if (this.fireBallWaitTime === false) {

                this.play('player_sp_atk', true)
                this.currentState = 'attacking'

            }
        }

        else if (this.gameState.special.isDown && this.currentState !== 'running' && this.body.touching.down) {
            if (this.specialWaitTime === false) {
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

    spawnFireball() {

        if (!this.isFireSpawning) {
            this.isFireSpawning = true
            const ballX = this.x
            const ballY = this.y + 30
            const ballDirection = this.flipX ? -1 : 1;

            const fireBall = new Fireball(this.scene, ballX, ballY, 'fireball')

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
}
