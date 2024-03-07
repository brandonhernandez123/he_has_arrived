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
import player_roll from './assets/Player/monk_roll.png'
import player_portrait from './assets/Player/ground_monk.png'

import boulder_object from '../src/assets/Player/boulder.png'
import fireball_object from '../src/assets/Player/fire_ball.png'
import flame from './assets/fire3.png'
import rocks from './assets/rocks.png'
import blood from './assets/bld.png'




import crystal_character_idle from '../src/assets/crystal_character/crystal_char_idle.png'
import crystal_character_hit from '../src/assets/crystal_character/crystal_char_hit.png'
import crystal_character_death from '../src/assets/crystal_character/crystal_char_death.png'
import crystal_character_walk from './assets/crystal_character/crystal_warrior_walk.png'
import crystal_portrait from './assets/crystal_character/crystal_mauler.png'

import eclipsor_idle from './assets/Eclipsor/eclipsor_idle.png'
import eclipsor_walk from './assets/Eclipsor/eclipsor_walk.png'
import eclipsor_fly from './assets/Eclipsor/eclipsor_fly.png'
import eclipsor_atk1 from './assets/Eclipsor/eclipsor_atk1.png'





//background imports
import bg0 from '../src/assets/level1_bg/Battleground1.png'


import platform from '../src/assets/level1_bg/platform.png'
import snowflake from './assets/snowflake.png'







export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' })
    }

    gameState = {
        playerHealth: 200

    }


    nextLine = 0







    preload() {
        //Player image loader
        this.load.spritesheet('player_idle', player_idle, { frameWidth: 1728 / 6, frameHeight: 128 })
        this.load.spritesheet('player_run', player_run, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_atk_basic', player_atk_basic, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_sp_atk', player_sp_atk, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_super_atk', player_super_atk, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_jump', player_jump, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_falling', player_falling, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('player_roll', player_roll, { frameWidth: 288, frameHeight: 128 })


        this.load.spritesheet('crystal_char_idle', crystal_character_idle, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('crystal_char_hit', crystal_character_hit, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('crystal_char_death', crystal_character_death, { frameWidth: 288, frameHeight: 128 })
        this.load.spritesheet('crystal_char_walk', crystal_character_walk, { frameWidth: 288, frameHeight: 128 })



        this.load.spritesheet('eclipsor_idle', eclipsor_idle, { frameWidth: 192, frameHeight: 112 })
        this.load.spritesheet('eclipsor_walk', eclipsor_walk, { frameWidth: 192, frameHeight: 122 })
        this.load.spritesheet('eclipsor_fly', eclipsor_fly, { frameWidth: 192, frameHeight: 112 })
        this.load.spritesheet('eclipsor_atk1', eclipsor_atk1, { frameWidth: 192, frameHeight: 112 })



        this.load.image('boulder', boulder_object)
        this.load.image('fireball', fireball_object)
        this.load.image('bg0', bg0)


        this.load.image('platform', platform)
        this.load.image('snowflake', snowflake)
        this.load.image('flame', flame)
        this.load.image('rocks', rocks)
        this.load.image('blood', blood)
        this.load.image('monk_portrait', player_portrait)
        this.load.image('crystal_portrait', crystal_portrait)












    }



    parallaxBg() {
        const bgKey = 'bg0'; // replace 'background' with your actual image key
        const bg = this.add.image(0, 0, bgKey).setOrigin(0, 0);

        // Make the background fill the entire scene's width and height
        bg.displayWidth = this.game.config.width;
        bg.displayHeight = this.game.config.height - 40;

        // Set the scroll factor to 0 to make it static (non-scrolling)
        bg.setScrollFactor(0);
    }






    create() {


        this.parallaxBg()


        this.player = new Player(this, 50, 100)
        this.crystal_warrior = new Crystal_Warrior(this, 350, 100)
        this.cameras.main.setBounds(0, 0, 480, 500);
        this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

        // Adjust the starting position of the camera to cover more initial area
        this.cameras.main.centerOn(960, 540); // Centered on the middle of the scene



        const platforms = this.physics.add.staticGroup();
        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.crystal_warrior, platforms)

        const ground = this.add.rectangle(0, 280, 1920, 80, 0x8B4513); // (x, y, width, height, color)


        // Enable physics for the ground
        this.physics.add.existing(ground, true);

        // Make the ground static (immovable)
        ground.body.immovable = true;

        // Add a collider between the player and the ground
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.crystal_warrior, ground);




        // platforms.create(100, 1920, 'platform').setScale(.50, .04).refreshBody();

        this.crystal_warrior.flipX = true

        this.dialogueActive = true


        this.Collisions()



        const snowflakes = this.add.particles(160, 10, 'snowflake',
            {

                color: [0xffffff],
                colorEase: 'quad.out',
                lifespan: 6000,
                angle: { min: -90, max: 180 },
                scale: { start: 0.1, end: 0.1, ease: 'sine.out' },
                speed: 50,
                advance: 2000,
                blendMode: 'ADD'
            });






    }








    update() {

        this.Dialogue()

        this.player.update()
        this.crystal_warrior.update()











    }


    Collisions() {

        //boulder collision
        this.physics.add.collider(this.player.boulderGroup, this.crystal_warrior, () => {
            this.dmgCounter = this.add.text(this.crystal_warrior.x, this.crystal_warrior.y, '20', { fontSize: '6px', color: '#ff0000' })
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
            this.crystal_warrior.damageTaken(5)
            if (this.crystal_warrior.crystalWarriorHealth <= 0) {
                this.crystal_warrior.charDead()
                this.time.delayedCall(800, () => {
                    this.crystal_warrior.destroy()
                }, this)
            }
        }, null, this)


        // fireball collision


        this.physics.add.collider(this.player.fireBallGroup, this.crystal_warrior, () => {
            this.player.fireBallGroup.clear()
            this.dmgCounter = this.add.text(this.crystal_warrior.x, this.crystal_warrior.y, '20', { fontSize: '6px', color: '#ff0000' })
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
            this.crystal_warrior.damageTaken(5)
            if (this.crystal_warrior.crystalWarriorHealth <= 0) {
                this.crystal_warrior.charDead()
                this.time.delayedCall(800, () => {
                    this.crystal_warrior.destroy()
                }, this)
            }
        }, null, this)




        //special collision
        this.physics.add.collider(this.player.specialGroup, this.crystal_warrior, () => {
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

    Dialogue() {
        if (this.dialogueActive === true) {


            this.crystal_warrior.inDialogue = true
            this.player.inDialogue = true


            const increment = () => {
                this.nextLine++
                console.log(this.nextLine)
            }




            this.dialogueBox = this.add.rectangle(240, 100, 400, 85, 0x000000)



            this.dialogueTextArr = [
                "Ahh, Finally Awake. You took your sweet time aint ya",
                "How... How is this possible, I died!",
                "Ya sure did, one hundred years ago",
                "Do you care to explain, what in the elemental high supreme is going on!",
                "The elemental High Supreme turned out to be fabricated haha",
                "Is really now the time to joke around, explain to me why I am alive and here!",
                "I apologize Master Zenith... The world is in dissarray, the Elemental Families are at war with one another",
                "Ok and what exactly does this have to do with me! I'm supposed to be dead!",
                "Master Zenith, you are the hero of legend, the master of elemental warfare, you are the last master to manipulate all the elements",
                "Anyone can do that!",
                "Not anymore....",
                "Explain!",
                "I am the leader of the Crystal Family, I am the last of my kind that can manipulate crystals",
                "All the other leaders are the last of their kind, not even their children have the ability to manipulate Elements.",
                "One Hundred years ago, a curse was brought upon all the families. Us elemental wielders are the last of our kind",
                "The night you fended off over 1000 Darkness bringers and died, that night the Elemental Crown was taken from the Elemental Supremes grave and destroyed",
                "I failed the world, one hundred years ago. You should have not brought me back to life!",
                "Master, it took us years to find a shard of the Elemental Crown... All to bring you back",
                "I left the crystal family ages ago on a journey to bring you back.. We need your help",
                "The very same being that killed you one hundred years ago, is back.. Eclipsor is back! ",
                "I believe that together we can stop him...",
                "He has possesed all the leaders of the Elemental Families and started a war.",
                "Only you have the spiritual power to free them!"



            ];


            this.displayPortrait = [
                'crystal_portrait',
                'monk_portrait',
                'crystal_portrait',
                'monk_portrait',
                'crystal_portrait',
                'monk_portrait',
                'crystal_portrait',
                'monk_portrait',
                'crystal_portrait',
                'monk_portrait',
                'crystal_portrait',
                'monk_portrait',
                'crystal_portrait',
                'crystal_portrait',
                'crystal_portrait',
                'crystal_portrait',
                'monk_portrait',
                'crystal_portrait',
                'crystal_portrait',
                'crystal_portrait',
                'crystal_portrait',
                'crystal_portrait',
                'crystal_portrait',

            ]

            this.add.image(80, 90, this.displayPortrait[this.nextLine])




            this.dialogueText = this.add.text(130, 80, this.dialogueTextArr[this.nextLine], {
                fontSize: '12px',
                fill: '#fff',
                wordWrap: { width: 280 }
            });





            this.nextButton = this.add.text(400, 120, 'Next', {
                fontSize: '8px',
                fill: '#fff',
                backgroundColor: '#00f',
                padding: { x: 5, y: 5 },
                borderRadius: 5
            });
            this.nextButton.setInteractive();
            this.nextButton.on('pointerdown', () => {
                increment()
            });


            if (this.nextLine > 22) {
                console.log("enter eclipso")
                const flashRectangle = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xffffff);
                flashRectangle.setAlpha(0); // Set initial alpha to transparent

                // Tween the alpha property to make it flash
                this.tweens.add({
                    targets: flashRectangle,
                    alpha: 1, // Target alpha value (fully opaque)
                    duration: 200, // Duration of the tween in milliseconds
                    ease: 'Linear',
                    yoyo: true, // Makes the tween reverse back to the initial state
                    repeat: 0, // Number of times to repeat (0 means don't repeat)
                    onComplete: function () {
                        flashRectangle.setAlpha(0); // Reset alpha to transparent after the tween completes
                    }
                });
            }


        }


    }








}