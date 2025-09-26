import { describe, it, expect } from 'vitest';
import { computePoints } from '../src/game/scoring';

describe('computePoints', () => {
  it('puntúa palabra corta sin bonus', () => {
    expect(computePoints('ABC')).toBe(30);
  });
  it('aplica bonus >=6', () => {
    const base = 6 * 10; // 60
    expect(computePoints('ABCDEF')).toBe(Math.round(base * 1.5));
  });
  it('aplica bonus >=10', () => {
    const base = 10 * 10; // 100
    expect(computePoints('ABCDEFGHIJ')).toBe(Math.round(base * 2));
  });
});
