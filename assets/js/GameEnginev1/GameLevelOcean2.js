import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Shark from './Shark.js';

class GameLevelOcean2 {

   constructor(gameEnv) {

       const path = gameEnv.path;
       const width = gameEnv.innerWidth;
       const height = gameEnv.innerHeight;

       // 🌊 Background
       const bgData = {
           id: "Water",
           src: path + "/images/gamify/bg/reef.png",
           pixels: { height: 597, width: 340 }
       };

       // 🦈 Shark (NPC)
       const sprite_data_shark = {
           id: 'Shark',
           greeting: "Enemy Shark",
           src: path + "/images/gamify/water/shark.png",
           SCALE_FACTOR: 5,
           ANIMATION_RATE: 100,
           pixels: {height: 225, width: 225},
           INIT_POSITION: { x: 100, y: 100},
           orientation: {rows: 1, columns: 1 },
           down: {row: 0, start: 0, columns: 1 }, 
           hitbox: { widthPercentage: 0.25, heightPercentage: 0.55 },
       };

       // 🐙 Player (Octopus)
       const sprite_data_octopus = {
           id: "Octopus",
           greeting: "Hi I am Octopus!",
           src: path + "/images/gamify/water/octopus.png",

           SCALE_FACTOR: 5,
           ANIMATION_RATE: 100,
           INIT_POSITION: { x: width * 0.7, y: height * 0.6 },

           pixels: { height: 250, width: 167 },

           orientation: { rows: 3, columns: 2 },
           up: { row: 2, start: 0, columns: 2 },
           left: { row: 1, start: 0, columns: 2 },
           right: { row: 1, start: 0, columns: 2 },
           down: { row: 0, start: 0, columns: 2 },
           idle: { row: 0, start: 0, columns: 1 },

           hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 }
       };

       // 🐡 Puffer Fish Barrier
       const sprite_data_puffer = {
           id: 'PufferFish',
           greeting: "Careful! I’m spiky!",
           src: path + "/images/gamify/water/puffer.png",
           SCALE_FACTOR: 4,
           ANIMATION_RATE: 0,
           pixels: { height: 128, width: 128 },
           INIT_POSITION: { x: width * 0.5, y: height * 0.4 },
           orientation: { rows: 1, columns: 1 },
           down: { row: 0, start: 0, columns: 1 },
           hitbox: { widthPercentage: 0.7, heightPercentage: 0.7 },
           isBarrier: true
       };

       // 📦 Classes list (Desert-style)
       this.classes = [
           { class: GameEnvBackground, data: bgData },
           { class: Player, data: sprite_data_octopus },
           { class: Npc, data: sprite_data_shark },
           { class: Npc, data: sprite_data_puffer }
       ];

       // 🔁 Update loop
       this.update = () => {
           const octopus = this.classes.find(obj => obj.data.id === "Octopus");

           if (octopus) {
               // collision logic can go here later
           }
       };
   }
}

export default GameLevelOcean2;