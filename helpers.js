import { COLUMNS, GRID } from './board.constants.js';

export function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function randomCoordinates(min = 0, max = COLUMNS, grid = GRID) {
  return [randomNumber(min, max) * grid, randomNumber(min, max) * grid];
}

export function isEqualCoords([x1, y1], [x2, y2]) {
  return x1 === x2 && y1 === y2;
}

export function isOutsideCoords([x1, y1], [x2, y2]) {
  return (x1 < x2 || x1 > y2) || (y1 < x2 || y1 > y2)
}
