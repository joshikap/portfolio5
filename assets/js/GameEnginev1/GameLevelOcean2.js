import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Shark from './Shark.js';

// Game Scoring System
class GameScorer {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    this.score = 0;
    this.coinsCollected = 0;
    this.totalCoins = 0;
    this.scoreboard = null;
    this.createScoreboard();
  }

  createScoreboard() {
    this.scoreboard = document.createElement('div');
    this.scoreboard.id = 'game-scoreboard';
    this.scoreboard.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: #FFD700;
      padding: 15px 20px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      font-size: 18px;
      font-weight: bold;
      z-index: 1000;
      border: 2px solid #FFD700;
    `;
    this.updateDisplay();
    document.body.appendChild(this.scoreboard);
  }

  updateDisplay() {
    if (this.scoreboard) {
      this.scoreboard.innerHTML = `
        💰 Coins: ${this.coinsCollected}/${this.totalCoins}<br>
        ⭐ Score: ${this.score}
      `;
    }
  }

  collectCoin(points = 10) {
    this.coinsCollected++;
    this.score += points;
    this.updateDisplay();
  }

  setTotalCoins(count) {
    this.totalCoins = count;
    this.updateDisplay();
  }

  destroy() {
    if (this.scoreboard && this.scoreboard.parentNode) {
      this.scoreboard.parentNode.removeChild(this.scoreboard);
    }
  }
}

class GameLevelOcean2 {

   constructor(gameEnv) {

       const path = gameEnv.path;
       const width = gameEnv.innerWidth;
       const height = gameEnv.innerHeight;

       // Initialize scoring system
       gameEnv.gameScorer = new GameScorer(gameEnv);

       // 🌊 Background
       const bgData = {
           id: "Water",
           src: path + "/images/gamify/water/space.png",
           pixels: { height: 1200, width: 857 }
       };

       // 🦈 Shark
       const sprite_data_shark = {
           id: 'Shark',
           greeting: "Enemy Shark",
           src: path + "/images/gamify/water/shark.png",
           SCALE_FACTOR: 5,
           ANIMATION_RATE: 100,
           pixels: {height: 225, width: 225},

           INIT_POSITION: { 
               x: Math.random() * width, 
               y: Math.random() * height 
           },

           orientation: {rows: 1, columns: 1 },
           down: {row: 0, start: 0, columns: 1 }, 
           hitbox: { widthPercentage: 0.25, heightPercentage: 0.55 },

           speed: 3,
           direction: {
               x: Math.random() > 0.5 ? 1 : -1,
               y: Math.random() > 0.5 ? 1 : -1
           },
           gameEnv: gameEnv,

           updatePosition: function () {
               // Get the octopus (player) position
               const octopusElement = document.getElementById('Octopus');
               if (octopusElement) {
                   const octopusX = parseFloat(octopusElement.style.left);
                   const octopusY = parseFloat(octopusElement.style.top);
                   
                   // Calculate direction towards octopus
                   const dx = octopusX - this.INIT_POSITION.x;
                   const dy = octopusY - this.INIT_POSITION.y;
                   const distance = Math.sqrt(dx * dx + dy * dy);
                   
                   if (distance > 0) {
                       // Normalize and set direction
                       this.direction.x = dx / distance;
                       this.direction.y = dy / distance;
                   }
               }

               // Move towards target
               this.INIT_POSITION.x += this.direction.x * this.speed;
               this.INIT_POSITION.y += this.direction.y * this.speed;

               // Keep shark in bounds
               if (this.INIT_POSITION.x <= 0 || this.INIT_POSITION.x >= width) {
                   this.direction.x *= -1;
               }
               if (this.INIT_POSITION.y <= 0 || this.INIT_POSITION.y >= height) {
                   this.direction.y *= -1;
               }

               const spriteElement = document.getElementById(this.id);
               if (spriteElement) {
                   spriteElement.style.transform = this.direction.x < 0 ? "scaleX(-1)" : "scaleX(1)";
                   spriteElement.style.left = this.INIT_POSITION.x + 'px';
                   spriteElement.style.top = this.INIT_POSITION.y + 'px';
               }
           },

           randomizeDirection: function () {
               this.direction.x = Math.random() > 0.5 ? 1 : -1;
               this.direction.y = Math.random() > 0.5 ? 1 : -1;
           }
       };

       setInterval(() => {
           sprite_data_shark.updatePosition();
       }, 100);

       // 🦈 Shark 2
       const sprite_data_shark2 = {
           id: 'Shark2',
           greeting: "Enemy Shark",
           src: path + "/images/gamify/water/shark.png",
           SCALE_FACTOR: 5,
           ANIMATION_RATE: 100,
           pixels: {height: 225, width: 225},

           INIT_POSITION: { 
               x: Math.random() * width, 
               y: Math.random() * height 
           },

           orientation: {rows: 1, columns: 1 },
           down: {row: 0, start: 0, columns: 1 }, 
           hitbox: { widthPercentage: 0.25, heightPercentage: 0.55 },

           speed: 3,
           direction: {
               x: Math.random() > 0.5 ? 1 : -1,
               y: Math.random() > 0.5 ? 1 : -1
           },
           gameEnv: gameEnv,

           updatePosition: function () {
               // Get the octopus (player) position
               const octopusElement = document.getElementById('Octopus');
               if (octopusElement) {
                   const octopusX = parseFloat(octopusElement.style.left);
                   const octopusY = parseFloat(octopusElement.style.top);
                   
                   // Calculate direction towards octopus
                   const dx = octopusX - this.INIT_POSITION.x;
                   const dy = octopusY - this.INIT_POSITION.y;
                   const distance = Math.sqrt(dx * dx + dy * dy);
                   
                   if (distance > 0) {
                       // Normalize and set direction
                       this.direction.x = dx / distance;
                       this.direction.y = dy / distance;
                   }
               }

               // Move towards target
               this.INIT_POSITION.x += this.direction.x * this.speed;
               this.INIT_POSITION.y += this.direction.y * this.speed;

               // Keep shark in bounds
               if (this.INIT_POSITION.x <= 0 || this.INIT_POSITION.x >= width) {
                   this.direction.x *= -1;
               }
               if (this.INIT_POSITION.y <= 0 || this.INIT_POSITION.y >= height) {
                   this.direction.y *= -1;
               }

               const spriteElement = document.getElementById(this.id);
               if (spriteElement) {
                   spriteElement.style.transform = this.direction.x < 0 ? "scaleX(-1)" : "scaleX(1)";
                   spriteElement.style.left = this.INIT_POSITION.x + 'px';
                   spriteElement.style.top = this.INIT_POSITION.y + 'px';
               }
           },

           randomizeDirection: function () {
               this.direction.x = Math.random() > 0.5 ? 1 : -1;
               this.direction.y = Math.random() > 0.5 ? 1 : -1;
           }
       };

       setInterval(() => {
           sprite_data_shark2.updatePosition();
       }, 100);

       // 🦈 Shark 3
       const sprite_data_shark3 = {
           id: 'Shark3',
           greeting: "Enemy Shark",
           src: path + "/images/gamify/water/shark.png",
           SCALE_FACTOR: 5,
           ANIMATION_RATE: 100,
           pixels: {height: 225, width: 225},

           INIT_POSITION: { 
               x: Math.random() * width, 
               y: Math.random() * height 
           },

           orientation: {rows: 1, columns: 1 },
           down: {row: 0, start: 0, columns: 1 }, 
           hitbox: { widthPercentage: 0.25, heightPercentage: 0.55 },

           speed: 3,
           direction: {
               x: Math.random() > 0.5 ? 1 : -1,
               y: Math.random() > 0.5 ? 1 : -1
           },
           gameEnv: gameEnv,

           updatePosition: function () {
               // Get the octopus (player) position
               const octopusElement = document.getElementById('Octopus');
               if (octopusElement) {
                   const octopusX = parseFloat(octopusElement.style.left);
                   const octopusY = parseFloat(octopusElement.style.top);
                   
                   // Calculate direction towards octopus
                   const dx = octopusX - this.INIT_POSITION.x;
                   const dy = octopusY - this.INIT_POSITION.y;
                   const distance = Math.sqrt(dx * dx + dy * dy);
                   
                   if (distance > 0) {
                       // Normalize and set direction
                       this.direction.x = dx / distance;
                       this.direction.y = dy / distance;
                   }
               }

               // Move towards target
               this.INIT_POSITION.x += this.direction.x * this.speed;
               this.INIT_POSITION.y += this.direction.y * this.speed;

               // Keep shark in bounds
               if (this.INIT_POSITION.x <= 0 || this.INIT_POSITION.x >= width) {
                   this.direction.x *= -1;
               }
               if (this.INIT_POSITION.y <= 0 || this.INIT_POSITION.y >= height) {
                   this.direction.y *= -1;
               }

               const spriteElement = document.getElementById(this.id);
               if (spriteElement) {
                   spriteElement.style.transform = this.direction.x < 0 ? "scaleX(-1)" : "scaleX(1)";
                   spriteElement.style.left = this.INIT_POSITION.x + 'px';
                   spriteElement.style.top = this.INIT_POSITION.y + 'px';
               }
           },

           randomizeDirection: function () {
               this.direction.x = Math.random() > 0.5 ? 1 : -1;
               this.direction.y = Math.random() > 0.5 ? 1 : -1;
           }
       };

       setInterval(() => {
           sprite_data_shark3.updatePosition();
       }, 100);

       // 🐠 Goldfish (NEW NPC)
       const sprite_data_goldfish = {
           id: "Goldfish",
           greeting: "Be careful of the shark!",
           src: path + "/images/gamify/water/gold.png",

           SCALE_FACTOR: 6,
           ANIMATION_RATE: 50,

           INIT_POSITION: { x: width * 0.3, y: height * 0.5 },

           pixels: { width: 200, height: 100 },

           orientation: { rows: 1, columns: 2 },
           down: { row: 0, start: 0, columns: 2 },

           hitbox: { widthPercentage: 0.25, heightPercentage: 0.4 }
       };

       //  Coins (collectibles for points)
       const sprite_data_coin = {
           id: 'Coin',
           src: path + "/images/gamify/water/gold.png",
           SCALE_FACTOR: 8,
           ANIMATION_RATE: 50,
           pixels: { width: 200, height: 100 },
           orientation: { rows: 1, columns: 2 },
           down: { row: 0, start: 0, columns: 2 },
           hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 }
       };

       // Coin positions throughout the ocean
       const coinPositions = [
           { x: width * 0.2, y: height * 0.3 },
           { x: width * 0.5, y: height * 0.2 },
           { x: width * 0.7, y: height * 0.4 },
           { x: width * 0.35, y: height * 0.6 },
           { x: width * 0.8, y: height * 0.7 }
       ];

       // 🐙 Player
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

       // 📦 Classes
       this.classes = [
           { class: GameEnvBackground, data: bgData },
           { class: Player, data: sprite_data_octopus },
           { class: Shark, data: sprite_data_shark },
           { class: Shark, data: sprite_data_shark2 },
           { class: Shark, data: sprite_data_shark3 },
           { class: Npc, data: sprite_data_goldfish },

           // Add coins to the game
           ...coinPositions.map((pos, index) => ({
               class: Npc,
               data: {
                   ...sprite_data_coin,
                   id: `Coin${index}`,
                   INIT_POSITION: pos,
                   greeting: "+10 Points!",
                   reaction: function() {
                       if (gameEnv.gameScorer) {
                           gameEnv.gameScorer.collectCoin(10);
                       }
                       // Find and remove the coin from game after collection
                       const coinNpc = gameEnv.gameObjects.find(obj => 
                           obj.spriteData && obj.spriteData.id === `Coin${index}`
                       );
                       if (coinNpc) {
                           coinNpc.destroy();
                       }
                   },
                   interact: function(player, npc) {
                       if (gameEnv.gameScorer) {
                           gameEnv.gameScorer.collectCoin(10);
                       }
                       // Remove the coin from game after collection
                       this.destroy();
                   }
               }
           }))
       ];

       // Set total coins in the scoreboard
       if (gameEnv.gameScorer) {
           gameEnv.gameScorer.setTotalCoins(coinPositions.length);
       }

       this.update = () => {
           const octopus = this.classes.find(obj => obj.data.id === "Octopus");

           if (octopus) {
               // future collision logic
           }
       };
   }
}

export default GameLevelOcean2;