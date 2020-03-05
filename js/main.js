"use strict";

{
  const cellSize = 5;
  const cellQtyX = 100;
  const cellQtyY = 100;

  const canvas = document.getElementById("board");
  const selectGen = document.getElementById("gen");
  const ctx = canvas.getContext("2d");

  let gen = 0;
  let panels;
  let panelsCounter;
  let panelsBefore;

  function board() {
    if (typeof canvas.getContext === "undefined") {
      return;
    }

    const CANVAS_WIDTH = cellSize * cellQtyX;
    const CANVAS_HEIGHT = cellSize * cellQtyY;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = CANVAS_WIDTH + "px";
    canvas.style.height = CANVAS_HEIGHT + "px";

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // for (let x = 0; x < cellQtyX; x++) {
    //   for (let y = 0; y < cellQtyY; y++) {
    //     ctx.strokeStyle = "#888";

    //     ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    //   }
    // }
  }

  function draw() {
    for (let x = 0; x < cellQtyX; x++) {
      for (let y = 0; y < cellQtyY; y++) {
        if (panels[y + 1][x + 1] !== panelsBefore[y + 1][x + 1]) {
          ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize);
          if (panels[y + 1][x + 1] === 1) {
            ctx.fillStyle = "#000";
          } else {
            ctx.fillStyle = "#fff";
          }
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  function array() {
    panels = new Array(cellQtyY + 2);
    panelsCounter = new Array(cellQtyY + 2);
    panelsBefore = new Array(cellQtyY + 2);

    for (let i = 0; i < cellQtyY + 2; i++) {
      panels[i] = new Array(cellQtyX + 2).fill(0);
      panelsCounter[i] = new Array(cellQtyX + 2).fill(0);
      panelsBefore[i] = new Array(cellQtyX + 2).fill(0);
    }

    for (let x = 1; x < cellQtyX + 1; x++) {
      for (let y = 1; y < cellQtyY + 1; y++) {
        panels[y][x] = Math.floor(Math.random() * 2);
      }
    }
  }

  function update() {
    for (let x = 1; x < cellQtyX + 1; x++) {
      for (let y = 1; y < cellQtyY + 1; y++) {
        let counter = 0;
        if (panels[y - 1][x - 1] === 1) counter++;
        if (panels[y][x - 1] === 1) counter++;
        if (panels[y + 1][x - 1] === 1) counter++;
        if (panels[y - 1][x] === 1) counter++;
        if (panels[y + 1][x] === 1) counter++;
        if (panels[y - 1][x + 1] === 1) counter++;
        if (panels[y][x + 1] === 1) counter++;
        if (panels[y + 1][x + 1] === 1) counter++;

        panelsCounter[y][x] = counter;
      }
    }
    for (let x = 1; x < cellQtyX + 1; x++) {
      for (let y = 1; y < cellQtyY + 1; y++) {
        panelsBefore[y][x] = panels[y][x];

        if (panelsCounter[y][x] !== 2 && panelsCounter[y][x] !== 3) {
          panels[y][x] = 0;
        } else if (panelsCounter[y][x] === 3) {
          panels[y][x] = 1;
        } else if (panels[y][x] === 1) {
          panels[y][x] = 1;
        }
      }
    }

    gen++;
    selectGen.textContent = gen;
  }

  board();
  array();

  function routine() {
    update();
    draw();
  }

  // routine();
  setInterval(routine, 1);
}
