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
import crystal_warrior_atk from './assets/crystal_character/crystal_warrior_atk.png'


import Eclipsor from './Eclipsor'
import eclipsor_idle from './assets/Eclipsor/eclipsor_idle.png'
import eclipsor_fly from './assets/Eclipsor/eclipsor_fly.png'
import eclipseAtk from './assets/Eclipsor/eclipsorAtk.png'
import eclipseWalk from './assets/Eclipsor/eclipseWalk.png'

import goblin_idle from './assets/Goblin/Idle.png'
import goblin_hit from './assets/Goblin/hit.png'
import goblin_Death from './assets/Goblin/Death.png'




//background imports
import bg0 from '../src/assets/level1_bg/Battleground1.png'


import platform from '../src/assets/level1_bg/platform.png'
import snowflake from './assets/snowflake.png'
import Goblin from "./Goblin";







export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' })
    }

    gameState = {
        playerHealth: 200

    }


    nextLine = 0


    heHasArrived = false
    cutsceneOver = false




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
        this.load.spritesheet('crystal_warrior_atk', crystal_warrior_atk, { frameWidth: 288, frameHeight: 128 })




        this.load.spritesheet('eclipsor_idle', eclipsor_idle, { frameWidth: 192, frameHeight: 112 })
        this.load.spritesheet('eclipsor_fly', eclipsor_fly, { frameWidth: 192, frameHeight: 112 })
        this.load.spritesheet('eclipseWalk', eclipseWalk, { frameWidth: 192, frameHeight: 112 })
        this.load.spritesheet('eclipseAtk', eclipseAtk, { frameWidth: 192, frameHeight: 112 })



        this.load.spritesheet('goblin_idle', goblin_idle, { frameWidth: 150, frameHeight: 150 })
        this.load.spritesheet('goblin_hit', goblin_hit, { frameWidth: 150, frameHeight: 150 })
        this.load.spritesheet('goblin_Death', goblin_Death, { frameWidth: 150, frameHeight: 150 })






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

        this.dialogueActive = false
        this.cutsceneOver = true


        this.Collisions()



        // const snowflakes = this.add.particles(160, 10, 'snowflake',
        //     {

        //         color: [0xffffff],
        //         colorEase: 'quad.out',
        //         lifespan: 6000,
        //         angle: { min: -90, max: 180 },
        //         scale: { start: 0.1, end: 0.1, ease: 'sine.out' },
        //         speed: 50,
        //         advance: 2000,
        //         blendMode: 'ADD'
        //     });






    }








    update() {

        this.Dialogue()

        this.player.update()
        this.crystal_warrior.update()
        this.SpawnGoblins()













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

        this.dialogueTextArr = [
            "Jorgen: Ahh, Finally Awake. You took your sweet time aint ya",
            "Master Zenith: How... How is this possible, I died!",
            "Jorgen: Ya sure did, one hundred years ago",
            "Master Zenith: Do you care to explain, what in the elemental high supreme is going on!",
            "Jorgen: The elemental High Supreme turned out to be fabricated haha",
            "Master Zenith: Is really now the time to joke around, explain to me why I am alive and here!",
            "Jorgen: I apologize Master Zenith... The world is in dissarray, the Elemental Families are at war with one another",
            "Ok and what exactly does this have to do with me! I'm supposed to be dead!",
            "Jorgen: Master Zenith, you are the hero of legend, the master of elemental warfare, you are the last master to manipulate all the elements",
            "Anyone can do that!",
            "Jorgen: Not anymore....",
            "Explain!",
            "Jorgen: I am the leader of the Crystal Family, I am the last of my kind that can manipulate crystals",
            "Jorgen: All the other leaders are the last of their kind, not even their children have the ability to manipulate Elements.",
            "Jorgen: One Hundred years ago, a curse was brought upon all the families. Us elemental wielders are the last of our kind",
            "Jorgen: The night you fended off over 1000 Darkness bringers and died, that night the Elemental Crown was taken from the Elemental Supremes grave and destroyed",
            "I failed the world, one hundred years ago. You should have not brought me back to life!",
            "Jorgen: Master, it took us years to find a shard of the Elemental Crown... All to bring you back",
            "Jorgen: I left the crystal family ages ago on a journey to bring you back.. We need your help",
            "Jorgen: The very same being that killed you one hundred years ago, is back.. Eclipsor is back! ",
            "Jorgen: I believe that together we can stop him...",
            "Jorgen: He has possesed all the leaders of the Elemental Families and started a war.",
            "Jorgen: Only you have the spiritual power to free them!",
            "Eclipso: You pathetic little fuck, I told you if you disobeyed I would rip you apart!"



        ];





        if (this.dialogueActive === true) {


            this.crystal_warrior.inDialogue = true
            this.player.inDialogue = true


            const increment = () => {
                this.nextLine++
            }






            this.dialogueBox = this.add.rectangle(240, 100, 400, 85, 0x000000)
            this.dialogueBox.setAlpha(0.5)









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

            this.portrait = this.add.image(80, 90, this.displayPortrait[this.nextLine])




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
        }

        // this.Tutorial()


        this.HeHasArrived()











    }


    // Tutorial = () => {



    //     this.tutorialArray = [
    //         "Press A to move Left | Press D to move Right ",
    //         "Press J to create a launch a boulder ",
    //         "Press K to kick a fireball ",
    //         "Press L to use your special abilty, you must wait "
    //     ]




    //     if (this.cutsceneOver === true) {

    //         this.player.inDialogue = false
    //         this.dialogueText.setText(this.tutorialArray[0])
    //         this.SpawnGoblins()
    //         // const displayNextLine = () => {
    //         //     if (this.nextLine < this.tutorialArray.length) {
    //         //         this.nextLine++

    //         //         this.time.delayedCall(3000, displayNextLine, [], this)
    //         //     }
    //         // }


    //     }

    // };

    HeHasArrived() {
        if (this.nextLine > 22 && this.heHasArrived === false) {
            this.flashRectangle = this.add.rectangle(0, 0, 1920, 1080, 0xffffff);

            this.heHasArrived = true
            if (this.heHasArrived === true) {
                this.time.delayedCall(1000, () => {
                    this.flashRectangle.destroy()
                    this.eclipsor = new Eclipsor(this, 250, 100)
                    this.eclipsor.anims.play('eclipsor_idle', true)
                    this.physics.add.collider(this.eclipsor, this.ground);

                    if (this.heHasArrived && this.nextLine >= 23) {
                        this.eclipsor.setVelocityX(10)
                        this.eclipsor.anims.play('eclipseWalk', true)

                        this.physics.add.collider(this.eclipsor, this.crystal_warrior, () => {
                            this.eclipsor.setVelocityX(0)
                            this.crystal_warrior.play('crystal_warrior_atk', true)
                            this.eclipsor.anims.playAfterDelay('eclipseAtk', 2000)

                            this.eclipsor.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (animation) => {
                                if (animation.key === 'eclipseAtk') {
                                    this.crystal_warrior.damageTaken(100)
                                    // this.crystal_warrior.isDead = true
                                    // this.crystal_warrior.currentState = 'dead'
                                    this.crystal_warrior.play('crystal_char_death', true)
                                    this.time.delayedCall(2000, () => {
                                        this.crystal_warrior.destroy()
                                        this.eclipsor.anims.play('eclipsor_fly', true)
                                        this.eclipsor.setVelocityY(-250)
                                        this.eclipsor.setVelocityX(250)
                                        this.cutsceneOver = true

                                        this.time.delayedCall(2000, () => {
                                            this.eclipsor.destroy()
                                            this.dialogueActive = false

                                        })

                                    })



                                    // this.crystal_warrior.destroy()

                                }

                            })

                        })
                    }

                })


            }




            // Set initial alpha to transparent

            // Tween the alpha property to make it flash

        }
    }




    SpawnGoblins() {
        this.goblinGroup = this.add.group()
        // Initialize goblinCount and isGoblinSpawning if not done elsewhere
        if (this.goblinCount === undefined) {
            this.goblinCount = 0;
        }

        if (this.isGoblinSpawning !== true && this.goblinCount < 1) {
            this.isGoblinSpawning = true;

            // Set a delay of 3000 milliseconds (3 seconds)
            this.time.delayedCall(100, () => {
                // Spawn a goblin
                const goblin = new Goblin(this, 300, 100);
                goblin.update()
                this.goblinGroup.add(goblin)
                this.physics.add.collider(this.goblinGroup, this.ground);
                // goblin.FollowPlayer(this.player)


                this.EnemyAi(goblin, this.player, 'goblin_walk')


                
                                this.physics.add.collider(this.goblinGroup, this.player.boulderGroup, (goblin, boulder) => {
                                    goblin.Dmg(1)
                                    boulder = this.player.boulderGroup.getChildren().at(0)
                                    boulder.destroy()
                                    goblin.anims.play('goblin_hit', true)
                                    goblin.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (animation) => {
                                        if(animation.key === 'goblin_hit'){
                                            goblin.anims.play('goblin_idle', true)
                                        } else if(animation.key === 'goblin_Death'){
                                            goblin.destroy()
                                        }
                                    })

                                    


                                    if(goblin.health < 0){
                                        goblin.anims.play('goblin_Death', true)
                                    }

                                    
                                
                                })



                // if (this.goblin.health < 50) {
                //     console.log('available to possess')
                //     this.player.PossessEnemy(this.goblin)
                // }
                // this.goblin.FollowPlayer(this.player)

                // Increment goblinCount
                this.goblinCount++;

                // Set isGoblinSpawning to false after another 1000 milliseconds (1 second)
                this.time.delayedCall(1000, () => {
                    this.isGoblinSpawning = false;
                });
            }, this);
        }
    }

    EnemyAi(enemy, player, anim_key){
        if(enemy.x > player.x + 15){
            enemy.setVelocity(-50)
            enemy.anims.play(anim_key, true)
        } else if (enemy.x < player.x - 15){
            enemy.setVelocityX(50)
            enemy.anims.play(anim_key, true)
        }
    }




}