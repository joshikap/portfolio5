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
            // id: "Shark",
            // src: path + "/images/gamify/water/shark.png",
            //  SCALE_FACTOR: 5,
            // STEP_FACTOR: 400,
            // ANIMATION_RATE: 100,
            // GRAVITY: false,
            // INIT_POSITION: { x: width / 2, y: height / 2 },
            // orientation: {rows: 1, columns: 1 },
            // down: {row: 0, start: 0, columns: 1 }, 
            // pixels: { height: 225, width: 225 },
            // hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
            // keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        const octopusData = {
            id: "Octopus",
            greeting: "Hi I am Octopus!",
            src: path + "/images/gamify/water/octopus.png",

            SCALE_FACTOR: 5,
            ANIMATION_RATE: 50,

            INIT_POSITION: { x: width * 0.7, y: height * 0.6 },

            pixels: { height: 250, width: 167 },

            orientation: { rows: 3, columns: 2 },

            down: { row: 0, start: 0, columns: 2 },

            hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 }
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Shark, data: sharkData },
            { class: Npc, data: octopusData }
        ];
    }
}

export default GameLevelOcean;