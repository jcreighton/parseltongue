class Board {
  constructor() {
    this.started = false;
  }

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
    board.height = 500;
    board.width = 500;

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
context.fillStyle = '#268bd2';
const body = snake.draw();
body.forEach((square) => context.fillRect(...square));
// context.fillRect(x, y, size, size);
const dx = 10;
const dy = 0;
document.body.addEventListener('keydown', ({ keyCode }) => {
  const UP = 38;
  const DOWN = 40;
  const RIGHT = 39;
  const LEFT = 37;

  switch(keyCode) {
    case UP:
      dx = 0;
      dy = 10;
    break;
    case DOWN:
      dx = 0;
      dy = -10;
    break;
    case RIGHT:
      dx = 10;
      dy = 0;
    break;
    case LEFT:
      dx = -10;
      dy = 0;
    break;
    default:
      dx = 10;
      dy = 0;
  }
});




