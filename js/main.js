"use strict";
{
  // **** config ****
  const defaultCellColumns = 4;
  const defaultCellRows = 4;
  const defaultLiveRule = 23;
  const defaultSpawnRule = 3;

  const selectBoard = document.getElementById("board");

  const selectSubmit = document.getElementById("submitButton");
  const selectRandom = document.getElementById("randomButton");
  const selectStart = document.getElementById("startButton");
  const selectStop = document.getElementById("stopButton");
  const selectReset = document.getElementById("resetButton");

  let panels;
  let sizeX;
  let sizeY;
  let live;
  let spawn;

  function setRule() {
    const cellColumns = document.getElementById("cellColumns");
    const cellRows = document.getElementById("cellRows");
    const liveRule = document.getElementById("liveRule");
    const spawnRule = document.getElementById("spawnRule");

    if (!cellColumns.value) {
      sizeX = defaultCellColumns;
      cellColumns.placeholder = defaultCellColumns;
    } else {
      sizeX = parseInt(cellColumns.value, 10);
    }

    if (!cellRows.value) {
      sizeY = defaultCellRows;
      cellRows.placeholder = defaultCellRows;
    } else {
      sizeY = parseInt(cellRows.value, 10);
    }

    if (!liveRule.value) {
      live = defaultLiveRule;
      liveRule.placeholder = defaultLiveRule;
    } else {
      live = parseInt(liveRule.value, 10);
    }

    if (!spawnRule.value) {
      spawn = defaultSpawnRule;
      spawnRule.placeholder = defaultSpawnRule;
    } else {
      spawn = parseInt(spawnRule.value, 10);
    }
  }

  //二次元配列生成
  function createArray() {
    panels = new Array(sizeY);
    for (let i = 0; i < sizeY; i++) {
      panels[i] = new Array(sizeX).fill(0);
    }

    console.log(panels);
  }

  //ボードサイズ変更
  function createBoard() {
    selectBoard.style.width = 20 * sizeX + "px";
    selectBoard.style.height = 20 * sizeY + "px";
  }

  //パネル生成
  function createPanel() {
    for (let i = 0; i < sizeX * sizeY; i++) {
      const createPanel = document.createElement("div");
      createPanel.classList.add("panel");

      const column = i % sizeX;
      const row = Math.floor(i / sizeX);
      createPanel.classList.add(`x-${column}`);
      createPanel.classList.add(`y-${row}`);

      selectBoard.appendChild(createPanel);
    }
  }

  function setGame() {
    while (selectBoard.firstChild) {
      selectBoard.removeChild(document.querySelector("div"));
    }

    setRule();
    createArray();
    createBoard();
    createPanel();
  }

  setGame();

  selectSubmit.addEventListener("click", () => {
    setGame();
  });

  document.querySelectorAll(".panel").forEach(e => {
    e.addEventListener("click", () => {
      e.classList.toggle("live");

      const panelClass = e.className.split(" ");
      const panelPositionX = panelClass[1].substr(2);
      const panelPositionY = panelClass[2].substr(2);

      if (e.classList.contains("live")) {
        panels[panelPositionY][panelPositionX] = 1;
      } else {
        panels[panelPositionY][panelPositionX] = 0;
      }
    });
  });
}
