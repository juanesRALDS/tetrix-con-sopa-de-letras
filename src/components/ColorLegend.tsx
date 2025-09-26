import React from 'react';
import { GAME_CONFIG } from '../game/config';

export const ColorLegend: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {GAME_CONFIG.colors.map(c => (
        <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
          <span style={{ width: 16, height: 16, background: c, borderRadius: 4, border: '1px solid #000' }}></span>
          <code>{c}</code>
        </span>
      ))}
    </div>
  );
};
