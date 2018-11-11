import { BOARD_WIDTH, BOARD_HEIGHT, HALF_WIDTH, BOUNDARIES, GRID, LOOP_MS } from './board.constants.js';
import { SNAKE_LENGTH, SNAKE_COLOR } from './snake.constants.js';
import { UP } from './direction.constants.js';
import { setDirection } from './direction.js';
import { randomCoordinates, isEqualCoords, isOutsideCoords } from './helpers.js';
import { hogwartsColor } from './hogwarts.js';
import { Snake } from './Snake.js';

let state = {};

function build() {
  const game = document.querySelector('#parseltongue');
  const board = document.createElement('canvas');
  board.className = 'board';
  board.height = BOARD_HEIGHT;
  board.width = BOARD_WIDTH;

  const scoreboard = document.createElement('div');
  scoreboard.className = 'scoreboard';

  function update(score) {
    scoreboard.innerHTML = `<span>Score: ${score}</span>`;
  }

  const endScreen = document.createElement('div');
  endScreen.innerHTML = '<button>Restart</button>'
  endScreen.addEventListener('click', restart);
  hidden();

  function hidden() {
    endScreen.className = 'game-over hidden';
  }

  function visible() {
    endScreen.className = 'game-over visible';
  }

  game.append(board, scoreboard, endScreen);

  return [board, board.getContext('2d'), update, visible, hidden];
}

function getNonCollisionCoords(parts = state.snake) {
  const coords = randomCoordinates();
  if (!(parts.some(part => isEqualCoords(coords, part)))) {
    return coords;
  }

  return getNonCollisionCoords(parts);
}

function draw(part, color) {
  context.fillStyle = color;
  context.fillRect(...part, GRID, GRID);
  context.strokeRect(...part, GRID, GRID);
}

function clear() {
  context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
}

function drawSnake(snake) {
  snake.forEach(part => draw(part, SNAKE_COLOR));
}

function drawHogwarts(color) {
  const coords = getNonCollisionCoords();
  draw(coords, color);

  return coords;
}

const [board, context, score, showGameOverScreen, hideGameOverScreen] = build();
const nagini = new Snake(SNAKE_LENGTH);

function listenForDirection() {
  document.body.addEventListener('keydown', ({ keyCode }) => {
    const [direction, dx, dy] = setDirection(keyCode, state.direction);
    state.direction = direction;
    state.dx = dx;
    state.dy = dy;
  });
}

function start() {
  state = {
    dx: 0,
    dy: -20,
    direction: UP,
    snake: nagini.build(HALF_WIDTH, HALF_WIDTH, GRID),
    hogwarts: null,
    house: hogwartsColor(),
    score: 0,
  };

  drawSnake(state.snake);
  score(state.score);
  loop();
}

function restart() {
  hideGameOverScreen();
  nagini.reset();
  clear();
  start();
}

function loop() {
  clear();

  if (!state.hogwarts) {
    state.house = hogwartsColor();
    state.hogwarts = drawHogwarts(state.house);
  } else {
    draw(state.hogwarts, state.house);
  }

  state.snake = nagini.move(state.snake, state.dx, state.dy);
  drawSnake(state.snake);

  const [head, ...body] = state.snake;
  const collision = isOutsideCoords(head, BOUNDARIES) || body.some(part => isEqualCoords(head, part));

  const eaten = isEqualCoords(head, state.hogwarts);
  if (eaten) {
    state.hogwarts = null;
    nagini.grow();
    score(state.score += 10);
  }

  if (collision) {
    showGameOverScreen();
  } else {
    setTimeout(() => {
      loop();
    }, LOOP_MS)
  }
}

listenForDirection();
start();
