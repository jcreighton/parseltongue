class Board {
  createScoreboard() {
    const scoreboard = document.createElement('div');
    scoreboard.className = 'scoreboard';
    scoreboard.innerHTML = '<span>Score: 0</span>';

    return scoreboard;
  }

  updateScoreboard(score) {
    this.scoreboard.innerHTML = `<span>Score: ${score}</span>`;
  }

  createGame() {
    const board = document.createElement('canvas');
    board.className = 'board';
    board.height = 480;
    board.width = 480;

    return board;
  }

  createOptions() {
    const options = document.createElement('div');
    options.className = 'options';
    options.innerHTML = '<span>Start Game</span>'
    options.addEventListener('click', () => this.handleOption());

    return options;
  }

  build() {
    this.game = document.querySelector('#parseltongue');
    // this.scoreboard = this.createScoreboard();
    this.board = this.createGame();
    // this.options = this.createOptions();
    this.game.append(this.board);
    // this.game.append(this.scoreboard, this.board, this.options);
  }

  context() {
    return this.board.getContext('2d');
  }
}

const snake = new Nagini();
const board = new Board();
board.build();
const context = board.context();
// context.fillRect(x, y, size, size);
// requestAnimationFrame ?
// Constants
const boardWidth = 480;
const halfWidth = boardWidth / 2;
const boardCoordinates = [0, 480];
const grid = 20;
const columns = 24;
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const DOWN = 'DOWN';
const UP = 'UP';

const RAVENCLAW = 'RAVENCLAW';
const GRYFFINDOR = 'GRYFFINDOR';
const SLYTHERIN = 'SLYTHERIN';
const HUFFLEPUFF = 'HUFFLEPUFF';

const houses = {
  RAVENCLAW: 'color',
  GRYFFINDOR: 'color',
  SLYTHERIN: 'color',
  HUFFLEPUFF: 'color',
};

const state = {
  dx: 0,
  dy: -20,
  direction: UP,
  snake: snake.build(halfWidth, halfWidth, grid, 4),
  hogwarts: null,
}

let hogwarts = [];
drawSnake(state.snake);

function setDirection(keyCode, current) {
  const directions = {
    37: LEFT,
    38: UP,
    39: RIGHT,
    40: DOWN,
  };

  const inverse = {
    [RIGHT]: LEFT,
    [LEFT]: RIGHT,
    [UP]: DOWN,
    [DOWN]: UP,
  }

  let direction = directions[keyCode];
  if (!direction) {
    return direction = state.direction;
  }

  if (inverse[current] === direction) {
    return;
  }

  return [direction, ...velocity(direction)];
};

function velocity(direction) {
  const velocities = {
    [UP]: [0, -20],
    [DOWN]: [0, 20],
    [RIGHT]: [20, 0],
    [LEFT]: [-20, 0],
  }

  return velocities[direction];
};

document.body.addEventListener('keydown',
  ({ keyCode }) => {
    const [direction, dx, dy] = setDirection(keyCode, state.direction);
    state.direction = direction;
    state.dx = dx;
    state.dy = dy;
  });

function isCollision([x1, y1], [x2, y2]) {
  return x1 === x2 && y1 === y2;
}

function getHogwartsCoordinates(parts) {
  const coords = randomCoordinates();
  if (!(parts.some(part => isCollision(coords, part)))) {
    return coords;
  }

  return getHogwartsCoordinates(parts);
}

function draw(part, color) {
  context.fillStyle = color;
  context.fillRect(...part, 20, 20);
  context.strokeRect(...part, 20, 20);
}
function drawSnake(snake) {
  snake.forEach(part => draw(part, '#268bd2'));
}

function drawHogwarts(body) {
  const coords = getHogwartsCoordinates(body);
  draw(coords, '#f14e32');

  return coords;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function randomCoordinates(min = 0, max = 24, grid = 20) {
  return [randomNumber(min, max) * grid, randomNumber(min, max) * grid];
}

function loop() {
  console.log(state.hogwarts);
  context.clearRect(0, 0, 480, 480);

  if (!state.hogwarts) {
    state.hogwarts = drawHogwarts(state.snake);
  } else {
    draw(state.hogwarts, '#f14e32')
  }

  state.snake = snake.move(state.snake, state.dx, state.dy);
  drawSnake(state.snake);

  const [head, ...body] = state.snake;
  const collision = boardCoordinates.some((coord, i) => coord === head[1])
    || body.some(part => isCollision(head, part))

  const eaten = isCollision(head, state.hogwarts);
  if (eaten) {
    state.hogwarts = null;
    snake.grow();
  //   board.updateScoreboard();
  }

  if (!collision) {
    setTimeout(() => {
      loop();
    }, 300)
  }
}

loop();
