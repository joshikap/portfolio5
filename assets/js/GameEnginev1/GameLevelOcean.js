import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import AiNpc from './essentials/AiNpc.js';
import DialogueSystem from './essentials/DialogueSystem.js';

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

class GameLevelOcean {

   constructor(gameEnv) {

       const path = gameEnv.path;
       const width = gameEnv.innerWidth;
       const height = gameEnv.innerHeight;

       // Initialize scoring system
       gameEnv.gameScorer = new GameScorer(gameEnv);

       this.score = 0;

       this.leaderboard = new Leaderboard({
           title: 'Game Leaderboard',
           storageKey: 'ocean-game-leaderboard'
       });

       const bgData = {
           id: "Water",
           src: path + "/images/gamify/bg/reef.png",
           pixels: { height: 597, width: 340 }
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

       const sharkData = {
           id: 'Shark',
           greeting: "Watch out!",
           src: path + "/images/gamify/water/shark.png",
           SCALE_FACTOR: 5,
           ANIMATION_RATE: 100,
           pixels: { height: 225, width: 225 },
           INIT_POSITION: { x: 100, y: 100 },
           orientation: { rows: 1, columns: 1 },
           down: { row: 0, start: 0, columns: 1 },
           hitbox: { widthPercentage: 0.5, heightPercentage: 0.5 }
       };

       // 🌊 COIN
       const cryptoData = {
           id: 'Bitcoin',
           greeting: "*cha-ching*",
           src: path + "/images/gamify/bitcoin.png",
           SCALE_FACTOR: 8,
           ANIMATION_RATE: 50,
           pixels: { height: 600, width: 600 },

           INIT_POSITION: {
               x: Math.random() * (width - 100),
               y: Math.random() * (height - 100)
           },

           orientation: { rows: 1, columns: 1 },
           down: { row: 0, start: 0, columns: 1 },

           hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },

           dialogues: [
               "You found a mysterious coin...",
               "Crypto is risky but exciting!",
               "To the moon 🚀",
               "Digital treasure of the ocean 🌊"
           ],

           reaction: function () {
               if (gameEnv.gameScorer) {
                   gameEnv.gameScorer.collectCoin(10);
               }
           },

           interact: function () {
               if (!this.dialogueSystem) {
                   this.dialogueSystem = new DialogueSystem();
               }

               this.dialogueSystem.showDialogue(
                   "You collected a coin!",
                   "Bitcoin",
                   this.spriteData.src
               );

               if (gameEnv && gameEnv.currentLevel) {
                   gameEnv.currentLevel.updateScore(10);
               }

               const buttonContainer = document.createElement('div');
               buttonContainer.style.display = 'flex';
               buttonContainer.style.marginTop = '10px';


               const collectBtn = document.createElement('button');
               collectBtn.textContent = "Collect Coin";
               collectBtn.style.marginRight = '10px';


               const leaveBtn = document.createElement('button');
               leaveBtn.textContent = "Leave";


               collectBtn.onclick = () => {
                   // ✅ ADD SCORE
                   if (gameEnv && gameEnv.currentLevel) {
                       gameEnv.currentLevel.updateScore(10);
                   }
                   
                   if (gameEnv.gameScorer) {
                       gameEnv.gameScorer.collectCoin(10);
                   }


                   // 🔥 MOVE COIN TO RANDOM LOCATION (LIKE DESERT NPC RELOCATION)
                   const scaledWidth = this.pixels.width / this.spriteData.SCALE_FACTOR;
                   const scaledHeight = this.pixels.height / this.spriteData.SCALE_FACTOR;


                   this.position.x = Math.random() * (width - scaledWidth);
                   this.position.y = Math.random() * (height - scaledHeight);


                   this.dialogueSystem.closeDialogue();
               };


               leaveBtn.onclick = () => {
                   this.dialogueSystem.closeDialogue();
               };


               buttonContainer.appendChild(collectBtn);
               buttonContainer.appendChild(leaveBtn);


               const dialogueBox = document.getElementById('custom-dialogue-box-' + this.dialogueSystem.id);
               if (dialogueBox) {
                   dialogueBox.appendChild(buttonContainer);
               }

               this.position.x = Math.random() * width;
               this.position.y = Math.random() * height;
           }
       };

       // 🌊 AI NPC — EXACT DESERT STRUCTURE
       const sprite_data_ocean_ai = {
           id: "Ocean Professor",
           greeting: "Hello! I’m an expert in ocean science!",

           src: path + "/images/gamify/historyProf.png",

           SCALE_FACTOR: 5,
           ANIMATION_RATE: 10,
           pixels: { height: 263, width: 559 },

           INIT_POSITION: { x: width * 0.3, y: height * 0.3 },

           orientation: { rows: 4, columns: 9 },

           // 🔥 EXACT SAME LOCKED ROW SYSTEM
           down:      { row: 3, start: 0, columns: 9 },
           up:        { row: 3, start: 0, columns: 9 },
           left:      { row: 3, start: 0, columns: 9 },
           right:     { row: 3, start: 0, columns: 9 },
           downLeft:  { row: 3, start: 0, columns: 9 },
           downRight: { row: 3, start: 0, columns: 9 },
           upLeft:    { row: 3, start: 0, columns: 9 },
           upRight:   { row: 3, start: 0, columns: 9 },

           hitbox: { widthPercentage: 0.2, heightPercentage: 0.3 },

           // 🔥 MUST MATCH AI SYSTEM EXPECTATIONS
           expertise: "history",
           chatHistory: [],

           dialogues: [
               "Ask me anything about the ocean!",
               "I know a lot about marine life!",
               "Curious about the deep sea?",
               "Let’s explore ocean science together!"
           ],

           knowledgeBase: {
               history: [
                   {
                       question: "What is the ocean?",
                       answer: "The ocean covers over 70% of Earth’s surface and is vital for life."
                   },
                   {
                       question: "What is the Mariana Trench?",
                       answer: "It is the deepest part of the ocean, reaching about 36,000 feet."
                   },
                   {
                       question: "Why is the ocean important?",
                       answer: "It regulates climate and produces much of the oxygen we breathe."
                   },
                   {
                       question: "What animals live in the ocean?",
                       answer: "From plankton to whales, the ocean has incredible biodiversity."
                   }
               ]
           },

           reaction: function() {
               if (this.dialogueSystem) {
                   this.showReactionDialogue();
               } else {
                   console.log("Ocean Professor ready");
               }
           },

           interact: function() {
               // 🔥 THIS IS THE KEY — DO NOT MODIFY
               AiNpc.showInteraction(this);
           }
       };

       this.classes = [
           { class: GameEnvBackground, data: bgData },
           { class: Player, data: octopusData },
           { class: Npc, data: sharkData },
           { class: Npc, data: cryptoData },
           { class: Npc, data: sprite_data_ocean_ai }
       ];
       
       // Set total coins in the scoreboard (Bitcoin is a single coin)
       if (gameEnv.gameScorer) {
           gameEnv.gameScorer.setTotalCoins(1);
       }
   }

   saveScore(playerName = 'Player') {
       this.leaderboard.addScore(playerName, this.score, 'Ocean Level');
   }

   updateScore(points = 0) {
       this.score += points;
       console.log("Score:", this.score);
   }
}

export default GameLevelOcean;