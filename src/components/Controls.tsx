import React from 'react';

interface Props {
  running: boolean;
  gameover: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onDrop: () => void;
}

export const Controls: React.FC<Props> = ({ running, gameover, onStart, onPause, onReset, onDrop }) => {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {!running && !gameover && <button onClick={onStart}>Iniciar</button>}
      {running && <button onClick={onPause}>Pausar</button>}
      {!running && !gameover && <button onClick={onPause}>Continuar</button>}
      <button onClick={onDrop} disabled={!running}>Caer (Espacio)</button>
      <button onClick={onReset}>Reiniciar</button>
      {gameover && <strong style={{ color: '#ff5252' }}>Game Over</strong>}
    </div>
  );
};
