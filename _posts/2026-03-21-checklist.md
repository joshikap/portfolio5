---
layout: post
codemirror: true
title: CS 111 Checklist 
description: This is a checklist of game objects that should be implemented into the three levels of our game code, 
permalink: /checklist
---
## Basic Game: Ocean Level

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
           greeting: "Enemy Shark",
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

               const spriteElement = document.getElementById(this.id);
               if (spriteElement) {
                   spriteElement.style.transform = this.direction.x === -1 ? "scaleX(-1)" : "scaleX(1)";
                   spriteElement.style.left = this.INIT_POSITION.x + 'px';
                   spriteElement.style.top = this.INIT_POSITION.y + 'px';
               }
           },

           randomizeDirection: function () {
               this.direction.x = Math.random() > 0.5 ? 1 : -1;
               this.direction.y = Math.random() > 0.5 ? 1 : -1;
           }
       };

       setInterval(() => { sprite_data_shark.updatePosition(); }, 100);
       setInterval(() => { sprite_data_shark.randomizeDirection(); }, 2000);

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

This checklist shows all required programming concepts demonstrated in the game.


## Object-Oriented Programming
- Writing Classes  
- Methods & Parameters  
- Instantiation & Objects  
- Inheritance (Basic)  
- Method Overriding  
- Constructor Chaining  



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



## Operators
- Mathematical Operators  
- String Operations  
- Boolean Expressions  



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