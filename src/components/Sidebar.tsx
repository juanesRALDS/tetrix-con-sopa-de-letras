import React from 'react';
import { GameState } from '../game/types';

interface Props {
  state: GameState;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Sidebar: React.FC<Props> = ({ state, onConfirm, onCancel }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 260 }}>
      <section style={{ background: '#1e1e1e', padding: 12, borderRadius: 8 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Puntuación</h2>
        <div style={{ fontSize: 32, fontWeight: 'bold' }}>{state.score}</div>
      </section>
      <section style={{ background: '#1e1e1e', padding: 12, borderRadius: 8, flex: 1, minHeight: 200 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Frases</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 160, overflowY: 'auto' }}>
          {state.phrases.map(p => (
            <li key={p.id} style={{ background: '#262626', padding: '4px 6px', borderRadius: 4, borderLeft: `4px solid ${p.color}`, display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace' }}>
              <span>{p.text}</span>
              <span style={{ opacity: .7 }}>{p.points}</span>
            </li>
          ))}
          {state.phrases.length === 0 && <li style={{ opacity: .6 }}>— vacío —</li>}
        </ul>
      </section>
      <section style={{ background: '#1e1e1e', padding: 12, borderRadius: 8 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Selección</h2>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', minHeight: 40 }}>
          {state.selected.map(p => {
            const cell = state.grid[p.row][p.col]!;
            return <span key={`${p.row}-${p.col}`} style={{ background: cell.color, padding: '4px 6px', borderRadius: 4, fontWeight: 'bold' }}>{cell.letter}</span>;
          })}
          {state.selected.length === 0 && <span style={{ opacity: .6 }}>—</span>}
        </div>
        <button onClick={onConfirm} disabled={state.selected.length === 0} style={{ marginTop: 8, padding: '6px 10px', fontWeight: 'bold', background: '#444', color: '#fff', border: '1px solid #666', borderRadius: 6, cursor: state.selected.length === 0 ? 'not-allowed' : 'pointer' }}>Confirmar</button>
        <button onClick={onCancel} disabled={state.selected.length === 0} style={{ marginTop: 8, marginLeft: 8, padding: '6px 10px', fontWeight: 'bold', background: '#303030', color: '#ccc', border: '1px solid #555', borderRadius: 6, cursor: state.selected.length === 0 ? 'not-allowed' : 'pointer' }}>Cancelar</button>
      </section>
    </div>
  );
};
