# TetriWords

Juego experimental que combina caída de letras (similar a Tetris) con construcción de frases tipo sopa de letras.

## Idea General
- Letras (una sola celda) caen una a una en un tablero rectangular.
- Cada letra tiene un color. Solo puedes combinar letras del MISMO color para crear una palabra/frase.
- Haces click en celdas fijas (no la que está cayendo) para seleccionarlas / deseleccionarlas.
- Presiona Enter o el botón "Confirmar" para registrar la palabra.
- La palabra se construye concatenando las letras en el orden de selección (ya no se ordena por fila y columna).
- Las palabras confirmadas dan puntos y se listan a la derecha.
- Espacio deja caer la letra actual hasta abajo.
- Si una letra se fija en la primera fila se termina la partida.

## Estado Actual
MVP funcional: caída de letras, selección homogénea por color, confirmación de palabra y puntuación básica.

## Scripts
- `npm run dev` – servidor de desarrollo
- `npm run build` – build producción
- `npm run preview` – previsualizar build
- `npm run lint` – linting

## Reglas y Puntuación
- Puntos base: longitud * 10.
- Bonus de longitud: >=6 letras *1.5, >=10 letras *2.
- (Espacio para más reglas de bonus por color o velocidad en el futuro.)

## Controles
- Iniciar: automático al cargar / botón Iniciar.
- Pausar: botón Pausar.
- Espacio: caída rápida de la letra actual.
- Enter: confirmar palabra/frase seleccionada.
- Click: seleccionar/deseleccionar celdas (solo mismo color).
- Nuevo: botón "Cancelar" para limpiar la selección actual (también tecla Escape).

## Mejoras Futuras
- Validación con diccionario (actualmente acepta cualquier secuencia de letras).
- Multiplicadores por rapidez o combos.
- Niveles incrementales de velocidad según tiempo o cantidad de letras.
- Animaciones y transiciones más fluidas.
- Guardado en localStorage de récords.

## Requisitos
Solo frontend (sin backend). Se pueden simular listas de frases objetivo si se requiere.

## Licencia
MIT

## Despliegue (Hosting Temporal)

Tienes varias opciones rápidas:

### Vercel
1. Instala CLI (opcional): `npm i -g vercel`
2. Ejecuta `vercel` y sigue los pasos (framework: Other, build: `npm run build`, output: `dist`).
3. O conecta el repo en el panel de Vercel (detectará `vercel.json`).

### Netlify
1. En panel de Netlify: New Site → Import from Git.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. El archivo `netlify.toml` ya contiene un redirect SPA.

### GitHub Pages
1. Asegúrate de que tu rama principal se llame `main`.
2. Activa Pages: Settings → Pages → Source: GitHub Actions.
3. El workflow `.github/workflows/deploy-gh-pages.yml` publicará automáticamente en cada push a `main`.

### Cloudflare Pages (opcional)
1. Create application → Conectar repo.
2. Build command: `npm run build`.
3. Output directory: `dist`.

### Variables / Notas
- Proyecto estático puro: no requiere servidor backend.
- Para rutas adicionales tipo SPA se incluyó redirect en Netlify; en Vercel y GitHub Pages no se usan rutas internas todavía.

### Previsualizar local producción
```bash
npm run build
npm run preview
```

- Las letras usadas en una palabra confirmada ahora desaparecen y las columnas se colapsan hacia abajo, permitiendo liberar espacio.
- Generación de letras: ahora se usa una "bolsa" barajada que reduce repeticiones inmediatas y distribuye mejor las letras.
# tetrix-con-sopa-de-letras
