(function() {

  const BOARD_WIDTH = 480;
  const BOARD_HEIGHT = 480;
  const HALF_WIDTH = BOARD_WIDTH / 2;
  const GRID = 20;
  const COLUMNS = 24;
  const BOUNDARIES = [0, BOARD_WIDTH - GRID];
  const SNAKE_LENGTH = 4;
  const SNAKE_COLOR = '#268bd2';
  const LEFT = 'LEFT';
  const RIGHT = 'RIGHT';
  const DOWN = 'DOWN';
  const UP = 'UP';

  const RAVENCLAW = 'RAVENCLAW';
  const GRYFFINDOR = 'GRYFFINDOR';
  const SLYTHERIN = 'SLYTHERIN';
  const HUFFLEPUFF = 'HUFFLEPUFF';

  const HOUSES = {
    RAVENCLAW: '#071A80',
    GRYFFINDOR: '#941B08',
    SLYTHERIN: '#154C07',
    HUFFLEPUFF: '#F1F31C',
  };

  let state = {};

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
    endScreen.className = 'game-over hidden';
    endScreen.innerHTML = '<span>Restart</span>'
    endScreen.addEventListener('click', start);

    function gameOver() {
      endScreen.className = 'game-over visible';
    }

    game.append(board, scoreboard);

    document.body.addEventListener('keydown', ({ keyCode }) => {
      const [direction, dx, dy] = setDirection(keyCode, state.direction);
      state.direction = direction;
      state.dx = dx;
      state.dy = dy;
    });

    return [board, board.getContext('2d'), update];
  }

  function snake(length) {
    return {
      length,
      build: (x, y, grid, length) => {
        let i = 0;
        function* body(length) {
          while (i < length) {
            yield [x , y + (i * grid)];
            i++;
          }
        }

        return [...body(length)];
      },
      move: (body, dx = 0, dy = 0) => {
        const [x, y] = body[0];
        const head = [x + dx, y + dy];
        const c = [
          head,
          ...body.slice(0, this.length - 1),
        ];
        return c;
      },
      grow: () => {
        this.length++;
      },
    };
  }

  function isEqualCoords([x1, y1], [x2, y2]) {
    return x1 === x2 && y1 === y2;
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
    context.fillRect(...part, 20, 20);
    context.strokeRect(...part, 20, 20);
  }

  function drawSnake(snake) {
    snake.forEach(part => draw(part, SNAKE_COLOR));
  }

  function drawHogwarts(body) {
    const coords = getHogwartsCoordinates(body);
    draw(coords, '#f14e32');

    return coords;
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function randomCoordinates(min = 0, max = COLUMNS, grid = GRID) {
    return [randomNumber(min, max) * grid, randomNumber(min, max) * grid];
  }

  const [board, context, score] = build();
  const nagini = snake(SNAKE_LENGTH);

  function start() {
    state = {
      dx: 0,
      dy: -20,
      direction: UP,
      snake: nagini.build(HALF_WIDTH, HALF_WIDTH, GRID, 4),
      hogwarts: null,
      score: 0,
    };

    drawSnake(state.snake);
    score(state.score);
  }

  start();

  function loop() {
    context.clearRect(0, 0, 480, 480);

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

    if (!collision) {
      setTimeout(() => {
        loop();
      }, 300)
    }
  }

  loop();

})();


