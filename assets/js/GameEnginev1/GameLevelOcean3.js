import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';
import Shark from './Shark.js';

class GameLevelOcean {

  constructor(gameEnv) {

    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // 🌊 Background
    const bgData = {
        name: 'ocean',
        src: path + "/images/gamify/water/space.png",
        pixels: { height: 1200, width: 857 }
    };

    // 🐙 Player (FIXED)
    const sprite_data_octopus = {
        id: 'Octopus',
        src: path + "/images/gamify/water/octopus.png",

        SCALE_FACTOR: 5,
        STEP_FACTOR: 400, // 🔥 CRITICAL FIX
        ANIMATION_RATE: 50,

        INIT_POSITION: { x: 100, y: height - (height/5) },

        pixels: { height: 250, width: 167 },

        orientation: { rows: 3, columns: 2 },
        down: { row: 0, start: 0, columns: 2 },
        left: { row: 1, start: 0, columns: 2 },
        right: { row: 1, start: 0, columns: 2 },
        up: { row: 2, start: 0, columns: 2 },

        hitbox: { widthPercentage: 0.35, heightPercentage: 0.35 },

        keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    // 🐠 Goal
    const sprite_data_goldfish = {
        id: 'Goldfish',
        greeting: "You escaped!",
        src: path + "/images/gamify/water/gold.png",

        SCALE_FACTOR: 6,
        ANIMATION_RATE: 50,

        INIT_POSITION: { x: width * 0.75, y: height * 0.2 },

        pixels: { width: 200, height: 100 },

        orientation: { rows: 1, columns: 2 },
        down: { row: 0, start: 0, columns: 2 },

        hitbox: { widthPercentage: 0.3, heightPercentage: 0.4 }
    };

    // 🦈 Shark
    const sprite_data_shark = {
        id: 'Shark',
        src: path + "/images/gamify/water/shark.png",

        SCALE_FACTOR: 5,
        ANIMATION_RATE: 100,

        pixels: { height: 225, width: 225 },

        INIT_POSITION: { x: width * 0.5, y: height * 0.5 },

        orientation: { rows: 1, columns: 1 },
        down: { row: 0, start: 0, columns: 1 },

        hitbox: { widthPercentage: 0.3, heightPercentage: 0.5 }
    };

    // 🧱 WALLS (REAL FIX APPLIED)
    const wallStyle = {
        color: 'rgba(0,150,255,0.5)',
        visible: true,
        collidable: true, // 🔥 IMPORTANT
        hitbox: { widthPercentage: 1.0, heightPercentage: 1.0 }
    };

    const mazeWalls = [
        { id:'top', x:0.2, y:0.15, width:0.6, height:0.02 },
        { id:'bottom', x:0.2, y:0.83, width:0.6, height:0.02 },

        { id:'leftTop', x:0.2, y:0.15, width:0.02, height:0.20 },
        { id:'leftBottom', x:0.2, y:0.55, width:0.02, height:0.30 },
        { id:'right', x:0.78, y:0.15, width:0.02, height:0.7 },

        { id:'w1', x:0.3, y:0.25, width:0.02, height:0.3 },
        { id:'w2', x:0.45, y:0.35, width:0.25, height:0.02 },
        { id:'w3', x:0.45, y:0.55, width:0.02, height:0.2 },
        { id:'w4', x:0.55, y:0.45, width:0.15, height:0.02 },
        { id:'w5', x:0.6, y:0.25, width:0.02, height:0.35 }
    ].map(w => ({ ...w, ...wallStyle }));

    this.classes = [
      { class: GameEnvBackground, data: bgData },
      { class: Player, data: sprite_data_octopus },
      { class: Shark, data: sprite_data_shark },
      { class: Npc, data: sprite_data_goldfish },

      ...mazeWalls.map(w => ({ class: Barrier, data: w }))
    ];
  }
}

export default GameLevelOcean;