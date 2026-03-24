---
layout: post
codemirror: true
title: CS 111 Checklist 
description: This is a checklist of game objects that should be implemented into the three levels of our game code.
permalink: /checklist
---

## Basic Game: Ocean Level (Free Movement)

{% capture challenge1 %}
Explore the ocean! Move the octopus and avoid the shark while interacting with the goldfish.
{% endcapture %}

{% capture code1 %}
import GameControl from '/assets/js/GameEnginev1/essentials/GameControl.js';
import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';
import Shark from '/assets/js/GameEnginev1/Shark.js';

class GameLevelOcean2 {
   constructor(gameEnv) {

       const path = gameEnv.path;
       const width = gameEnv.innerWidth;
       const height = gameEnv.innerHeight;

       const bgData = {
           id: "Water",
           src: path + "/images/gamify/water/space.png",
           pixels: { height: 1200, width: 857 }
       };

       const sprite_data_shark = {
           id: 'Shark',
           src: path + "/images/gamify/water/shark.png",
           SCALE_FACTOR: 5,
           ANIMATION_RATE: 100,
           pixels: {height: 225, width: 225},
           INIT_POSITION: { x: Math.random() * width, y: Math.random() * height },
           orientation: {rows: 1, columns: 1 },
           down: {row: 0, start: 0, columns: 1 }, 
           hitbox: { widthPercentage: 0.25, heightPercentage: 0.55 },
           speed: 5,
           direction: {
               x: Math.random() > 0.5 ? 1 : -1,
               y: Math.random() > 0.5 ? 1 : -1
           },

           updatePosition: function () {
               this.INIT_POSITION.x += this.direction.x * this.speed;
               this.INIT_POSITION.y += this.direction.y * this.speed;

               if (this.INIT_POSITION.x <= 0 || this.INIT_POSITION.x >= width) {
                   this.direction.x *= -1;
               }
               if (this.INIT_POSITION.y <= 0 || this.INIT_POSITION.y >= height) {
                   this.direction.y *= -1;
               }
           }
       };

       setInterval(() => { sprite_data_shark.updatePosition(); }, 100);

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

       const sprite_data_octopus = {
           id: "Octopus",
           src: path + "/images/gamify/water/octopus.png",
           SCALE_FACTOR: 5,
           STEP_FACTOR: 400,
           ANIMATION_RATE: 100,
           INIT_POSITION: { x: width * 0.7, y: height * 0.6 },
           pixels: { height: 250, width: 167 },
           orientation: { rows: 3, columns: 2 },
           up: { row: 2, start: 0, columns: 2 },
           left: { row: 1, start: 0, columns: 2 },
           right: { row: 1, start: 0, columns: 2 },
           down: { row: 0, start: 0, columns: 2 },
           hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
           keypress: { up: 87, left: 65, down: 83, right: 68 }
       };

       this.classes = [
           { class: GameEnvBackground, data: bgData },
           { class: Player, data: sprite_data_octopus },
           { class: Shark, data: sprite_data_shark },
           { class: Npc, data: sprite_data_goldfish },
       ];
   }
}

export const gameLevelClasses = [GameLevelOcean2];
export { GameControl };
{% endcapture %}

{% include game-runner.html
   runner_id="game1"
   challenge=challenge1
   code=code1
%}

---



# CS 111 Project Checklist
 Player, Shark, NPC, and Barrier, along with object instantiation and structured game environments. The game also includes strong use of control structures like loops and conditionals.
 
multiple data types such as numbers, strings, and objects, and mathematical and boolean operators for movement and logic. 
## Maze Level (Barriers + Goal)

{% capture challenge2 %}
Navigate the maze, avoid the shark, and reach the goldfish to win!
{% endcapture %}

{% capture code2 %}
import GameControl from '/assets/js/GameEnginev1/essentials/GameControl.js';
import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';
import Barrier from '/assets/js/GameEnginev1/essentials/Barrier.js';
import Shark from '/assets/js/GameEnginev1/Shark.js';

class GameLevelOcean {

  constructor(gameEnv) {

    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    const bgData = {
        name: 'ocean',
        src: path + "/images/gamify/water/space.png",
        pixels: { height: 1200, width: 857 }
    };

    const sprite_data_octopus = {
        id: 'Octopus',
        src: path + "/images/gamify/water/octopus.png",
        SCALE_FACTOR: 5,
        STEP_FACTOR: 400,
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

    const wallStyle = {
        color: 'rgba(0,150,255,0.5)',
        visible: true,
        collidable: true,
        hitbox: { widthPercentage: 1.0, heightPercentage: 1.0 }
    };

    const mazeWalls = [
        { id:'top', x:0.2, y:0.15, width:0.6, height:0.02 },
        { id:'bottom', x:0.2, y:0.83, width:0.6, height:0.02 },
        { id:'leftTop', x:0.2, y:0.15, width:0.02, height:0.20 },
        { id:'right', x:0.78, y:0.15, width:0.02, height:0.7 }
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

export const gameLevelClasses = [GameLevelOcean];
export { GameControl };
{% endcapture %}

{% include game-runner.html
   runner_id="game2"
   challenge=challenge2
   code=code2
%}

---

## Object-Oriented Programming
- Writing Classes  
- Methods & Parameters  
- Instantiation & Objects  
- Inheritance (Basic)  
- Method Overriding  
- Constructor Chaining  
<img src="images/gamify/water/classes.png" alt="Classes Image">

## Control Structures
- Iteration  
- Conditionals  
- Nested Conditions  

## Data Types
- Numbers  
- Strings  
- Booleans  
- Arrays  
- Objects (JSON)  
<img src="images/gamify/water/numbers.png" alt="Numbers Image">

## Operators
- Mathematical Operators  
- String Operations  
- Boolean Expressions  
<img src="images/gamify/water/math.png" alt="Math Image">

## Input / Output
- Keyboard Input  
- Canvas Rendering  
- GameEnv Configuration  
- API Integration  
- Asynchronous I/O  
- JSON Parsing  

## Documentation
- Code Comments  
- Mini-Lesson Documentation  
- Code Highlights  

## Debugging
- Console Debugging  
- Hit Box Visualization  
- Source-Level Debugging  
- Network Debugging  
- Application Debugging  
- Element Inspection  

## Testing & Verification
- Gameplay Testing  
- Integration Testing  
- API Error Handling  


## Summary


However, there are still several advanced features that are not fully implemented yet. The project does not include inheritance hierarchies using `extends`, method overriding, or constructor chaining with `super()`. It also lacks API integration, asynchronous programming, and JSON parsing for external data. Debugging features such as console logging, hitbox visualization toggles, and DevTools inspection are not clearly demonstrated, and documentation could be expanded with more detailed comments and explanations. Adding these features would make the project more complete and align it fully with all checklist requirements.