class Constant {
  static availableBoards = {
    easy: {
      uiSpecs: {
        rowSize: 5,
        rowCount: 5,
        nodeSizeInPx: 90,
        verticalOffsetInPx: 36,
        horizontalOffsetInPx: 40,
      },
      snakesList: [
        { head: 6, tail: 4 },
        { head: 20, tail: 9 },
        { head: 22, tail: 17 },
      ],
      laddersList: [
        { bottom: 2, top: 8 },
        { bottom: 10, top: 18 },
        { bottom: 15, top: 17 },
      ],
    },

    medium: {
      uiSpecs: {
        rowSize: 10,
        rowCount: 10,
        nodeSizeInPx: 61,
        verticalOffsetInPx: 11,
        horizontalOffsetInPx: 19,
      },
      snakesList: [
        { head: 38, tail: 20 },
        { head: 51, tail: 10 },
        { head: 76, tail: 54 },
        { head: 91, tail: 73 },
        { head: 97, tail: 61 },
      ],
      laddersList: [
        { bottom: 5, top: 58 },
        { bottom: 14, top: 49 },
        { bottom: 53, top: 72 },
        { bottom: 64, top: 83 },
      ],
    },

    difficult: {
      uiSpecs: {
        rowSize: 10,
        rowCount: 10,
        nodeSizeInPx: 59,
        verticalOffsetInPx: 13,
        horizontalOffsetInPx: 23,
      },
      snakesList: [
        { head: 17, tail: 7 },
        { head: 54, tail: 34 },
        { head: 62, tail: 19 },
        { head: 64, tail: 60 },
        { head: 87, tail: 36 },
        { head: 93, tail: 73 },
        { head: 95, tail: 75 },
        { head: 98, tail: 79 },
      ],
      laddersList: [
        { bottom: 1, top: 38 },
        { bottom: 4, top: 14 },
        { bottom: 9, top: 31 },
        { bottom: 21, top: 42 },
        { bottom: 28, top: 84 },
        { bottom: 51, top: 67 },
        { bottom: 72, top: 91 },
        { bottom: 80, top: 99 },
      ],
    },

    classic: {
      uiSpecs: {
        rowSize: 10,
        rowCount: 10,
        nodeSizeInPx: 61,
        verticalOffsetInPx: 11,
        horizontalOffsetInPx: 19,
      },
      snakesList: [
        { head: 40, tail: 3 },
        { head: 43, tail: 18 },
        { head: 27, tail: 5 },
        { head: 54, tail: 31 },
        { head: 66, tail: 45 },
        { head: 76, tail: 58 },
        { head: 89, tail: 53 },
        { head: 99, tail: 41 },
      ],
      laddersList: [
        { bottom: 4, top: 25 },
        { bottom: 13, top: 46 },
        { bottom: 33, top: 49 },
        { bottom: 42, top: 63 },
        { bottom: 50, top: 69 },
        { bottom: 62, top: 81 },
        { bottom: 74, top: 92 },
      ],
    },

    rockets: {
      uiSpecs: {
        rowSize: 10,
        rowCount: 10,
        nodeSizeInPx: 61,
        verticalOffsetInPx: 10,
        horizontalOffsetInPx: 16,
      },
      snakesList: [
        { head: 43, tail: 17 },
        { head: 50, tail: 5 },
        { head: 56, tail: 8 },
        { head: 73, tail: 15 },
        { head: 84, tail: 58 },
        { head: 87, tail: 49 },
        { head: 98, tail: 40 },
      ],
      laddersList: [
        { bottom: 2, top: 23 },
        { bottom: 4, top: 68 },
        { bottom: 6, top: 45 },
        { bottom: 20, top: 59 },
        { bottom: 30, top: 96 },
        { bottom: 52, top: 72 },
        { bottom: 57, top: 96 },
        { bottom: 71, top: 92 },
      ],
    },

    // This board has a special case at position 98, it has snake's head at the ladder's top
    dragons: {
      uiSpecs: {
        rowSize: 10,
        rowCount: 10,
        nodeSizeInPx: 60,
        verticalOffsetInPx: 11,
        horizontalOffsetInPx: 19,
      },
      snakesList: [
        { head: 30, tail: 16 },
        { head: 37, tail: 3 },
        { head: 56, tail: 8 },
        { head: 84, tail: 64 },
        { head: 87, tail: 31 },
        { head: 98, tail: 40 },
      ],
      laddersList: [
        { bottom: 2, top: 23 },
        { bottom: 6, top: 45 },
        { bottom: 20, top: 59 },
        { bottom: 52, top: 72 },
        { bottom: 57, top: 96 },
        { bottom: 74, top: 94 },
        { bottom: 78, top: 98 },
      ],
    },
  };
}

class Util {
  static spacebarKeyCode = 32;

  static htmlElemFromString(htmlStr) {
    const parser = new DOMParser();
    return parser.parseFromString(htmlStr, "text/html").body
      .firstChild;
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
  }

  static isSpacebarPressed(e) {
    return e.keyCode === this.spacebarKeyCode;
  }

  static padToTwoDigits = (digit) => (`0${digit}`).slice(-2);
}

class Dice {
  static getDiceFaceHtml(diceRoll) {
    let diceFaceHtml = ``;
    switch (diceRoll) {
      case 1:
        diceFaceHtml = `<div class="dice first-face">
          <span class="dot">
          </span>
        </div>`;
        break;
      case 2:
        diceFaceHtml = `<div class="dice second-face">
          <span class="dot">
          </span>
          <span class="dot">
          </span>
        </div>`;
        break;
      case 3:
        diceFaceHtml = `<div class="dice third-face">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>`;
        break;
      case 4:
        diceFaceHtml = `<div class="fourth-face dice">
          <div class="dice-column">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="dice-column">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>`;
        break;
      case 5:
        diceFaceHtml = `<div class="fifth-face dice">
          <div class="dice-column">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="dice-column">
            <span class="dot"></span>
          </div>
          <div class="dice-column">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>`;
        break;
      case 6:
        diceFaceHtml = `<div class="sixth-face dice">
          <div class="dice-column">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="dice-column">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>`;
        break;
      default:
        diceFaceHtml = `<div class="dice"></div>`;
        break;
    }

    return diceFaceHtml.replace(/(\r\n|\n|\r|\t)/gm, "");
  }

  static showCurrentDiceRoll(diceRoll) {
    const diceRollElem = document.getElementById("current-dice-roll");
    diceRollElem.classList.remove("is-hidden");
    diceRollElem.innerHTML = Dice.getDiceFaceHtml(diceRoll);
  }

  static resetCurrentDiceRoll() {
    const diceRollElem = document.getElementById("current-dice-roll");
    diceRollElem.innerHTML = Dice.getDiceFaceHtml(0);
  }

  // Returns a random number from 1 to 6
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

class Logger {
  static addLoggerEntry(message) {
    const date = new Date();
    const timeSuffix = date.getHours() > 12 ? "PM" : "AM";
    const hourString = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
    const dateString = `${Util.padToTwoDigits(hourString)}:${Util.padToTwoDigits(date.getMinutes())}:${Util.padToTwoDigits(date.getSeconds())} ${timeSuffix}`;
    const loggerElem = document.getElementById("logger");
    const loggerEntry = Util.htmlElemFromString(`<div class="is-family-code mb-3"><p class="is-flex is-justify-content-space-between is-align-items-baseline has-text-weight-semibold has-text-grey"><span>Bot</span><span class="is-size-7">${dateString}<span></p><p>${message}</p><hr class="m-1"></div>`);

    loggerElem.appendChild(loggerEntry);
    loggerElem.scrollTop = loggerElem.scrollHeight;
  }
}

class Game {
  static disableControls = false;

  static showCurrentTurnText() {
    document.getElementById("current-player-turn").textContent = `${Board.currentPlayerDisplayName} player's turn`;
  }
}

class Board {
  #boardData;
  #boardName;
  #playerCount;
  #possiblePlayers;

  static currentPlayer = null;

  static players = [];

  static nodes = [];

  static get currentPlayerDisplayName() {
    return Util.capitalize(
      Board.currentPlayer.playerId
    );
  }

  get dice() {
    return new Dice();
  }

  get nodes() {
    return Board.nodes;
  }

  get players() {
    return Board.players;
  }

  constructor(playerCount, boardName) {
    this.#playerCount = playerCount;
    this.#boardData = Constant.availableBoards[boardName];
    this.#boardName = boardName;
    this.#possiblePlayers = ["beige", "black", "greenyellow", "salmon"];
    this.#initializeBoardImage();
    this.#initializeNodes();
    this.#initializeSnakes();
    this.#initializeLadders();
    this.#initializePlayers();
    this.#initializeTimer();
    Logger.addLoggerEntry("Game is ready to be played");
    Logger.addLoggerEntry(`${Board.currentPlayerDisplayName} player's turn, ${Board.currentPlayerDisplayName} player can roll the die`);
  }

  #initializeBoardImage() {
    document.getElementById("game-board-img").src = `./images/boards/${this.#boardName}.jpg`;
    Logger.addLoggerEntry("Initialized Board Image");
  }

  #initializeNodes() {
    const { rowSize, rowCount } = this.#boardData.uiSpecs;
    for (var i = 0; i < (rowSize * rowCount); i++) {
      Board.nodes.push(new Node());
    }
    Logger.addLoggerEntry("Initialized Nodes");
  }

  #initializeSnakes() {
    this.#boardData.snakesList.forEach((snake) => {
      const { head, tail } = snake;
      const headNode = Board.nodes[head - 1];
      headNode.setSnake(new Snake(head, tail));
    });
    Logger.addLoggerEntry("Initialized Snakes");
  }

  #initializeLadders() {
    this.#boardData.laddersList.forEach((ladder) => {
      const { top, bottom } = ladder;
      const bottomNode = Board.nodes[bottom - 1];
      bottomNode.setLadder(new Ladder(top, bottom));
    });
    Logger.addLoggerEntry("Initialized Ladders");
  }

  #initializePlayers() {
    Util.shuffleArray(this.#possiblePlayers);

    for (let i = 0; i < this.#playerCount; i++) {
      const elem = this.#possiblePlayers[i];
      const playerElem = Util.htmlElemFromString(`<div id="${elem}-player" class="player ${elem}-player" style="color: ${elem};"><i class="fas fa-chess-pawn"></i></div>`);
      Board.players.push(new Player(elem, 0, this.#boardData.uiSpecs));
      document.getElementById("initial-spacer-div").appendChild(playerElem);
    }
    Logger.addLoggerEntry("Initialized Players");
    Board.currentPlayer = Board.players[0];
    Game.showCurrentTurnText();
  }

  #initializeTimer() {
    const timerElem = document.getElementById("time-passed");
    let counter = 0;
    const secondsInMinute = 60;

    setInterval(() => {
      if (counter < secondsInMinute) {
        timerElem.innerHTML = `00:${Util.padToTwoDigits(counter)}`;
      } else {
        timerElem.innerHTML = `${Util.padToTwoDigits(Math.floor(counter / secondsInMinute))
          }:${Util.padToTwoDigits(counter % secondsInMinute)
          }`;
      }
      counter++;
    }, 1000);
    Logger.addLoggerEntry("Initialized Timer");
  }
}

class Node {
  #snake;
  #ladder;

  constructor() {
    this.#snake = new Snake(null, null);
    this.#ladder = new Ladder(null, null);
  }

  get snake() {
    return this.#snake;
  }

  setSnake(snake) {
    this.#snake = snake;
  }

  get ladder() {
    return this.#ladder;
  }

  setLadder(ladder) {
    this.#ladder = ladder;
  }

  hasSnakeHead() {
    return !!this.#snake.head;
  }

  hasLadderBottom() {
    return !!this.#ladder.bottom;
  }
}

class Snake {
  #head;
  #tail;

  constructor(head, tail) {
    this.#head = head;
    this.#tail = tail;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }
}

class Ladder {
  #top;
  #bottom;

  constructor(top, bottom) {
    this.#top = top;
    this.#bottom = bottom;
  }

  get top() {
    return this.#top;
  }

  get bottom() {
    return this.#bottom;
  }
}

class Player {
  #boardUiSpecs;;
  #currentPosition;
  #playerId;
  #movementTime;

  constructor(playerId, currentPosition, boardUiSpecs) {
    this.#movementTime = 500;
    this.#boardUiSpecs = boardUiSpecs;
    this.#playerId = playerId;
    this.#currentPosition = currentPosition;
  }

  get currentPosition() {
    return this.#currentPosition;
  }

  get playerId() {
    return this.#playerId;
  }

  #moveOnUI() {
    const { x, y } = this.#calculateUIPosition(this.#currentPosition);
    const elem = document.getElementById(`${this.#playerId}-player`);
    elem.style.bottom = `${y}px`;
    elem.style.left = `${x}px`;
  }

  #updatePlayerTurn(playerId, shouldUpdatePlayer = true) {
    const playerWon = Board.currentPlayer.currentPosition === 100;

    if (playerWon) {
      Logger.addLoggerEntry(`Congratulations ${Board.currentPlayerDisplayName} player! You won the game`);
      alert(`Congratulations ${Util.capitalize(Board.currentPlayer.playerId)} player Wins! You won the game`);
      window.location.reload();
    }

    if (shouldUpdatePlayer) {
      const boardPlayerIds = Board.players.map((value) => value.#playerId);
      const currentIndex = boardPlayerIds.indexOf(playerId);
      const nextIndex = (currentIndex + 1) % Board.players.length;
      Board.currentPlayer = Board.players[nextIndex];
      Game.showCurrentTurnText();
      Logger.addLoggerEntry("Switching Turn");
    }
    Logger.addLoggerEntry(`${Board.currentPlayerDisplayName} player's turn, ${Board.currentPlayerDisplayName} player can roll the die`);

    Dice.resetCurrentDiceRoll();
    Game.disableControls = false;
  }

  moveUponDiceRoll(diceRoll) {
    Dice.showCurrentDiceRoll(diceRoll);
    Logger.addLoggerEntry(`Die rolled ${diceRoll}`);

    const playerFirstDiceRoll = this.#currentPosition === 0;
    const diceRollOverflowsBoard = this.#currentPosition + diceRoll > 100;
    const shouldGetDoubleChance = diceRoll === 6;

    if (playerFirstDiceRoll) {
      const elem = document.getElementById(`${this.#playerId}-player`);
      elem.remove();
      document.getElementById("snake-board").appendChild(elem);
    }

    if (diceRollOverflowsBoard) {
      Logger.addLoggerEntry(`Die rolled ${diceRoll}. Die roll overflow, can't move ahead. ${Board.currentPlayerDisplayName} needs ${100 - this.#currentPosition} to win the game`);
      if (shouldGetDoubleChance) {
        Logger.addLoggerEntry(`Die rolled ${diceRoll}, ${Board.currentPlayerDisplayName} gets an extra die roll`);
        this.#updatePlayerTurn(this.#playerId, false);
        return;
      }
      this.#updatePlayerTurn(this.#playerId);
      return;
    }

    Logger.addLoggerEntry(`${Board.currentPlayerDisplayName} is moving on the board`);

    let counter = 0;
    let looper = setInterval(() => {
      counter++;
      this.#currentPosition++;
      this.#moveOnUI();

      if (counter >= diceRoll) {
        const currentNode =
          Board.nodes[Board.currentPlayer.currentPosition - 1];
        clearInterval(looper);

        // Post movement checks
        if (currentNode.hasSnakeHead()) {
          Logger.addLoggerEntry(`Aww, ${Board.currentPlayerDisplayName} got bit by a snake`);
          this.#currentPosition = currentNode.snake.tail;
          this.#updatePlayerTurn(this.#playerId);
          setTimeout(() => {
            this.#moveOnUI();
          }, this.#movementTime);
          return;
        }

        if (currentNode.hasLadderBottom()) {
          Logger.addLoggerEntry(`${Board.currentPlayerDisplayName} climbed a ladder, gets an extra die roll`);
          this.#currentPosition = currentNode.ladder.top;
          this.#updatePlayerTurn(this.#playerId, false);
          setTimeout(() => {
            this.#moveOnUI();
          }, this.#movementTime);
          return;
        }

        if (shouldGetDoubleChance) {
          Logger.addLoggerEntry(`Die rolled ${diceRoll}, ${Board.currentPlayerDisplayName} gets an extra die roll`);
          this.#updatePlayerTurn(this.#playerId, false);
          return;
        }

        this.#updatePlayerTurn(this.#playerId);
      }
    }, this.#movementTime);
  }

  #calculateUIPosition(position) {
    const { horizontalOffsetInPx, nodeSizeInPx, rowSize, verticalOffsetInPx, } = this.#boardUiSpecs;
    const isRowEndNode = (p) => p % rowSize === 0;
    const isEvenRow = (r) => r % 2 === 0;
    let row, column;

    if (isRowEndNode(position)) {
      row = position / rowSize - 1;
    } else {
      row = Math.floor(position / rowSize);
    }

    // Left to right rows
    if (isEvenRow(row)) {
      if (isRowEndNode(position)) {
        column = rowSize - 1;
      } else {
        column = (position % rowSize) - 1;
      }
      // Right to left rows
    } else {
      if (isRowEndNode(position)) {
        column = 0;
      } else {
        column = Math.abs((position % rowSize) - rowSize);
      }
    }

    return {
      x: nodeSizeInPx * column + horizontalOffsetInPx,
      y: nodeSizeInPx * row + verticalOffsetInPx,
    };
  }
}

class EventListener {
  static selectBoard(boardsList, event) {
    const selectedBoard = document.getElementById("selected-board");
    boardsList.forEach((elem) => {
      elem.classList.remove("selected");
    });
    selectedBoard.value = event.currentTarget.getAttribute("data-board");
    event.currentTarget.classList.add("selected");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let snakeBoard = null;

  document.getElementById("start-game").addEventListener("click", () => {
    const playerCount = Math.abs(
      parseInt(
        document.getElementById("player-count").value, 10
      )
    );

    if (isNaN(playerCount)) {
      alert("Enter a valid number");
      throw new Error("Halted game execution");
    }

    if (playerCount > 4) {
      alert("Max 4 players can play the game");
      throw new Error("Halted game execution");
    }

    if (playerCount <= 1) {
      alert("Min 2 players can play the game");
      throw new Error("Halted game execution");
    }

    // Initialize the number of players
    snakeBoard = new Board(playerCount, document.getElementById("selected-board").value);

    document.getElementById("game-init-step").classList.add("is-hidden");
    document.getElementById("snake-game-step").classList.remove("is-hidden");
    document.getElementById("snake-game-step").classList.add(`${document.getElementById("selected-board").value
      }-snake-board`);
  });

  const boardsList = Array.from(
    document.getElementsByClassName("board-container")
  );

  boardsList.forEach((elem) => {
    elem.addEventListener("click", EventListener.selectBoard.bind(null, boardsList));
  });

  document.body.onkeyup = (e) => {
    // Fire upon spacebar press
    if (Util.isSpacebarPressed(e)) {
      if (Game.disableControls) {
        return;
      }

      Game.disableControls = true;
      Board.currentPlayer.moveUponDiceRoll(snakeBoard.dice.rollDice());
    }
  }
});
