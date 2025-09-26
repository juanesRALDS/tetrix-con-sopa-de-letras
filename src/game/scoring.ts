import { PhraseEntry } from './types';
import { GAME_CONFIG } from './config';

export function computePoints(text: string): number {
  const base = text.length * GAME_CONFIG.bonusPerLength;
  let lengthBonus = 1;
  if (text.length >= 10) lengthBonus = 2;
  else if (text.length >= 6) lengthBonus = 1.5;
  return Math.round(base * lengthBonus);
}

export function summarize(phrases: PhraseEntry[]): { total: number } {
  return { total: phrases.reduce((a, p) => a + p.points, 0) };
}
