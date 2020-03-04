"use strict";
{
  // **** config ****
  const defaultCellColumns = 100;
  const defaultCellRows = 100;
  const defaultLiveRule = 23;
  const defaultSpawnRule = 3;
  const interval = 10;

  const selectBoard = document.getElementById("board");
  const selectGen = document.getElementById("gen");

  const selectSubmit = document.getElementById("submitButton");
  const selectRandom = document.getElementById("randomButton");
  const selectStart = document.getElementById("startButton");
  const selectStop = document.getElementById("stopButton");
  const selectReset = document.getElementById("resetButton");

  let panels;
  let panelsBefore;
  let cellColumns;
  let cellRows;
  let arraySizeX;
  let arraySizeY;
  let live;
  let spawn;
  let gen = 0;
  let intervalId;

  function setRule() {
    const inputCellColumns = document.getElementById("cellColumns");
    if (!inputCellColumns.value) {
      cellColumns = defaultCellColumns;
      inputCellColumns.placeholder = defaultCellColumns;
    } else {
      cellColumns = parseInt(inputCellColumns.value, 10) + 2;
    }
    arraySizeX = cellColumns + 2;

    const inputCellRows = document.getElementById("cellRows");
    if (!inputCellRows.value) {
      cellRows = defaultCellRows;
      inputCellRows.placeholder = defaultCellRows;
    } else {
      cellRows = parseInt(inputCellRows.value, 10) + 2;
    }
    arraySizeY = cellRows + 2;

    const liveRule = document.getElementById("liveRule");
    if (!liveRule.value) {
      live = defaultLiveRule;
      liveRule.placeholder = defaultLiveRule;
    } else {
      live = parseInt(liveRule.value, 10);
    }

    const spawnRule = document.getElementById("spawnRule");
    if (!spawnRule.value) {
      spawn = defaultSpawnRule;
      spawnRule.placeholder = defaultSpawnRule;
    } else {
      spawn = parseInt(spawnRule.value, 10);
    }
  }

  function createArray() {
    panels = new Array(arraySizeY);
    panelsBefore = new Array(arraySizeY);

    for (let i = 0; i < arraySizeY; i++) {
      panels[i] = new Array(arraySizeX).fill(0);
      panelsBefore[i] = new Array(arraySizeX).fill(0);
    }
  }

  function createBoard() {
    selectBoard.style.width = 10 * cellColumns + "px";
    selectBoard.style.height = 10 * cellRows + "px";
  }

  function createPanel() {
    for (let i = 0; i < cellColumns * cellRows; i++) {
      const createPanel = document.createElement("div");
      createPanel.classList.add("panel");

      const panelX = (i % cellColumns) + 1;
      const panelY = Math.floor(i / cellColumns) + 1;
      createPanel.classList.add(`x-${panelX}`);
      createPanel.classList.add(`y-${panelY}`);

      selectBoard.appendChild(createPanel);
    }
  }

  function updateArray() {
    for (let j = 1; j < cellRows + 1; j++) {
      for (let i = 1; i < cellColumns + 1; i++) {
        panelsBefore[j][i] = panels[j][i];

        let counter = 0;
        if (panels[j - 1][i - 1] === 1) counter++;
        if (panels[j][i - 1] === 1) counter++;
        if (panels[j + 1][i - 1] === 1) counter++;
        if (panels[j - 1][i] === 1) counter++;
        if (panels[j + 1][i] === 1) counter++;
        if (panels[j - 1][i + 1] === 1) counter++;
        if (panels[j][i + 1] === 1) counter++;
        if (panels[j + 1][i + 1] === 1) counter++;

        if (
          counter !== Math.floor(live / 1) % 10 &&
          counter !== Math.floor(live / 10) % 10
        ) {
          panels[j][i] = 0;
        } else if (counter === spawn) {
          panels[j][i] = 1;
        } else if (panels[j][i] === 1) {
          panels[j][i] = 1;
        }

        const selectPanel = document.getElementsByClassName(
          `panel x-${i} y-${j}`
        );
        if (panelsBefore[j][i] !== panels[j][i]) {
          selectPanel[0].classList.toggle("live");
        }
      }
    }

    gen++;
    selectGen.textContent = gen;
  }

  function setGame() {
    while (selectBoard.firstChild) {
      selectBoard.removeChild(document.querySelector("div"));
    }

    setRule();
    createArray();
    createBoard();
    createPanel();
    gen = 0;
  }

  setGame();

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

  selectSubmit.addEventListener("click", () => {
    setGame();
  });

  selectStart.addEventListener("click", () => {
    selectStart.disabled = true;
    selectStop.disabled = false;
    selectReset.disabled = true;
    selectSubmit.disabled = true;
    selectRandom.disabled = true;

    // updateArray();
    intervalId = setInterval(updateArray, interval);
  });

  selectStop.addEventListener("click", () => {
    selectStart.disabled = false;
    selectStop.disabled = true;
    selectReset.disabled = false;
    selectSubmit.disabled = true;
    selectRandom.disabled = true;
    clearInterval(intervalId);
  });

  selectReset.addEventListener("click", () => {
    selectStart.disabled = false;
    selectStop.disabled = true;
    selectReset.disabled = true;
    selectSubmit.disabled = false;
    selectRandom.disabled = false;
    setGame();
  });

  selectRandom.addEventListener("click", () => {
    for (let j = 1; j < cellRows + 1; j++) {
      for (let i = 1; i < cellColumns + 1; i++) {
        panels[j][i] = Math.floor(Math.random() * 2);
        const selectPanel = document.getElementsByClassName(
          `panel x-${i} y-${j}`
        );
        if (panels[j][i] === 1) {
          selectPanel[0].classList.add("live");
        }
      }
    }
  });
}
