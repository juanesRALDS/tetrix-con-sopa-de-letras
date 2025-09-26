export type Cell = {
  letter: string;
  color: string; // hex
  fixed: boolean; // true cuando ya está en la grilla
};

export type Grid = (Cell | null)[][]; // grid[row][col]

export interface FallingLetter {
  id: string;
  letter: string;
  color: string;
  row: number;
  col: number;
}

export interface PhraseEntry {
  id: string;
  text: string;
  color: string;
  letters: { row: number; col: number; letter: string }[];
  points: number;
  createdAt: number;
}

export interface GameState {
  grid: Grid;
  falling: FallingLetter | null;
  tick: number;
  score: number;
  phrases: PhraseEntry[];
  selected: { row: number; col: number }[];
  status: 'idle' | 'running' | 'paused' | 'gameover';
  level: number;
  lines: number; // no es exactamente tetris pero sirve para escalar velocidad
}

export interface GameConfig {
  rows: number;
  cols: number;
  fallIntervalMs: number; // base
  colors: string[];
  letterFrequencies: Record<string, number>; // peso para random
  bonusPerLength: number; // multiplicador base
  sameColorBonus: number; // bono extra (podría usarse más adelante)
}
