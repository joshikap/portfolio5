import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';
import Shark from './Shark.js';

class GameLevelOceanMaze {

    constructor(gameEnv) {

        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        // 🌊 Background
        const bgData = {
            id: "Water",
            src: path + "/images/gamify/water/space.png",
            pixels: { height: 1200, width: 857 }
        };

        // 🐙 Player (Octopus)
        const sprite_data_octopus = {
            id: "Octopus",
            greeting: "Hi I am Octopus!",
            src: path + "/images/gamify/water/octopus.png",

            SCALE_FACTOR: 5,
            ANIMATION_RATE: 100,
            INIT_POSITION: { x: 100, y: 300 },

            pixels: { height: 250, width: 167 },

            orientation: { rows: 3, columns: 2 },
            up: { row: 2, start: 0, columns: 2 },
            left: { row: 1, start: 0, columns: 2 },
            right: { row: 1, start: 0, columns: 2 },
            down: { row: 0, start: 0, columns: 2 },
            idle: { row: 0, start: 0, columns: 1 },

            hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },

            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        // 🐠 Goldfish NPC
        const sprite_data_goldfish = {
            id: "Goldfish",
            greeting: "Be careful of the shark!",
            src: path + "/images/gamify/water/gold.png",

            SCALE_FACTOR: 6,
            ANIMATION_RATE: 50,

            INIT_POSITION: { x: width * 0.7, y: height * 0.2 },

            pixels: { width: 200, height: 100 },

            orientation: { rows: 1, columns: 2 },
            down: { row: 0, start: 0, columns: 2 },

            hitbox: { widthPercentage: 0.25, heightPercentage: 0.4 },

            dialogues: ["Watch out!", "The shark is fast!", "Stay in the maze!"]
        };

        // 🦈 Shark Enemy
        const sprite_data_shark = {
            id: 'Shark',
            greeting: "Enemy Shark",
            src: path + "/images/gamify/water/shark.png",

            SCALE_FACTOR: 5,
            ANIMATION_RATE: 100,
            pixels: { height: 225, width: 225 },

            INIT_POSITION: { 
                x: width * 0.5,
                y: height * 0.5
            },

            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },

            hitbox: { widthPercentage: 0.25, heightPercentage: 0.55 },

            speed: 4,
            direction: { x: 1, y: 1 },

            updatePosition: function () {
                this.INIT_POSITION.x += this.direction.x * this.speed;
                this.INIT_POSITION.y += this.direction.y * this.speed;

                // Bounce inside maze area
                if (this.INIT_POSITION.x <= width * 0.2 || this.INIT_POSITION.x >= width * 0.8) {
                    this.direction.x *= -1;
                }
                if (this.INIT_POSITION.y <= height * 0.15 || this.INIT_POSITION.y >= height * 0.85) {
                    this.direction.y *= -1;
                }

                const el = document.getElementById(this.id);
                if (el) {
                    el.style.transform = this.direction.x < 0 ? "scaleX(-1)" : "scaleX(1)";
                    el.style.left = this.INIT_POSITION.x + 'px';
                    el.style.top = this.INIT_POSITION.y + 'px';
                }
            }
        };

        // Shark movement loop
        setInterval(() => {
            sprite_data_shark.updatePosition();
        }, 100);

        // 🧱 Maze Barriers (same layout as your original)
        const mazeTop = { id:'maze_top', x:0.2, y:0.15, width:0.6, height:0.02 };
        const mazeBottom = { id:'maze_bottom', x:0.2, y:0.83, width:0.6, height:0.02 };
        const mazeLeftTop = { id:'maze_left_top', x:0.2, y:0.15, width:0.02, height:0.20 };
        const mazeLeftBottom = { id:'maze_left_bottom', x:0.2, y:0.55, width:0.02, height:0.30 };
        const mazeRight = { id:'maze_right', x:0.78, y:0.15, width:0.02, height:0.7 };

        const mazeWall1 = { id:'maze_wall_1', x:0.3, y:0.25, width:0.02, height:0.3 };
        const mazeWall2 = { id:'maze_wall_2', x:0.45, y:0.35, width:0.25, height:0.02 };
        const mazeWall3 = { id:'maze_wall_3', x:0.45, y:0.55, width:0.02, height:0.2 };
        const mazeWall4 = { id:'maze_wall_4', x:0.55, y:0.45, width:0.15, height:0.02 };
        const mazeWall5 = { id:'maze_wall_5', x:0.6, y:0.25, width:0.02, height:0.35 };

        // Apply shared barrier style
        const barriers = [
            mazeTop, mazeBottom, mazeLeftTop, mazeLeftBottom,
            mazeRight, mazeWall1, mazeWall2, mazeWall3,
            mazeWall4, mazeWall5
        ].map(b => ({
            ...b,
            color: 'rgba(0, 150, 255, 0.4)',
            visible: true,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 }
        }));

        // 📦 Classes
        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: sprite_data_octopus },
            { class: Shark, data: sprite_data_shark },
            { class: Npc, data: sprite_data_goldfish },

            // Maze barriers
            ...barriers.map(b => ({ class: Barrier, data: b }))
        ];

        // Optional update loop
        this.update = () => {
            // future: shark collision, win condition, etc.
        };
    }
}

export default GameLevelOceanMaze;