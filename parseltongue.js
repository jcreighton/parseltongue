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

    return board;
  }

  createOptions() {
    const options = document.createElement('div');
    options.className = 'options';

    const button = document.createElement('button');
    button.innerText = 'Start';
    button.addEventListener('click', () => this.hideScreen());
    this.options.append(button);

    return options;
  }

  hideScreen() {
    // Hide screen
    // Remove event listener
  }

  build() {
    this.game = document.querySelector('#parseltongue');
    this.scoreboard = this.createScoreboard();
    this.board = this.createGame();
    this.options = this.createOptions();

    this.game.append(this.scoreboard, this.board, this.options);
  }
}

const board = new Board();
board.build();
// board.drawImage();