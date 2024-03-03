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

        this.currentState = 'idle';
        this.gameState = {
            cursors: scene.input.keyboard.createCursorKeys(),
            atk: scene.input.keyboard.addKey('Z'),
            sp_atk: scene.input.keyboard.addKey('X'),
            special: scene.input.keyboard.addKey('C')
            
        };

        // this.cKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        // this.zKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)


        scene.anims.create({
            key: 'player_super_atk',
            frames: scene.anims.generateFrameNumbers('player_super_atk', {start: 0, end: 24}),
            framerate: 8,
            repeat: 0
        })

        

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function(animation){
            if(animation.key === 'player_atk_basic'){
                
                this.spawnBoulder()
                this.boulderWaitTime = true
                

                if(this.boulderWaitTime === true){
                    this.scene.time.delayedCall(3000,() => {
                        this.boulderWaitTime = false
                        console.log('timer expired switching to true')
                    })
        
                    
                }

                
            } else if (animation.key === 'player_sp_atk'){
                this.spawnFireball()
                this.fireBallWaitTime = true


                if(this.fireBallWaitTime === true){
                    this.scene.time.delayedCall(3000,() => {
                        this.fireBallWaitTime = false
                        console.log('fire : timer expired switching to true')
                    })
        
                    
                }
               
                
            }
        }, this)

        
   

        



    }

   


    update() {

        console.log(this.boulderWaitTime)
        console.log('special wait time', this.specialWaitTime)

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
        } 
        
       

      
        
        else if (this.gameState.atk.isDown && this.currentState !== 'running') {
            if(this.boulderWaitTime === false){
               this.play('player_atk_basic', true);
            this.currentState = 'attacking'; 
            console.log(this.boulderWaitTime)
            
            } 
            
            
        }

         else if (this.gameState.sp_atk.isDown && this.currentState !== 'running') {

            if(this.fireBallWaitTime === false){

                this.play('player_sp_atk', true)
                this.currentState = 'attacking'
                console.log(this.fireBallWaitTime)

            }
        }

        else if (this.gameState.special.isDown && this.currentState !== 'running') {
                if(this.specialWaitTime === false){
                    this.play('player_super_atk', true);
                this.currentState = 'attacking';  
                } 
                return
              
            
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
