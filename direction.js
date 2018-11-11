import { UP, DOWN, LEFT, RIGHT } from './direction.constants.js';
import { GRID } from './board.constants.js';

export function setDirection(keyCode, current) {
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
    return [current, ...velocity(current)];
  }

  return [direction, ...velocity(direction)];
};

function velocity(direction) {
  const velocities = {
    [UP]: [0, -GRID],
    [DOWN]: [0, GRID],
    [RIGHT]: [GRID, 0],
    [LEFT]: [-GRID, 0],
  }

  return velocities[direction];
};
