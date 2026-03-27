import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import AINpc from './essentials/AINpc.js';
import Leaderboard from './Leaderboard.js';

class GameLevelOcean {

    constructor(gameEnv) {

        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        this.score = 0;
        
        // Initialize leaderboard
        this.leaderboard = new Leaderboard({
            title: 'Game Leaderboard',
            storageKey: 'ocean-game-leaderboard'
        });

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

        // Shark - regular NPC
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

        // Wizard — teleports on collision
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
            hitbox: { widthPercentage: 0.8, heightPercentage: 0.8 },

            reaction: function() {
                const scaledWidth = this.pixels.width / this.spriteData.SCALE_FACTOR;
                const scaledHeight = this.pixels.height / this.spriteData.SCALE_FACTOR;
                this.position.x = Math.random() * (width - scaledWidth);
                this.position.y = Math.random() * (height - scaledHeight);
                console.log("Wizard teleported to", this.position.x, this.position.y);
            }
        };

        // Mario - AI NPC with patrol behavior
        const marioData = {
            id: "Mario",
            greeting: "It's-a me, Mario! Let's-a go!",
            src: path + "/images/mario.png",
            SCALE_FACTOR: 4,
            ANIMATION_RATE: 100,
            pixels: { height: 32, width: 32 },
            INIT_POSITION: { x: width * 0.3, y: height * 0.4 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.6, heightPercentage: 0.7 },
            aiType: 'patrol',
            aiSpeed: 1.5,
            detectionRange: 150,
            aiMoveInterval: 2
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: octopusData },
            { class: Npc, data: sharkData },
            { class: Npc, data: wizardData },
            { class: AINpc, data: marioData }
        ];
    }

    /**
     * Save the player's score to the leaderboard
     * @param {string} playerName - The name of the player
     */
    saveScore(playerName = 'Player') {
        this.leaderboard.addScore(playerName, this.score, 'Ocean Level');
    }

    /**
     * Update the player's score
     * @param {number} points - Points to add to the score
     */
    updateScore(points = 0) {
        this.score += points;
    }
}

export default GameLevelOcean;