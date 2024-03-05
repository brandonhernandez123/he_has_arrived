import Phaser from "phaser";
import Player from './Player'
import Crystal_Warrior from "./Crystal_Warrior";
import Boulder from "./Boulder";
import Fireball from "./Fireball";
import Special from "./Special";
import player_idle from '../src/assets/Player/monk_idle.png'
import player_run from '../src/assets/Player/monk_run.png'
import player_atk_basic from '../src/assets/Player/monk_atk_basic.png'
import player_sp_atk from '../src/assets/Player/monk_sp_atk.png'
import player_super_atk from './assets/Player/monk_super_atk.png'
import player_jump from './assets/Player/monk_jump.png'
import player_falling from './assets/Player/monk_falling.png'

import boulder_object from '../src/assets/Player/boulder.png'
import fireball_object from '../src/assets/Player/fire_ball.png'
import flame from './assets/fire3.png'
import rocks from './assets/rocks.png'
import blood from './assets/bld.png'




import crystal_character_idle from '../src/assets/crystal_character/crystal_char_idle.png'
import crystal_character_hit from '../src/assets/crystal_character/crystal_char_hit.png'
import crystal_character_death from '../src/assets/crystal_character/crystal_char_death.png'


//background imports
import bg0 from '../src/assets/level1_bg/sky.png'
import bg1 from '../src/assets/level1_bg/cloud_lonely.png'
import bg2 from '../src/assets/level1_bg/clouds_bg.png'
import bg3 from '../src/assets/level1_bg/glacial_mountains.png'
import bg4 from '../src/assets/level1_bg/clouds_mg_3.png'
import bg5 from '../src/assets/level1_bg/clouds_mg_2.png'
import bg6 from '../src/assets/level1_bg/clouds_mg_2.png'
import bg7 from '../src/assets/level1_bg/clouds_mg_1.png'
import platform from '../src/assets/level1_bg/platform.png'
import snowflake from './assets/snowflake.png'







export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' })
    }

    gameState = {
        playerHealth: 200

    }










    preload() {
        //Player image loader
        this.load.spritesheet('player_idle', player_idle, { frameWidth: 1728 / 6, frameHeight: 128 })
        this.load.spritesheet('player_run', player_run, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_atk_basic', player_atk_basic, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_sp_atk', player_sp_atk, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_super_atk', player_super_atk, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_jump', player_jump, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_falling', player_falling, { frameWidth: 288, frameHeight: 128 })


        this.load.spritesheet('crystal_char_idle', crystal_character_idle, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('crystal_char_hit', crystal_character_hit, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('crystal_char_death', crystal_character_death, { frameWidth: 288, frameHeight: 128 })


        this.load.image('boulder', boulder_object)
        this.load.image('fireball', fireball_object)
        this.load.image('bg0', bg0)
        this.load.image('bg1', bg1)
        this.load.image('bg2', bg2)
        this.load.image('bg3', bg3)
        this.load.image('bg4', bg4)
        this.load.image('bg5', bg5)
        this.load.image('bg6', bg6)
        this.load.image('bg7', bg7)
        this.load.image('platform', platform)
        this.load.image('snowflake', snowflake)
        this.load.image('flame', flame)
        this.load.image('rocks', rocks)
        this.load.image('blood', blood)












    }




    parallaxBg() {
        const bgWidth = this.game.config.width * 4; // Adjust the multiplication factor based on your needs

        this.bg_0 = this.add.tileSprite(0, 0, bgWidth, this.game.config.height, 'bg0').setOrigin(0, 0);
        this.bg_1 = this.add.tileSprite(0, 0, bgWidth, this.game.config.height, 'bg1').setOrigin(0, 0);
        this.bg_2 = this.add.tileSprite(0, 0, bgWidth, this.game.config.height, 'bg2').setOrigin(0, 0);
        this.bg_3 = this.add.tileSprite(0, 0, bgWidth, this.game.config.height, 'bg3').setOrigin(0, 0);
        this.bg_4 = this.add.tileSprite(0, 0, bgWidth, this.game.config.height, 'bg4').setOrigin(0, 0);
        this.bg_5 = this.add.tileSprite(0, 0, bgWidth, this.game.config.height, 'bg5').setOrigin(0, 0);
        this.bg_6 = this.add.tileSprite(0, 0, bgWidth, this.game.config.height, 'bg6').setOrigin(0, 0);
        this.bg_7 = this.add.tileSprite(0, 0, bgWidth, this.game.config.height, 'bg7').setOrigin(0, 0);

        this.bg_0.setScrollFactor(0);
        this.bg_1.setScrollFactor(0.1);
        this.bg_2.setScrollFactor(0.2);
        this.bg_3.setScrollFactor(0.3);
        this.bg_4.setScrollFactor(0.4);
        this.bg_5.setScrollFactor(0.5);
        this.bg_6.setScrollFactor(0.6);
        this.bg_7.setScrollFactor(0.7);



    }






    create() {


        this.parallaxBg()


        this.player = new Player(this, 200, 100)
        this.crystal_warrior = new Crystal_Warrior(this, 200, 100)

        this.cameras.main.setBounds(0, 0, 3000, 216)

        this.cameras.main.startFollow(this.player, false, 0.5, 0.5)



        const platforms = this.physics.add.staticGroup();
        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.crystal_warrior, platforms)

        


        platforms.create(100, 215, 'platform').setScale(200, .01).refreshBody();

        this.crystal_warrior.flipX = true


        this.Collisions()
       


        const snowflakes = this.add.particles(160, 10, 'snowflake',
        {
           
            color: [ 0xffffff ],
            colorEase: 'quad.out',
            lifespan: 6000,
            angle: { min: -90, max: 180},
            scale: { start: 0.1, end: 0.1, ease: 'sine.out' },
            speed: 50,
            advance: 2000,
            blendMode: 'ADD'
        });






    }








    update() {

        this.player.update()
        this.crystal_warrior.update()











    }


    Collisions(){

        //boulder collision
        this.physics.add.collider(this.player.boulderGroup, this.crystal_warrior, () => {
            this.dmgCounter = this.add.text(this.crystal_warrior.x, this.crystal_warrior.y, '20', {fontSize: '6px', color: '#ff0000'})
            const rocks = this.add.particles(this.crystal_warrior.x, this.crystal_warrior.y + 30, 'rocks',
            {
               
                
                color: [0xb38c67, 0x8b7355, 0x6f5c4f], // Dirt colors
                lifespan: 1000, // Shorter lifespan for a quicker explosion
                angle: { min: 0, max: 360 }, // Adjusted angle range
                scale: { start: 0.8, end: 0, ease: 'sine.out' }, // Adjusted scale values
                speed: 150, // Increased speed for a quicker explosion
                blendMode: 'ADD'
            });

            const blood = this.add.particles(this.crystal_warrior.x, this.crystal_warrior.y + 30, 'blood',
            {
               
                
                color: [0x8B0000, 0xB22222, 0xFF0000], // Different shades of red for a more realistic blood color
    lifespan: 400, // Longer lifespan to allow the blood to linger a bit
    angle: { min: 120, max: 360 },
    scale: { start: 0.05, end: 0, ease: 'sine.out' }, // Adjusted scale values
    speed: 300, // Moderate speed for a blood splatter
    blendMode: 'NORMAL',
    alpha: { start: 1, end: 1 }
            });
    
            this.time.delayedCall(400, () => {
                this.dmgCounter.destroy()
                rocks.destroy()
                blood.destroy()
            })

            
            console.log('warrior hit')
            this.crystal_warrior.damageTaken(20)
            if (this.crystal_warrior.crystalWarriorHealth <= 0) {
                this.crystal_warrior.charDead()
                this.time.delayedCall(800, () => {
                    this.crystal_warrior.destroy()
                }, this)
            }
        }, null, this)


// fireball collision


        this.physics.add.collider(this.player.fireBallGroup, this.crystal_warrior, () => {
            this.dmgCounter = this.add.text(this.crystal_warrior.x, this.crystal_warrior.y, '20', {fontSize: '6px', color: '#ff0000'})
            const rocks = this.add.particles(this.crystal_warrior.x, this.crystal_warrior.y + 30, 'flame',
            {
               
                
                color: [0xb38c67, 0x8b7355, 0x6f5c4f], // Dirt colors
                lifespan: 200, // Shorter lifespan for a quicker explosion
                angle: { min: 0, max: 360 }, // Adjusted angle range
                scale: { start: 0.2, end: 0, ease: 'sine.out' }, // Adjusted scale values
                speed: 150, // Increased speed for a quicker explosion
                blendMode: 'ADD'
            });

            const blood = this.add.particles(this.crystal_warrior.x, this.crystal_warrior.y + 30, 'blood',
            {
               
                
                color: [0x8B0000, 0xB22222, 0xFF0000], // Different shades of red for a more realistic blood color
    lifespan: 400, // Longer lifespan to allow the blood to linger a bit
    angle: { min: 120, max: 360 },
    scale: { start: 0.05, end: 0, ease: 'sine.out' }, // Adjusted scale values
    speed: 300, // Moderate speed for a blood splatter
    blendMode: 'NORMAL',
    alpha: { start: 1, end: 1 }
            });
    
            this.time.delayedCall(300, () => {
                this.dmgCounter.destroy()
                rocks.destroy()
                blood.destroy()
            })

            
            console.log('warrior hit')
            this.crystal_warrior.damageTaken(20)
            if (this.crystal_warrior.crystalWarriorHealth <= 0) {
                this.crystal_warrior.charDead()
                this.time.delayedCall(800, () => {
                    this.crystal_warrior.destroy()
                }, this)
            }
        }, null, this)




        //special collision
       this.physics.add.collider(this.player.specialGroup, this.crystal_warrior,() => {
        this.crystal_warrior.damageTaken(1)
        this.crystal_warrior.setVelocityY(-400)
        if (this.crystal_warrior.crystalWarriorHealth <= 0) {
            this.crystal_warrior.charDead()
            this.time.delayedCall(800, () => {
                this.crystal_warrior.destroy()
            }, this)
        }
       })





    }

    spawnEnemy(){

    }







    
}