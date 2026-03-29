---
layout: post
codemirror: true
title: CS 111 Checklist 
description: This is a checklist of game objects that should be implemented into the three levels of our game code.
permalink: /checklist
---
<div id="checklist-table"></div>

<script>
const data = [
  ["Iteration", "Use loops for game object arrays, animation frames", "Add link here"],
  ["Conditionals", "Implement collision detection, state transitions", "Add link here"],
  ["Nested Conditions", "Complex game logic (e.g., power-up + collision + direction)", "Add link here"],

  ["Data Types", "", ""],
  ["Numbers", "Position, velocity, score tracking", "Add link here"],
  ["Strings", "Character names, sprite paths, game states", "Add link here"],
  ["Booleans", "Flags (isJumping, isPaused, isVulnerable)", "Add link here"],
  ["Arrays", "Game object collections, level data", "Add link here"],
  ["Objects (JSON)", "Configuration objects, sprite data", "Add link here"],

  ["Operators", "", ""],
  ["Mathematical", "Physics calculations (gravity, velocity, collision)", "Add link here"],
  ["String Operations", "Path concatenation, text display", "Add link here"],
  ["Boolean Expressions", "Compound conditions in game logic", "Add link here"]
];

const container = document.getElementById("checklist-table");

// create table
const table = document.createElement("table");

// styling
table.style.width = "100%";
table.style.borderCollapse = "collapse";
table.style.backgroundColor = "#0d1117";
table.style.color = "#e6edf3";
table.style.fontFamily = "Arial, sans-serif";

// 🔥 HEADER ROW
const headerRow = document.createElement("tr");

["Concept", "How we used it in our code", "Link to HW or Lesson"].forEach(text => {
  const th = document.createElement("th");
  th.textContent = text;
  th.style.border = "2px solid #ff4da6";
  th.style.padding = "12px";
  th.style.backgroundColor = "#161b22";
  th.style.fontWeight = "bold";
  headerRow.appendChild(th);
});

table.appendChild(headerRow);

// build rows
data.forEach(rowData => {
  const row = document.createElement("tr");

  rowData.forEach(cellData => {
    const cell = document.createElement("td");
    cell.textContent = cellData;
    cell.style.border = "1px solid #ff4da6";
    cell.style.padding = "10px";
    row.appendChild(cell);
  });

  // section headers
  if (rowData[1] === "" && rowData[2] === "") {
    row.style.fontWeight = "bold";
    row.style.backgroundColor = "#161b22";
  }

  table.appendChild(row);
});

container.appendChild(table);
</script>



