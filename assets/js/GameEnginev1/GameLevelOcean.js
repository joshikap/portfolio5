import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';

class GameLevelOcean {

   constructor(gameEnv) {

       const path = gameEnv.path;
       const width = gameEnv.innerWidth;
       const height = gameEnv.innerHeight;

       this.score = 0;

       // Background
       const bgData = {
           id: "Water",
           src: path + "/images/gamify/bg/reef.png",
           pixels: { height: 597, width: 340 }
       };

       // Octopus (player)
       const octopusData = {
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

       // ✅ Shark BACK
       const sharkData = {
           id: 'Shark',
           greeting: "Enemy Shark",
           src: path + "/images/gamify/water/shark.png",
           SCALE_FACTOR: 5,
           ANIMATION_RATE: 100,
           pixels: { height: 225, width: 225 },
           INIT_POSITION: { x: 100, y: 100 },
           orientation: { rows: 1, columns: 1 },
           down: { row: 0, start: 0, columns: 1 },
           hitbox: { widthPercentage: 0.5, heightPercentage: 0.5 }
       };

       // ✅ Wizard (fixed)
       const wizardData = {
           id: "Wizard",
           greeting: "Magic Wizard!",
           src: path + "/images/gamify/water/wizard.png",
           SCALE_FACTOR: 3,
           ANIMATION_RATE: 100,
           pixels: { height: 256, width: 256 },
           INIT_POSITION: { x: width * 0.5, y: height * 0.5 },
           orientation: { rows: 1, columns: 1 },
           down: { row: 0, start: 0, columns: 1 },
           hitbox: { widthPercentage: 0.8, heightPercentage: 0.8 }
       };

       // ✅ IMPORTANT: include BOTH shark and wizard
       this.classes = [
           { class: GameEnvBackground, data: bgData },
           { class: Player, data: octopusData },
           { class: Npc, data: sharkData },
           { class: Npc, data: wizardData }
       ];

       // ✅ Wizard collision
       this.handleWizardCollision = (octopus, wizard) => {
           if (
               octopus.position.x < wizard.position.x + wizard.pixels.width &&
               octopus.position.x + octopus.pixels.width > wizard.position.x &&
               octopus.position.y < wizard.position.y + wizard.pixels.height &&
               octopus.position.y + octopus.pixels.height > wizard.position.y
           ) {
               wizard.position.x = Math.random() * (width - wizard.pixels.width);
               wizard.position.y = Math.random() * (height - wizard.pixels.height);

               console.log("Wizard teleported!");
           }
       };

       this.update = () => {
           const objects = gameEnv.gameObjects || [];

           const octopus = objects.find(obj => obj.id === "Octopus");
           const wizard = objects.find(obj => obj.id === "Wizard");

           if (octopus && wizard) {
               this.handleWizardCollision(octopus, wizard);
           }
       };
   }
}

export default GameLevelOcean;