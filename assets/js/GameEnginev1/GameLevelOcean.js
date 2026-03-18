import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Shark from './Shark.js';

class GameLevelOcean {

   constructor(gameEnv) {

       const path = gameEnv.path;
       const width = gameEnv.innerWidth;
       const height = gameEnv.innerHeight;

       // ✅ SCORE
       this.score = 0;

       const bgData = {
           id: "Water",
           src: path + "/images/gamify/bg/reef.png",
           pixels: { height: 597, width: 340 }
       };

       const sharkData = {
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

       // ✅ COIN (your collectible)
       const coinData = {
           id: "Coin",
           greeting: "Gold Coin!",
           src: path + "/images/gamify/water/gold.png",
           SCALE_FACTOR: 2,
           ANIMATION_RATE: 100,
           pixels: { height: 120, width: 120 },
           INIT_POSITION: { x: 300, y: 200 },
           orientation: { rows: 1, columns: 1 },
           down: { row: 0, start: 0, columns: 1 },
           hitbox: { widthPercentage: 0.5, heightPercentage: 0.5 }
       };

       this.classes = [
           { class: GameEnvBackground, data: bgData },
           { class: Npc, data: sharkData },
           { class: Player, data: octopusData },
           { class: Npc, data: coinData }
       ];

       // ✅ COIN COLLISION ONLY
       this.handleCoinCollision = (octopus, coin) => {
           if (
               octopus.position.x < coin.position.x + coin.pixels.width &&
               octopus.position.x + octopus.pixels.width > coin.position.x &&
               octopus.position.y < coin.position.y + coin.pixels.height &&
               octopus.position.y + octopus.pixels.height > coin.position.y
           ) {
               this.score += 1;
               console.log("Score:", this.score);

               coin.position.x = Math.random() * (width - coin.pixels.width);
               coin.position.y = Math.random() * (height - coin.pixels.height);
           }
       };

       // ✅ UPDATE LOOP
       this.update = () => {
           const objects = gameEnv.gameObjects || [];

           const octopus = objects.find(obj => obj.id === "Octopus");
           const coin = objects.find(obj => obj.id === "Coin");

           if (octopus && coin) {
               this.handleCoinCollision(octopus, coin);
           }
       };
   }
}

export default GameLevelOcean;