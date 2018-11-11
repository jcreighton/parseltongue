import { randomNumber } from './helpers.js';

export const RAVENCLAW = 'RAVENCLAW';
export const GRYFFINDOR = 'GRYFFINDOR';
export const SLYTHERIN = 'SLYTHERIN';
export const HUFFLEPUFF = 'HUFFLEPUFF';

export const HOUSES = {
  RAVENCLAW: '#071A80',
  GRYFFINDOR: '#941B08',
  SLYTHERIN: '#154C07',
  HUFFLEPUFF: '#F1F31C',
};

export function hogwartsColor() {
  return HOUSES[Object.keys(HOUSES)[randomNumber(0, 3)]];
};
