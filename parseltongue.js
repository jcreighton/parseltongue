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

function getHogwartsCoordinates(parts) {
  const coords = randomCoordinates();
  if (!(parts.some(part => isEqualCoords(coords, part)))) {
    return coords;
  }

  return getHogwartsCoordinates(parts);
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

function drawHogwarts(body) {
  const coords = getHogwartsCoordinates(body);
  draw(coords, '#f14e32');

  return coords;
}

const [board, context, score, showGameOverScreen, hideGameOverScreen] = build();
const nagini = new Snake(SNAKE_LENGTH);

function start() {
  state = {
    dx: 0,
    dy: -20,
    direction: UP,
    snake: nagini.build(HALF_WIDTH, HALF_WIDTH, GRID),
    hogwarts: null,
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
    state.hogwarts = drawHogwarts(state.snake);
  } else {
    draw(state.hogwarts, '#f14e32')
  }

  state.snake = nagini.move(state.snake, state.dx, state.dy);
  drawSnake(state.snake);

  const [head, ...body] = state.snake;
  const collision = BOUNDARIES.some((coord, i) => coord === head[0] || coord === head[1])
    || body.some(part => isEqualCoords(head, part))

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
    }, 200)
  }
}

start();
