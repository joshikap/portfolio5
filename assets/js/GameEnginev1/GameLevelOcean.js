import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';


// =======================
// 🎯 SCORE SYSTEM
// =======================
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
      background: rgba(0,0,0,0.8);
      color: #FFD700;
      padding: 15px 20px;
      border-radius: 8px;
      font-family: Arial;
      font-size: 18px;
      font-weight: bold;
      z-index: 1000;
      border: 2px solid #FFD700;
    `;
    this.updateDisplay();
    document.body.appendChild(this.scoreboard);
  }

  updateDisplay() {
    this.scoreboard.innerHTML = `
      💰 Collected: ${this.coinsCollected}/${this.totalCoins}<br>
      ⭐ Score: ${this.score}
    `;
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
}

// =======================
// 🌊 GAME LEVEL
// =======================
class GameLevelOcean {

  constructor(gameEnv) {

    const path = gameEnv.path;
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;

    gameEnv.gameScorer = new GameScorer(gameEnv);

    // 🌊 Background
    const bgData = {
      id: "Water",
      src: path + "/images/gamify/bg/reef.png",
      pixels: { height: 597, width: 340 }
    };

    // 🐙 Player
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

    // 🐠 Goldfish Template
    const goldfishBase = {
      src: path + "/images/gamify/water/gold.png",
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 50,
      pixels: { width: 200, height: 100 },
      orientation: { rows: 1, columns: 2 },
      down: { row: 0, start: 0, columns: 2 },
      hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 }
    };

    // 🐠 CREATE 6 GOLDFISH (FIXED)
    const goldfishList = Array.from({ length: 6 }).map((_, i) => ({
      class: Npc,
      data: {
        ...goldfishBase,
        id: `Goldfish${i}`,
        greeting: "+10 Points!",
        INIT_POSITION: {
          x: Math.random() * (width - 100),
          y: Math.random() * (height - 100)
        },

        // ✅ THIS RUNS ON COLLISION
        reaction: function () {

          // ✅ ADD SCORE
          if (gameEnv.gameScorer) {
            gameEnv.gameScorer.collectCoin(10);
          }

          // ✅ FIND + REMOVE THIS FISH FROM GAME
          const fish = gameEnv.gameObjects.find(obj =>
            obj.spriteData && obj.spriteData.id === `Goldfish${i}`
          );

          if (fish) {
            fish.destroy();
          }
        }
      }
    }));

    // 📦 Classes
    this.classes = [
      { class: GameEnvBackground, data: bgData },
      { class: Player, data: octopusData },
      ...goldfishList
    ];

    // ✅ total fish = 6
    gameEnv.gameScorer.setTotalCoins(6);
  }
}

export default GameLevelOcean;