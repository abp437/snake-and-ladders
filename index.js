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

  // Returns a random number from 1 to 6
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

class Logger {
  static addLoggerEntry(message) {
    const loggerEntry = Util.htmlElemFromString(`<p class="is-family-monospace mb-2"><span class="has-text-weight-semibold">Bot:</span><span class="ml-3">${message}</span></p>`),
      loggerElem = document.getElementById("logger");

    loggerElem.appendChild(loggerEntry);
    loggerElem.scrollTop = loggerElem.scrollHeight;
  }
}

// class Game {
//   #possibleBoards;

//   constructor(playerCount, boardName) {
//     this.#possibleBoards = ["easy", "medium", "difficult", "classic", "rockets", "dragons"];
//   }

//   constructBoard() {
//     const boardNameList = boardName.join();
//     if (boardNameList.indexOf(boardName) === -1) {
//       alert("Invalid Board");
//       throw new Error("Invalid Board");
//     }

//     new Board(playerCount);
//   }
// }

class Board {
  #playerCount;
  #possiblePlayers;
  #snakesList;
  #laddersList;

  static currentPlayer = null;

  static disableControls = false;

  static players = [];

  static nodes = [];

  static showCurrentTurnText() {
    document.getElementById("current-player-turn").textContent = `${Board.currentPlayerDisplayName} player's turn`;
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

  constructor(playerCount) {
    this.#playerCount = playerCount;
    this.#possiblePlayers = ["beige", "black", "greenyellow", "salmon"];
    this.#snakesList = [
      { head: 40, tail: 3 },
      { head: 43, tail: 18 },
      { head: 27, tail: 5 },
      { head: 54, tail: 31 },
      { head: 66, tail: 45 },
      { head: 76, tail: 58 },
      { head: 89, tail: 53 },
      { head: 99, tail: 41 },
    ];
    this.#laddersList = [
      { bottom: 4, top: 25 },
      { bottom: 13, top: 46 },
      { bottom: 33, top: 49 },
      { bottom: 42, top: 63 },
      { bottom: 50, top: 69 },
      { bottom: 62, top: 81 },
      { bottom: 74, top: 92 },
    ];
    this.#initializeNodes();
    this.#initializeSnakes();
    this.#initializeLadders();
    this.#initializePlayers();
    Logger.addLoggerEntry("Game is ready to be played");
    Logger.addLoggerEntry(`${Board.currentPlayerDisplayName} player's turn, ${Board.currentPlayerDisplayName} player can roll the die`);
  }

  #initializeNodes() {
    for (var i = 0; i < 100; i++) {
      Board.nodes.push(new Node());
    }
    Logger.addLoggerEntry("Initialized Nodes");
  }

  #initializeSnakes() {
    this.#snakesList.forEach((snake) => {
      const { head, tail } = snake;
      const headNode = Board.nodes[head - 1];
      headNode.setSnake(new Snake(head, tail));
    });
    Logger.addLoggerEntry("Initialized Snakes");
  }

  #initializeLadders() {
    this.#laddersList.forEach((ladder) => {
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
      Board.players.push(new Player(elem, 0));
      document.getElementById("initial-spacer-div").appendChild(playerElem);
    }
    Logger.addLoggerEntry("Initialized Players");
    Board.currentPlayer = Board.players[0];
    Board.showCurrentTurnText();
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
  #playerId;
  #currentPosition;
  #movementTime;

  constructor(playerId, currentPosition) {
    this.#movementTime = 500;
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
      Board.showCurrentTurnText();
      Logger.addLoggerEntry("Switching Turn");
    }
    Logger.addLoggerEntry(`${Board.currentPlayerDisplayName} player's turn, ${Board.currentPlayerDisplayName} player can roll the die`);

    Board.resetCurrentDiceRoll();
    Board.disableControls = false;
  }

  moveUponDiceRoll(diceRoll) {
    Board.showCurrentDiceRoll(diceRoll);
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
    const rowSize = 10;
    const isRowEndNode = (p) => p % rowSize === 0;
    const isEvenRow = (r) => r % 2 === 0;
    const boardNodeUIpx = 61;
    const horizontalOffset = 19;
    const verticalOffset = 11;
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
      x: boardNodeUIpx * column + horizontalOffset,
      y: boardNodeUIpx * row + verticalOffset,
    };
  }
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
}

function selectBoard(boardsList, event) {
  const selectedBoard = document.getElementById("selected-board");
  boardsList.forEach((elem) => {
    elem.classList.remove("selected");
  });
  selectedBoard.value = event.currentTarget.getAttribute("data-board");
  event.currentTarget.classList.add("selected");
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

    if (playerCount > 5) {
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
  });

  const boardsList = Array.from(
    document.getElementsByClassName("board-container")
  );

  boardsList.forEach((elem) => {
    elem.addEventListener("click", selectBoard.bind(null, boardsList));
  });

  document.body.onkeyup = (e) => {
    // Fire upon spacebar press
    if (Util.isSpacebarPressed(e)) {
      if (Board.disableControls) {
        return;
      }

      Board.disableControls = true;
      Board.currentPlayer.moveUponDiceRoll(snakeBoard.dice.rollDice());
    }
  }
});
