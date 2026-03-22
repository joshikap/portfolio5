---
layout: post
codemirror: true
title: CS 111 Checklist 
description: This is a checklist of game objects that should be implemented into the three levels of our game code, 
permalink: /checklist
---

## Basic Game: Background, Custom Player

{% capture challenge1 %}
Run the basic game. Use WASD or arrow keys to move Chill Guy around the desert.
{% endcapture %}

{% capture code1 %}
// Import for GameRunner
import GameControl from '/assets/js/GameEnginev1/essentials/GameControl.js';
// Level Code
import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';

class CustomLevel {
  constructor(gameEnv) {
    const path = gameEnv.path;

    const bgData = {
        name: 'custom_bg',
        src: path + "/images/gamebuilder/bg/clouds.jpg",
        pixels: { height: 720, width: 1280 }
    };

    const playerData = {
      id: 'Hero',
      src: path + "/images/gamify/chillguy.png",
      SCALE_FACTOR: 5,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 100, y: 300 },
      pixels: { height: 512, width: 384 },
      orientation: { rows: 4, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      right: { row: 1, start: 0, columns: 3 },
      left: { row: 2, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    this.classes = [
      { class: GameEnvBackground, data: bgData },
      { class: Player, data: playerData },
    ];
  }
}

export const gameLevelClasses = [CustomLevel];
export { GameControl };
{% endcapture %}

{% include game-runner.html
   runner_id="game1"
   challenge=challenge1
   code=code1
%}

---

## Combine Game Levels

{% capture challenge2 %}
Switch between levels using ESC.
{% endcapture %}

{% capture code2 %}
import GameControl from "/assets/js/GameEnginev1/essentials/GameControl.js";
import GameLevelWater from "/assets/js/GameEnginev1/GameLevelWater.js";
import GameLevelParallaxFish from "/assets/js/GameEnginev1/GameLevelParallaxFish.js";

export const gameLevelClasses = [GameLevelWater, GameLevelParallaxFish];
export { GameControl };
{% endcapture %}

{% include game-runner.html
   runner_id="game2"
   challenge=challenge2
   code=code2
%}

---

# ✅ CS 111 Project Checklist

This checklist shows all required programming concepts demonstrated in the game.

---

## 🧠 Object-Oriented Programming
- Writing Classes  
- Methods & Parameters  
- Instantiation & Objects  
- Inheritance (Basic)  
- Method Overriding  
- Constructor Chaining  

---

## 🔁 Control Structures
- Iteration  
- Conditionals  
- Nested Conditions  

---

## 🔢 Data Types
- Numbers  
- Strings  
- Booleans  
- Arrays  
- Objects (JSON)  

---

## ➕ Operators
- [ ] Mathematical Operators  
- [ ] String Operations  
- [ ] Boolean Expressions  

---

## 🎮 Input / Output
- [ ] Keyboard Input  
- [ ] Canvas Rendering  
- [ ] GameEnv Configuration  
- [ ] API Integration  
- [ ] Asynchronous I/O  
- [ ] JSON Parsing  

---

## 📝 Documentation
- [ ] Code Comments  
- [ ] Mini-Lesson Documentation  
- [ ] Code Highlights  

---

## 🐞 Debugging
- [ ] Console Debugging  
- [ ] Hit Box Visualization  
- [ ] Source-Level Debugging  
- [ ] Network Debugging  
- [ ] Application Debugging  
- [ ] Element Inspection  

---

## ✅ Testing & Verification
- [ ] Gameplay Testing  
- [ ] Integration Testing  
- [ ] API Error Handling  