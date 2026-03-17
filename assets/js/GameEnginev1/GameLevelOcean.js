import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Shark from './Shark.js';


class GameLevelOcean {


   constructor(gameEnv) {


       const path = gameEnv.path;
       const width = gameEnv.innerWidth;
       const height = gameEnv.innerHeight;


       const bgData = {
           id: "Water",
           src: path + "/images/gamify/bg/reef.png",
           pixels: { height: 597, width: 340 }
       };


       const sprite_src_shark = path + "/images/gamify/water/shark.png";
       const sharkData = {
       id: 'Shark',
       greeting: "Enemy Shark",
       src: sprite_src_shark,
       SCALE_FACTOR: 5,
       ANIMATION_RATE: 100,
       pixels: {height: 225, width: 225},
       INIT_POSITION: { x: 100, y: 100},
       orientation: {rows: 1, columns: 1 },
       down: {row: 0, start: 0, columns: 1 }, 
       hitbox: { widthPercentage: 0.25, heightPercentage: 0.55
        },
      
       };

       const octopusData = {
           id: "Octopus",
           greeting: "Hi I am Octopus!",
           src: path + "/images/gamify/water/octopus.png",


           SCALE_FACTOR: 5,
           ANIMATION_RATE: 100, // Increased animation rate to slow down movement
           INIT_POSITION: { x: width * 0.7, y: height * 0.6 },


           pixels: { height: 250, width: 167 },


           orientation: { rows: 3, columns: 2 }, // Updated to match the 6 ways in octopus.png

           up: { row: 2, start: 0, columns: 2 }, // Added upward movement
           left: { row: 1, start: 0, columns: 2 }, // Reverted leftward movement to original
           right: { row: 1, start: 0, columns: 2 }, // Rightward movement remains unchanged
           down: { row: 0, start: 0, columns: 2 }, // Downward movement remains
           idle: { row: 0, start: 0, columns: 1 }, // Added idle state

           hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 }
       };

       const goldfishData = {
           id: "Goldfish",
           greeting: "I am a Goldfish!",
           src: path + "/images/gamify/water/gold.png", // Corrected file name
           SCALE_FACTOR: 3,
           ANIMATION_RATE: 80,
           pixels: { height: 150, width: 100 },
           INIT_POSITION: { x: width * 0.5, y: height * 0.5 },
           orientation: { rows: 2, columns: 2 },
           down: { row: 0, start: 0, columns: 2 },
           hitbox: { widthPercentage: 0.3, heightPercentage: 0.3 }
       };

       this.classes = [
           { class: GameEnvBackground, data: bgData },
           { class: Npc, data: sharkData }, // Shark is now an NPC
           { class: Player, data: octopusData } // Octopus is now the Player
       ];

       // Add collision logic for the Goldfish
       this.handleGoldfishCollision = (octopus, goldfish) => {
           if (
               octopus.position.x < goldfish.position.x + goldfish.pixels.width &&
               octopus.position.x + octopus.pixels.width > goldfish.position.x &&
               octopus.position.y < goldfish.position.y + goldfish.pixels.height &&
               octopus.position.y + octopus.pixels.height > goldfish.position.y
           ) {
               // Collision detected, randomize Goldfish position
               goldfish.position.x = Math.random() * (width - goldfish.pixels.width);
               goldfish.position.y = Math.random() * (height - goldfish.pixels.height);
           }
       };

       // Ensure the Goldfish collision logic is checked in the update loop
       this.update = () => {
           const octopus = this.classes.find(obj => obj.data.id === "Octopus");
           const goldfish = this.classes.find(obj => obj.data.id === "Goldfish");

           if (octopus && goldfish) {
               this.handleGoldfishCollision(octopus, goldfish);
           }
       };
   }
}


export default GameLevelOcean;
