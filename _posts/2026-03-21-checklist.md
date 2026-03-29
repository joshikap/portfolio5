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
  ["Iteration", "Use loops for game object arrays, animation frames", "https://pages.opencodingsociety.com/js/iterations"],
  ["Conditionals", "Implement collision detection, state transitions", "https://pages.opencodingsociety.com/js/nested-conditionals"],
  ["Nested Conditions", "Complex game logic (e.g., power-up + collision + direction)", "https://pages.opencodingsociety.com/js/nested-conditionals"],

  ["Data Types", "", ""],
  ["Numbers", "Position, velocity, score tracking", "Add link here"],
  ["Strings", "Character names, sprite paths, game states", "https://pages.opencodingsociety.com/js/strings"],
  ["Booleans", "Flags (isJumping, isPaused, isVulnerable)", "https://pages.opencodingsociety.com/js/booleans"],
  ["Arrays", "Game object collections, level data", "https://pages.opencodingsociety.com/js/arrays"],
  ["Objects (JSON)", "Configuration objects, sprite data", "https://pages.opencodingsociety.com/js/json"],

  ["Operators", "", ""],
  ["Mathematical", "Physics calculations (gravity, velocity, collision)", "https://pages.opencodingsociety.com/js/math"],
  ["String Operations", "Path concatenation, text display", "https://pages.opencodingsociety.com/js/strings"],
  ["Boolean Expressions", "Compound conditions in game logic", "https://pages.opencodingsociety.com/js/booleans"]
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

// HEADER
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

// ROWS
data.forEach(rowData => {
  const row = document.createElement("tr");

  rowData.forEach((cellData, index) => {
    const cell = document.createElement("td");
    cell.style.border = "1px solid #ff4da6";
    cell.style.padding = "10px";

    // make links clickable
    if (index === 2 && cellData && cellData.startsWith("http")) {
      const link = document.createElement("a");
      link.href = cellData;
      link.textContent = "Open Link";
      link.target = "_blank";
      link.style.color = "#58a6ff";
      link.style.textDecoration = "underline";

      cell.appendChild(link);
    } else {
      cell.textContent = cellData;
    }

    row.appendChild(cell);
  });

  // section headers styling
  if (rowData[1] === "" && rowData[2] === "") {
    row.style.fontWeight = "bold";
    row.style.backgroundColor = "#161b22";
  }

  table.appendChild(row);
});

container.appendChild(table);
</script>



