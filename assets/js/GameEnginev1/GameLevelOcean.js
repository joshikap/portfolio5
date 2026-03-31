import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import AINpc from './essentials/AINpc.js';
import Leaderboard from './Leaderboard.js';
import DialogueSystem from './DialogueSystem.js';


class GameLevelOcean {


   constructor(gameEnv) {


       const path = gameEnv.path;
       const width = gameEnv.innerWidth;
       const height = gameEnv.innerHeight;


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


       // 🌊 COIN (BITCOIN) — RANDOM + COLLISION RESPAWN
       const cryptoData = {
           id: 'Bitcoin',
           greeting: "*cha-ching*",
           src: path + "/images/gamify/bitcoin.png",
           SCALE_FACTOR: 8,
           ANIMATION_RATE: 50,
           pixels: { height: 600, width: 600 },


           // 🔥 start at random position
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
               if (this.dialogueSystem) {
                   this.showReactionDialogue();
               }
           },


           interact: function () {


               // Prevent duplicate dialogs
               if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
                   this.dialogueSystem.closeDialogue();
               }


               if (!this.dialogueSystem) {
                   this.dialogueSystem = new DialogueSystem();
               }


               let message = this.spriteData.dialogues[
                   Math.floor(Math.random() * this.spriteData.dialogues.length)
               ];


               this.dialogueSystem.showDialogue(
                   message,
                   "Bitcoin",
                   this.spriteData.src
               );


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
           }
       };


       this.classes = [
           { class: GameEnvBackground, data: bgData },
           { class: Player, data: octopusData },
           { class: Npc, data: sharkData },
           { class: Npc, data: cryptoData } // ✅ coin added properly
       ];
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