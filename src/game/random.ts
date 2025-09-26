import { GAME_CONFIG } from './config';

// Bolsa barajada para mayor variedad
let letterBag: string[] = [];
let lastLetter: string | null = null;

function refillBag() {
  const freq = GAME_CONFIG.letterFrequencies;
  letterBag = [];
  for (const [letter, weight] of Object.entries(freq)) {
    // Limitar exageraciones: aplicar una raíz suave opcional (ej: sqrt) para equilibrar
    const adjusted = Math.max(1, Math.round(Math.sqrt(weight) * 2)); // tuning ligero
    for (let i = 0; i < adjusted; i++) letterBag.push(letter);
  }
  // Fisher-Yates shuffle
  for (let i = letterBag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letterBag[i], letterBag[j]] = [letterBag[j], letterBag[i]];
  }
}

export function randomLetter(): string {
  if (letterBag.length === 0) refillBag();
  // Evitar repetir exactamente la misma letra si hay alternativa
  let candidate = letterBag.pop()!;
  if (lastLetter && candidate === lastLetter && letterBag.length > 0) {
    // buscar otra distinta (swap simple)
    for (let i = 0; i < letterBag.length; i++) {
      if (letterBag[i] !== lastLetter) {
        [candidate, letterBag[i]] = [letterBag[i], candidate];
        break;
      }
    }
  }
  lastLetter = candidate;
  return candidate;
}

export function randomColor(): string {
  const { colors } = GAME_CONFIG;
  return colors[Math.floor(Math.random() * colors.length)];
}

export function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
