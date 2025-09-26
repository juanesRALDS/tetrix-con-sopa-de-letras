import React from 'react';
import { GameState } from '../game/types';

interface Props {
  state: GameState;
  onSelect: (r: number, c: number) => void;
}

export const GameBoard: React.FC<Props> = ({ state, onSelect }) => {
  const { grid, falling, selected } = state;
  const selSet = new Set(selected.map(p => `${p.row}:${p.col}`));
  return (
    <div className="board" style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 32px)`, gap: 2, background: '#222', padding: 4, borderRadius: 8 }}>
      {grid.map((row, rIdx) => row.map((cell, cIdx) => {
        let display = cell?.letter || '';
        let color = cell?.color || '#333';
        // overlay falling
        if (falling && falling.row === rIdx && falling.col === cIdx) {
          display = falling.letter;
          color = falling.color;
        }
        const selectedCell = selSet.has(`${rIdx}:${cIdx}`);
        return (
          <button
            key={`${rIdx}-${cIdx}`}
            onClick={() => cell && onSelect(rIdx, cIdx)}
            style={{
              width: 32,
              height: 32,
              background: color,
              color: '#fff',
              fontWeight: 'bold',
              border: selectedCell ? '2px solid #fff' : '1px solid #000',
              borderRadius: 4,
              cursor: cell ? 'pointer' : 'default',
              opacity: cell || (falling && falling.row === rIdx && falling.col === cIdx) ? 1 : 0.15,
              fontSize: 16,
              lineHeight: '16px'
            }}
          >{display}</button>
        );
      }))}
    </div>
  );
};
