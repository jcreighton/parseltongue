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

  if (!direction || (inverse[current] === direction)) {
    return [state.direction, ...velocity(state.direction)];
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

document.body.addEventListener('keydown', ({ keyCode }) => {
  const [direction, dx, dy] = setDirection(keyCode, state.direction);
  state.direction = direction;
  state.dx = dx;
  state.dy = dy;
});
