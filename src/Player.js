import Phaser from "phaser";
import Boulder from '/home/brandonhdz123/projects/game_dev/game1/src/Boulder.js'
import Fireball from "/home/brandonhdz123/projects/game_dev/game1/src/Fireball.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_idle');

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
            key: 'player_run_anim',
            frames: scene.anims.generateFrameNumbers('player_run', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'player_atk_basic',
            frames: scene.anims.generateFrameNumbers('player_atk_basic', { start: 0, end: 7 }),
            frameRate: 24,
            repeat: -1
        });

        scene.anims.create({
            key: 'player_sp_atk',
            frames: scene.anims.generateFrameNumbers('player_sp_atk', { start: 0, end: 6 }),
            framerate: 2,
            repeat: -1
        })

        this.currentState = 'idle';
        this.gameState = {
            cursors: scene.input.keyboard.createCursorKeys(),
            atk: scene.input.keyboard.addKey('Z'),
            sp_atk: scene.input.keyboard.addKey('X')
        };



    }


    update() {
        if (this.gameState.cursors.right.isDown) {
            this.setVelocityX(200);
            this.flipX = false;
            this.currentState = 'running';
            this.anims.play('player_run_anim', true);
        } else if (this.gameState.cursors.left.isDown) {
            this.setVelocityX(-200);
            this.flipX = true;
            this.currentState = 'running';
            this.anims.play('player_run_anim', true);
        } else if (this.gameState.atk.isDown && this.currentState !== 'running') {
            this.anims.play('player_atk_basic', true);
            this.currentState = 'attacking';
            this.scene.time.delayedCall(300, () => {
                this.spawnBoulder()
            })

        } else if (this.gameState.sp_atk.isDown && this.currentState !== 'running') {
            this.anims.play('player_sp_atk', true)
            this.currentState = 'attacking'
            this.scene.time.delayedCall(300, () => {
                this.spawnFireball()
            })
        }




        else {
            this.setVelocityX(0);
            this.currentState = 'idle';
            this.anims.play('player_idle_anim', true);
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
