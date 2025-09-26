import { describe, it, expect } from 'vitest';
import { randomLetter, randomColor } from '../src/game/random';
import { GAME_CONFIG } from '../src/game/config';

describe('random utilities', () => {
  it('devuelve una letra válida', () => {
    const l = randomLetter();
    expect(Object.keys(GAME_CONFIG.letterFrequencies)).toContain(l);
  });
  it('devuelve un color válido', () => {
    const c = randomColor();
    expect(GAME_CONFIG.colors).toContain(c);
  });
});
