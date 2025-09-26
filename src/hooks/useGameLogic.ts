import { useCallback, useEffect, useReducer } from 'react';
import { GAME_CONFIG } from '../game/config';
import { GameState, Grid, FallingLetter } from '../game/types';
import { randomLetter, randomColor, uid } from '../game/random';
import { computePoints } from '../game/scoring';

// Reducer y lógica se completarán en el siguiente paso.

type Action = { type: 'TICK' } | { type: 'START' } | { type: 'SELECT'; row: number; col: number } | { type: 'CONFIRM_PHRASE' } | { type: 'PAUSE' } | { type: 'RESET' } | { type: 'DROP' } | { type: 'CLEAR_SELECTION' };

const createEmptyGrid = (rows: number, cols: number): Grid => Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));

const initialState: GameState = {
  grid: createEmptyGrid(GAME_CONFIG.rows, GAME_CONFIG.cols),
  falling: null,
  tick: 0,
  score: 0,
  phrases: [],
  selected: [],
  status: 'idle',
  level: 1,
  lines: 0,
};

function spawnLetter(grid: Grid): FallingLetter {
  const col = Math.floor(Math.random() * grid[0].length);
  return { id: uid('fall'), letter: randomLetter(), color: randomColor(), row: 0, col };
}

// NUEVO: remover posiciones y colapsar columnas (gravedad vertical)
function removeAndCollapse(grid: Grid, positions: { row: number; col: number }[]): Grid {
  const toRemove = new Set(positions.map(p => `${p.row}:${p.col}`));
  const rows = grid.length;
  const cols = grid[0].length;
  // Copia superficial
  const working: Grid = grid.map(r => r.slice());
  // Eliminar
  for (const key of toRemove) {
    const [r, c] = key.split(':').map(Number);
    working[r][c] = null;
  }
  // Colapsar cada columna hacia abajo
  for (let c = 0; c < cols; c++) {
    const stack: (typeof working[number][number])[] = [];
    for (let r = 0; r < rows; r++) {
      if (working[r][c]) stack.push(working[r][c]);
    }
    // Rellenar desde abajo
    for (let r = rows - 1; r >= 0; r--) {
      const fromTopIndex = stack.length - 1 - (rows - 1 - r);
      working[r][c] = fromTopIndex >= 0 ? stack[fromTopIndex] : null;
    }
  }
  return working;
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START': {
      if (state.status === 'running') return state;
      return { ...state, status: 'running', falling: spawnLetter(state.grid) };
    }
    case 'PAUSE':
      return { ...state, status: state.status === 'paused' ? 'running' : 'paused' };
    case 'RESET':
      return { ...initialState, grid: createEmptyGrid(GAME_CONFIG.rows, GAME_CONFIG.cols) };
    case 'TICK': {
      if (state.status !== 'running') return state;
      let { falling, grid, score } = state;
      if (!falling) {
        falling = spawnLetter(grid);
        return { ...state, falling };
      }
      // intentar bajar
      if (falling.row + 1 >= grid.length || grid[falling.row + 1][falling.col]) {
        // fijar
        const newGrid = grid.map(r => r.slice());
        newGrid[falling.row][falling.col] = { letter: falling.letter, color: falling.color, fixed: true };
        // comprobar game over
        const gameover = falling.row === 0;
        return {
          ...state,
            grid: newGrid,
            falling: gameover ? null : spawnLetter(newGrid),
            status: gameover ? 'gameover' : 'running'
        };
      } else {
        return { ...state, falling: { ...falling, row: falling.row + 1 }, tick: state.tick + 1 };
      }
    }
    case 'DROP': {
      if (!state.falling || state.status !== 'running') return state;
      let { falling, grid } = state;
      while (true) {
        if (falling.row + 1 >= grid.length || grid[falling.row + 1][falling.col]) break;
        falling = { ...falling, row: falling.row + 1 };
      }
      const newGrid = grid.map(r => r.slice());
      newGrid[falling.row][falling.col] = { letter: falling.letter, color: falling.color, fixed: true };
      const gameover = falling.row === 0;
      return { ...state, grid: newGrid, falling: gameover ? null : spawnLetter(newGrid), status: gameover ? 'gameover' : 'running' };
    }
    case 'SELECT': {
      const { row, col } = action;
      if (!state.grid[row][col]) return state;
      const cell = state.grid[row][col]!;
      // ignorar si ya seleccionada
      const exists = state.selected.some(p => p.row === row && p.col === col);
      if (exists) {
        return { ...state, selected: state.selected.filter(p => !(p.row === row && p.col === col)) };
      }
      // todos mismo color
      const selCells = state.selected.map(p => state.grid[p.row][p.col]).filter(Boolean);
      if (selCells.length > 0 && selCells.some(c => c!.color !== cell.color)) return state; // color mismatch
      return { ...state, selected: [...state.selected, { row, col }] };
    }
    case 'CONFIRM_PHRASE': {
      if (state.selected.length === 0) return state;
      // Usar el orden de selección directamente (sin ordenar por fila/columna)
      const positions = [...state.selected];
      const letters = positions.map(p => state.grid[p.row][p.col]!.letter);
      const color = state.grid[positions[0].row][positions[0].col]!.color;
      const text = letters.join('');
      const points = computePoints(text);
      const newGrid = removeAndCollapse(state.grid, positions);
      return {
        ...state,
        grid: newGrid,
        phrases: [
          ...state.phrases,
          {
            id: uid('ph'),
            text,
            color,
            letters: positions.map(p => ({ ...p, letter: state.grid[p.row][p.col]!.letter })),
            points,
            createdAt: Date.now()
          }
        ],
        score: state.score + points,
        selected: []
      };
    }
    case 'CLEAR_SELECTION': {
      if (state.selected.length === 0) return state;
      return { ...state, selected: [] };
    }
    default:
      return state;
  }
}

export function useGameLogic() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  const tick = useCallback(() => dispatch({ type: 'TICK' }), []);
  const drop = useCallback(() => dispatch({ type: 'DROP' }), []);
  const select = useCallback((row: number, col: number) => dispatch({ type: 'SELECT', row, col }), []);
  const confirm = useCallback(() => dispatch({ type: 'CONFIRM_PHRASE' }), []);
  const cancel = useCallback(() => dispatch({ type: 'CLEAR_SELECTION' }), []);

  // teclado básico
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === ' ') { e.preventDefault(); drop(); }
      if (e.key === 'Enter') { e.preventDefault(); confirm(); }
      if (e.key === 'Escape') { e.preventDefault(); cancel(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drop, confirm, cancel]);

  return { state, actions: { start, pause, reset, tick, drop, select, confirm, cancel } };
}
