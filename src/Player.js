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
        this.inDialogue = false;

        this.currentState
        this.gameState = {
            cursors: scene.input.keyboard.createCursorKeys(),
            atk: scene.input.keyboard.addKey('J'),
            sp_atk: scene.input.keyboard.addKey('K'),
            special: scene.input.keyboard.addKey('L'),
            roll: scene.input.keyboard.addKey('SHIFT'),
            right: scene.input.keyboard.addKey('D'),
            left: scene.input.keyboard.addKey('A'),
            jump: scene.input.keyboard.addKey("SPACE")

        };

        this.CreateAbilityWaitTimes()

        this.createAnims()
        this.OnAnimComplete()
        this.CreatePhysicsGroups()











    }







    update() {

        this.InCutscene()


        if (this.inDialogue === false) {
            this.PlayerMovement()
            this.PlayerAttacks()
        }








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





    createAnims() {
        this.scene.anims.create({
            key: 'player_idle_anim',
            frames: this.scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
            frameRate: 4,
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
            repeat: 0
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
            frameRate: 18,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'player_roll',
            frames: this.scene.anims.generateFrameNumbers('player_roll', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: 0
        })
    }




    OnAnimComplete() {
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function (animation) {
            if (animation.key === 'player_atk_basic') {

                this.spawnBoulder()
                this.boulderWaitTime = true
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


                if (this.fireBallWaitTime === true) {
                    this.scene.time.delayedCall(3000, () => {
                        this.fireBallWaitTime = false
                        console.log('fire : timer expired switching to true')
                    })


                }


            } else if (animation.key === 'player_super_atk') {
                this.spawnSpecial()
                this.specialWaitTime = true


                if (this.specialWaitTime === true) {
                    this.scene.time.delayedCall(5000, () => {
                        this.specialWaitTime = false
                        console.log('special : timer expired switching to true')
                    })


                }


            } else if (animation.key === 'player_roll') {
                this.rollWaitTime = true
                this.scene.time.delayedCall(600, () => {
                    this.rollWaitTime = false

                })
            } else if (animation.key === 'player_run_anim') {
            }
        }, this)
    }



    CreateAbilityWaitTimes() {
        this.boulderWaitTime = false
        this.fireBallWaitTime = false
        this.specialWaitTime = false
        this.rollWaitTime = false
    }





    PlayerMovement() {

        if (this.gameState.right.isDown && this.body.touching.down) {
            this.setVelocityX(150)
            this.anims.play('player_run_anim', true)
            this.flipX = false
        } else if (this.gameState.left.isDown && this.body.touching.down) {
            this.setVelocityX(-150)
            this.anims.play('player_run_anim', true)
            this.flipX = true
        } else if (Phaser.Input.Keyboard.JustDown(this.gameState.roll) && this.rollWaitTime === false && this.body.touching.down) {
            const facingDir = this.flipX ? -2000 : 2000
            this.setVelocityX(facingDir)
            this.anims.play('player_roll', true)

        }


        else {
            this.setVelocityX(0)
            this.anims.playAfterDelay('player_idle_anim', 18)
        }




        if (this.body.velocity.y < 0) {
            this.anims.play('player_jump')
        }



    }



    CreatePhysicsGroups() {
        this.boulderGroup = this.scene.physics.add.group()
        this.fireBallGroup = this.scene.physics.add.group()
        this.specialGroup = this.scene.physics.add.group()
    }



    PlayerAttacks() {
        if (Phaser.Input.Keyboard.JustDown(this.gameState.atk)) {
            if (this.boulderWaitTime === false) {
                this.setVelocityX(0)
                this.play('player_atk_basic', true);
                this.currentState = 'attacking';

            }


        }

        else if (Phaser.Input.Keyboard.JustDown(this.gameState.sp_atk)) {

            if (this.fireBallWaitTime === false) {
                this.setVelocityX(0)

                this.play('player_sp_atk', true)
                this.currentState = 'attacking'

            }
        }

        else if (Phaser.Input.Keyboard.JustDown(this.gameState.special)) {
            if (this.specialWaitTime === false) {
                this.setVelocityX(0)

                this.play('player_super_atk', true);
                this.currentState = 'attacking';
                console.log(this.specialWaitTime)
            }



        }


    }

    InCutscene() {
        if (this.inDialogue === true) {
            this.setVelocityX(0)
            this.anims.play('player_idle_anim', true)
        }

    }












































}
