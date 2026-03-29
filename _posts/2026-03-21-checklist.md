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
  ["Iteration", "We used iteration when looping through arrays like `this.classes` to create and manage multiple game objects. This allows us to efficiently handle all game elements without repeating code.", "https://pages.opencodingsociety.com/js/iterations"],

  ["Conditionals", "We used conditionals to control game behavior such as collision detection and triggering actions like teleporting the wizard. These checks determine how the game responds to different situations.", "https://pages.opencodingsociety.com/js/nested-conditionals"],

  ["Nested Conditions", "We used nested conditions to handle more complex logic where multiple conditions must be true, such as combining collisions with other game states or actions.", "https://pages.opencodingsociety.com/js/nested-conditionals"],


  ["Numbers", "We used numbers to represent positions, movement, and scoring (such as x and y coordinates). These values control where objects are and how they move in the game.", "Add link here"],

  ["Strings", "We used strings for text like greetings and image file paths. These allow us to display messages and load assets in the game.", "https://pages.opencodingsociety.com/js/strings"],

  ["Booleans", "We used booleans to represent true/false states like collision detection or game states. These help control whether certain actions should happen.", "https://pages.opencodingsociety.com/js/booleans"],

  ["Arrays", "We used arrays such as `this.classes` to store and manage all game objects in one place. This makes it easier to loop through and update everything.", "https://pages.opencodingsociety.com/js/arrays"],

  ["Objects (JSON)", "We used objects to organize sprite data like position, speed, animations, and hitboxes. This keeps related data grouped and easy to manage.", "https://pages.opencodingsociety.com/js/json"],


  ["Mathematical", "We used mathematical operations for movement, speed, and randomness using functions like `Math.random()` and position updates. This helps control physics and behavior.", "https://pages.opencodingsociety.com/js/math"],

  ["String Operations", "We used string operations to combine file paths for images using concatenation. This allows the game to correctly load assets from folders.", "https://pages.opencodingsociety.com/js/strings"],

  ["Boolean Expressions", "We used boolean expressions to check multiple conditions at once, such as collision boundaries or direction checks. These help control game logic.", "https://pages.opencodingsociety.com/js/booleans"]
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



