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
          <div class="column">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="column">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>`;
        break;
      case 5:
        diceFaceHtml = `<div class="fifth-face dice">
          <div class="column">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="column">
            <span class="dot"></span>
          </div>
          <div class="column">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>`;
        break;
      case 6:
        diceFaceHtml = `<div class="sixth-face dice">
          <div class="column">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="column">
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
    document.getElementById("current-player-turn").textContent = `${capitalize(
      Board.currentPlayer.playerId
    )} player's turn`;
  }

  static showCurrentDiceRoll(diceRoll) {
    const diceRollElem = document.getElementById("current-dice-roll");
    diceRollElem.classList.remove("hide");
    diceRollElem.innerHTML = Dice.getDiceFaceHtml(diceRoll);
  }

  static resetCurrentDiceRoll() {
    const diceRollElem = document.getElementById("current-dice-roll");
    diceRollElem.innerHTML = Dice.getDiceFaceHtml(0);
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
    this.#possiblePlayers = ["red", "blue", "white", "salmon"];
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
  }

  #initializeNodes() {
    for (var i = 0; i < 100; i++) {
      Board.nodes.push(new Node());
    }
  }

  #initializeSnakes() {
    this.#snakesList.forEach((snake) => {
      const { head, tail } = snake;
      const headNode = Board.nodes[head - 1];
      headNode.setSnake(new Snake(head, tail));
    });
  }

  #initializeLadders() {
    this.#laddersList.forEach((ladder) => {
      const { top, bottom } = ladder;
      const bottomNode = Board.nodes[bottom - 1];
      bottomNode.setLadder(new Ladder(top, bottom));
    });
  }

  #initializePlayers() {
    shuffleArray(this.#possiblePlayers);

    for (let i = 0; i < this.#playerCount; i++) {
      const parser = new DOMParser();
      const elem = this.#possiblePlayers[i];
      const htmlString = `<div id="${elem}-player" class="player ${elem}-player"></div>`;
      const playerElem = parser.parseFromString(htmlString, "text/html").body
        .firstChild;

      Board.players.push(new Player(elem, 0));
      document.getElementById("initial-spacer-div").appendChild(playerElem);
    }
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
      alert(`${capitalize(Board.currentPlayer.playerId)} Wins`);
      window.location.reload();
    }

    if (shouldUpdatePlayer) {
      const boardPlayerIds = Board.players.map((value) => value.#playerId);
      const currentIndex = boardPlayerIds.indexOf(playerId);
      const nextIndex = (currentIndex + 1) % Board.players.length;
      Board.currentPlayer = Board.players[nextIndex];
      Board.showCurrentTurnText();
    }

    Board.resetCurrentDiceRoll();
    Board.disableControls = false;
  }

  moveUponDiceRoll(diceRoll) {
    Board.showCurrentDiceRoll(diceRoll);

    const playerFirstDiceRoll = this.#currentPosition === 0;
    const diceRollOverflowsBoard = this.#currentPosition + diceRoll > 100;
    const shouldGetDoubleChance = diceRoll === 6;

    if (playerFirstDiceRoll) {
      const elem = document.getElementById(`${this.#playerId}-player`);
      elem.remove();
      document.getElementById("snake-board").appendChild(elem);
    }

    if (diceRollOverflowsBoard) {
      this.#updatePlayerTurn(this.#playerId);
      return;
    }

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
          this.#currentPosition = currentNode.snake.tail;
          this.#updatePlayerTurn(this.#playerId);
          setTimeout(() => {
            this.#moveOnUI();
          }, this.#movementTime);
          return;
        }

        if (currentNode.hasLadderBottom()) {
          this.#currentPosition = currentNode.ladder.top;
          this.#updatePlayerTurn(this.#playerId, false);
          setTimeout(() => {
            this.#moveOnUI();
          }, this.#movementTime);
          return;
        }

        if (shouldGetDoubleChance) {
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
    const horizontalOffset = 15;
    const verticalOffset = 4;
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

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

function isSpacebarPressed(e) {
  return e.keyCode === 32;
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
    snakeBoard = new Board(playerCount);

    document.getElementById("add-players-step").classList.add("hide");
    document.getElementById("snake-game-step").classList.remove("hide");
  });

  document.body.onkeyup = (e) => {
    // Fire upon spacebar press
    if (isSpacebarPressed(e)) {
      if (Board.disableControls) {
        return;
      }

      Board.disableControls = true;
      Board.currentPlayer.moveUponDiceRoll(snakeBoard.dice.rollDice());
    }
  }
});
