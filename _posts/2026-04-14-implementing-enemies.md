---
layout: post
codemirror: true
title: Implementing Enemies 
description: Enemy demo with scoring and AI chasing behavior
permalink: /enemies/lesson
---

## Ocean Enemy Game

{% capture challenge %}
Control the octopus and avoid the shark! Collect goldfish to score points.
{% endcapture %}

{% capture code %}
import GameControl from '/assets/js/GameEnginev1/essentials/GameControl.js';
import GameLevelOcean from '/assets/js/GameEnginev1/GameLevelOcean.js';

export const gameLevelClasses = [GameLevelOcean];
{% endcapture %}

{% include game-runner.html
  runner_id="ocean-enemy-game"
  challenge=challenge
  code=code
%}





