const easyBoard = {
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
};

const mediumBoard = {
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
};

const difficultBoard = {
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
};

const classicBoard = {
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
};

const rocketsBoard = {
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
};

// This board has a special case at position 98, it has snake's head at the ladder's top
const dragonsBoard = {
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
};
