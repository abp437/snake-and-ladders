class Dice {
  static getDiceRollHtml(diceRoll) {
    let diceRollHtml = ``;
    switch (diceRoll) {
      case 1:
        diceRollHtml = `<div class="dice first-face">
          <span class="dot">
          </span>
        </div>`;
        break;
      case 2:
        diceRollHtml = `<div class="dice second-face">
          <span class="dot">
          </span>
          <span class="dot">
          </span>
        </div>`;
        break;
      case 3:
        diceRollHtml = `<div class="dice third-face">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>`;
        break;
      case 4:
        diceRollHtml = `<div class="fourth-face dice">
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
        diceRollHtml = `<div class="fifth-face dice">
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
        diceRollHtml = `<div class="sixth-face dice">
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
        diceRollHtml = `<div class="dice"></div>`;
        break;
    }

    return diceRollHtml.replace(/(\r\n|\n|\r|\t)/gm, "");
  }

  // Returns a random number from 1 to 6
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

class Board {
  #playerCount;

  static possiblePlayers = ["red", "blue", "white", "salmon"];

  static currentPlayer = null;

  static disableControls = false;

  static players = [];

  static nodes = [];

  static showCurrentTurnText() {
    document.getElementById("current-player-turn").textContent = `${capitalize(Board.currentPlayer.playerId)} player's turn`;
  }

  static showCurrentDiceRoll(diceRoll) {
    const diceRollElem = document.getElementById("current-dice-roll");
    diceRollElem.classList.remove("hide");
    diceRollElem.innerHTML = Dice.getDiceRollHtml(diceRoll);
  }

  static resetCurrentDiceRoll(diceRoll) {
    const diceRollElem = document.getElementById("current-dice-roll");
    diceRollElem.innerHTML = Dice.getDiceRollHtml(0);
  }

  get dice() {
    return new Dice();
  }

  static get snakesList() {
    return [
      { head: 40, tail: 3 },
      { head: 43, tail: 18 },
      { head: 27, tail: 5 },
      { head: 54, tail: 31 },
      { head: 66, tail: 45 },
      { head: 76, tail: 58 },
      { head: 89, tail: 53 },
      { head: 99, tail: 41 },
    ];
  }

  static get laddersList() {
    return [
      { bottom: 4, top: 25 },
      { bottom: 13, top: 46 },
      { bottom: 33, top: 49 },
      { bottom: 42, top: 63 },
      { bottom: 50, top: 69 },
      { bottom: 62, top: 81 },
      { bottom: 74, top: 92 },
    ];
  }

  get nodes() {
    return Board.nodes;
  }

  get players() {
    return Board.players;
  }

  constructor(playerCount) {
    this.#playerCount = playerCount;
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
    Board.snakesList.forEach((snake) => {
      const { head, tail } = snake;
      const headNode = Board.nodes[head - 1];
      headNode.setSnake(new Snake(head, tail));
    });
  }

  #initializeLadders() {
    Board.laddersList.forEach((ladder) => {
      const { top, bottom } = ladder;
      const bottomNode = Board.nodes[bottom - 1];
      bottomNode.setLadder(new Ladder(top, bottom));
    });
  }

  #initializePlayers() {
    shuffleArray(Board.possiblePlayers);

    for (let i = 0; i < this.#playerCount; i++) {
      const parser = new DOMParser();
      const elem = Board.possiblePlayers[i];
      const htmlString = `<div id="${elem}-player" class="player ${elem}-player"></div>`;
      const playerElem = parser.parseFromString(htmlString, "text/html").body.firstChild;

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

  static #movementTime = 500;

  constructor(playerId, currentPosition) {
    this.#playerId = playerId;
    this.#currentPosition = currentPosition;
  }

  get currentPosition() {
    return this.#currentPosition;
  }

  get playerId() {
    return this.#playerId;
  }

  #move() {
    const { x, y } = this.#calculatePosition(this.#currentPosition);
    const elem = document.getElementById((`${this.#playerId}-player`));
    elem.style.bottom = `${y}px`;
    elem.style.left = `${x}px`;
  }

  #updatePlayerTurn(playerId, shouldUpdatePlayer = true) {
    if (Board.currentPlayer.currentPosition === 100) {
      alert(`${capitalize(Board.currentPlayer.playerId)} Wins`);
      window.location.reload();
    }

    if (shouldUpdatePlayer) {
      const boardPlayerIds = Board.players.map(value => value.#playerId);
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
    if (this.#currentPosition === 0) {
      const elem = document.getElementById((`${this.#playerId}-player`));
      elem.remove();
      document.getElementById('snake-board').appendChild(elem);
    }

    if (this.currentPosition + diceRoll > 100) {
      this.#updatePlayerTurn(this.#playerId);
      return;
    }

    let counter = 0;
    let looper = setInterval(() => {
      counter++;
      this.#currentPosition++;

      this.#move();

      if (counter >= diceRoll) {
        const currentNode = Board.nodes[Board.currentPlayer.currentPosition - 1];
        clearInterval(looper);

        // Post movement checks
        if (currentNode.hasSnakeHead()) {
          this.#currentPosition = currentNode.snake.tail;
          this.#updatePlayerTurn(this.#playerId);
          setTimeout(() => {
            this.#move();
          }, Player.#movementTime);
          return;
        }

        if (currentNode.hasLadderBottom()) {
          this.#currentPosition = currentNode.ladder.top;
          this.#updatePlayerTurn(this.#playerId, false);
          setTimeout(() => {
            this.#move();
          }, Player.#movementTime);
          return;
        }

        this.#updatePlayerTurn(this.#playerId);
      }
    }, Player.#movementTime);
  }

  #calculatePosition(position) {
    let row, column;

    if (position % 10 === 0) {
      row = position / 10 - 1;
    } else {
      row = Math.floor(position / 10);
    }

    // Left to right rows
    if (row % 2 === 0) {
      if (position % 10 === 0) {
        column = 9;
      } else {
        column = position % 10 - 1;
      }
    // Right to left rows
    } else {
      if (position % 10 === 0) {
        column = 0;
      } else {
        column = Math.abs(position % 10 - 10);
      }
    }

    return {
      x: 61 * column + 15,
      y: 61 * row + 4,
    };
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
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
    if (e.keyCode === 32) {
      if (Board.disableControls) {
        return;
      }

      Board.disableControls = true;
      Board.currentPlayer.moveUponDiceRoll(snakeBoard.dice.rollDice());
    }
  }
});
