import { GameConfig } from './types';

export const GAME_CONFIG: GameConfig = {
  rows: 18,
  cols: 10,
  fallIntervalMs: 900,
  colors: ['#FF5252', '#FFCA28', '#66BB6A', '#42A5F5', '#AB47BC'],
  letterFrequencies: {
    A: 12, E: 12, O: 9, S: 7, N: 7, R: 6, I: 6, L: 5, T: 5, D: 5,
    C: 4, U: 4, M: 3, P: 3, B: 2, G: 2, V: 2, Y: 1, Q: 1, H: 1, J: 1, K: 1, F: 1, Z: 1, X:1, W:1
  },
  bonusPerLength: 10,
  sameColorBonus: 1.0,
};
