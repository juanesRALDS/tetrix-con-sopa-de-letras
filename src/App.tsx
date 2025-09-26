import React, { useEffect } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { useInterval } from './hooks/useInterval';
import { GameBoard } from './components/GameBoard';
import { Sidebar } from './components/Sidebar';
import { Controls } from './components/Controls';
import { ColorLegend } from './components/ColorLegend';
import logoUnicom from './Imagen/logoUnicomfacauca.jpeg';

export const App: React.FC = () => {
  const { state, actions } = useGameLogic();

  // velocidad dinámica (simple por ahora)
  const interval = state.status === 'running' ? Math.max(180, 900 - state.level * 40) : null;
  useInterval(() => actions.tick(), interval);

  useEffect(() => {
    if (state.status === 'idle') actions.start();
  }, [state.status, actions]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={logoUnicom}
            alt="Logo Unicomfacauca"
            style={{ height: 48, width: 'auto', borderRadius: 8, objectFit: 'cover', background: '#fff' }}
          />
          <h1 style={{ margin: 0 }}>TetriWords</h1>
        </div>
        <Controls
          running={state.status === 'running'}
          gameover={state.status === 'gameover'}
          onStart={actions.start}
          onPause={actions.pause}
          onReset={actions.reset}
          onDrop={actions.drop}
        />
      </header>
      <main style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <GameBoard state={state} onSelect={actions.select} />
          <ColorLegend />
        </div>
        <Sidebar state={state} onConfirm={actions.confirm} onCancel={actions.cancel} />
      </main>
      <footer style={{ fontSize: 12, opacity: .6 }}>Espacio: caída rápida • Enter: confirmar frase • Click en celdas del mismo color para construir.</footer>
    </div>
  );
};
