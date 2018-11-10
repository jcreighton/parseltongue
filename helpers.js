function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function randomCoordinates(min = 0, max = COLUMNS, grid = GRID) {
  return [randomNumber(min, max) * grid, randomNumber(min, max) * grid];
}

function isEqualCoords([x1, y1], [x2, y2]) {
  return x1 === x2 && y1 === y2;
}
