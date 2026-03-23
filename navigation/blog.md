---
layout: blogs 
title: Blogs
search_exclude: true
permalink: /blogs/
---

## GameLevelOcean.js Progress

### Overview
Completed development of an interactive ocean-themed game level featuring collis
ion detection, sprite animation, and dynamic game object management.            
### Key Features Implemented

#### 1. Game Objects
- **Background**: Reef environment image (597×340 pixels)
- **Player Character**: Octopus sprite with multi-directional animation
  - Sprite dimensions: 250×167 pixels (3 rows × 2 columns)
  - Scale factor: 5x
  - Supported directions: up, down, left, right, idle
  - Animation rate: 100ms per frame
  - Custom hitbox: 40% width, 40% height
  
- **Enemy NPC**: Shark adversary
  - Sprite dimensions: 225×225 pixels
  - Scale factor: 5x
  - Animation rate: 100ms
  - Custom hitbox: 25% width, 55% height
  
- **Collectible Object**: Goldfish
  - Sprite dimensions: 150×100 pixels
  - Scale factor: 3x
  - Animation rate: 80ms
  - Custom hitbox: 30% width, 30% height

#### 2. Collision System
- Implemented AABB (axis-aligned bounding box) collision detection
- Octopus-Goldfish collision triggers goldfish respawn
- Goldfish repositions randomly within game bounds on collision detection
- Hitbox dimensions customized per sprite for realistic collision behavior

#### 3. Game Loop
- Update method continuously monitors game state
- Automated collision checking between player (octopus) and collectible (goldfis
h)                                                                              - Physics-based positioning system with dynamic repositioning

### Technical Architecture
- Class-based structure with `GameLevelOcean` as main class
- Imports: `GameEnvBackground`, `Player`, `NPC`, and `Shark` utilities
- Constructor accepts `gameEnv` object containing game dimensions and asset path
s                                                                               - Modular game object configuration with sprite data objects
- Export ready for integration with game engine

### Result
Fully functional ocean game level with interactive gameplay mechanics, supportin
g sprite animation, collision detection, and dynamic object management.         
## GameLevelOcean2.js Progress

### Overview
Advanced second iteration of the ocean-themed game level featuring dynamic enemy
 movement, interactive NPCs, and an expanded game world with a space-like background.                                                                           
### Key Features Implemented

#### 1. Game Objects
- **Background**: Space environment image (857×1200 pixels)
- **Player Character**: Octopus sprite with multi-directional animation
  - Sprite dimensions: 167×250 pixels (3 rows × 2 columns)
  - Scale factor: 5x
  - Supported directions: up, down, left, right, idle
  - Animation rate: 100ms per frame
  - Custom hitbox: 40% width, 40% height
  
- **Enemy NPC**: Shark with autonomous movement
  - Sprite dimensions: 225×225 pixels
  - Scale factor: 5x
  - Animation rate: 100ms
  - Custom hitbox: 25% width, 55% height
  - Speed: 5 pixels per update
  - Random direction initialization
  
- **Interactive NPC**: Goldfish companion
  - Sprite dimensions: 200×100 pixels
  - Scale factor: 6x
  - Animation rate: 50ms
  - Custom hitbox: 25% width, 40% height
  - Greeting message: "Be careful of the shark!"

#### 2. Movement and Animation System
- **Shark Autonomous Movement**:
  - Updates position every 100ms
  - Bounces off screen boundaries (direction reversal)
  - Random direction changes every 2000ms
  - Dynamic sprite flipping based on direction
  
- **Multi-directional Animation**: Octopus supports up, down, left, right, and i
dle states with corresponding sprite rows                                       - **NPC Greeting System**: NPCs display contextual messages (Shark: "Enemy Shark
", Goldfish: "Be careful of the shark!")                                        
#### 3. Game Architecture
- Class-based structure with `GameLevelOcean2` as main class
- Imports: `GameEnvBackground`, `Player`, `Npc`, and `Shark` utilities
- Constructor accepts `gameEnv` object containing game dimensions and asset path
s                                                                               - Modular sprite data configuration objects
- Interval-based update loops for autonomous enemy behavior
- Prepared collision detection framework in update method

### Result
Enhanced ocean game level with dynamic enemy AI, multiple NPCs, autonomous movem
ent mechanics, and interactive gameplay elements supporting multi-character interaction.