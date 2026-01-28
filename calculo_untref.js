let matrix = [];
let totalScore = 0;
const SIZE = 4;

function cargarCalculo() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="juego-pantalla">
            <h2 style="color:var(--azul-untref)">Desafío 2048 UNTREF</h2>
            <div style="font-size: 1.5rem; margin-bottom: 10px;">Puntos: <span id="score">0</span></div>
            
            <div id="grid-container" class="grid-2048"></div>

            <div class="controles-2048">
                <button class="btn-flecha" onclick="handleMove('up')">↑</button>
                <div class="fila-flechas">
                    <button class="btn-flecha" onclick="handleMove('left')">←</button>
                    <button class="btn-flecha" onclick="handleMove('right')">→</button>
                </div>
                <button class="btn-flecha" onclick="handleMove('down')">↓</button>
            </div>

            <button class="btn-volver" onclick="volverAlMenu()" style="margin-top:20px;">← Volver al Menú</button>
        </div>
    `;
    init2048();
}

function init2048() {
    // Crear matriz vacía de 0s
    matrix = Array(SIZE).fill().map(() => Array(SIZE).fill(0));
    totalScore = 0;
    addRandomTile();
    addRandomTile();
    drawGrid();

    // Soporte para teclado
    document.onkeydown = (e) => {
        const keyMap = { 'ArrowUp': 'up', 'ArrowDown': 'down', 'ArrowLeft': 'left', 'ArrowRight': 'right' };
        if (keyMap[e.key]) handleMove(keyMap[e.key]);
    };
}

function drawGrid() {
    const container = document.getElementById('grid-container');
    const scoreElement = document.getElementById('score');
    if (!container) return;

    container.innerHTML = '';
    scoreElement.innerText = totalScore;

    matrix.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.className = `celda ${value > 0 ? 'celda-' + value : ''}`;
            tile.innerText = value > 0 ? value : '';
            container.appendChild(tile);
        });
    });
}

function addRandomTile() {
    let empty = [];
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (matrix[r][c] === 0) empty.push({r, c});
        }
    }
    if (empty.length > 0) {
        let {r, c} = empty[Math.floor(Math.random() * empty.length)];
        matrix[r][c] = Math.random() > 0.1 ? 2 : 4;
    }
}

function handleMove(direction) {
    let oldMatrix = JSON.stringify(matrix);

    for (let i = 0; i < SIZE; i++) {
        let line = [];
        // Extraemos la fila o columna
        for (let j = 0; j < SIZE; j++) {
            if (direction === 'left' || direction === 'right') line.push(matrix[i][j]);
            else line.push(matrix[j][i]);
        }

        if (direction === 'right' || direction === 'down') line.reverse();
        
        // Procesamos la línea: [2, 0, 2, 4] -> [4, 4, 0, 0]
        let processed = slideAndMerge(line);
        
        if (direction === 'right' || direction === 'down') processed.reverse();

        // Devolvemos los valores a la matriz
        for (let j = 0; j < SIZE; j++) {
            if (direction === 'left' || direction === 'right') matrix[i][j] = processed[j];
            else matrix[j][i] = processed[j];
        }
    }

    if (oldMatrix !== JSON.stringify(matrix)) {
        addRandomTile();
        drawGrid();
    }
}

function slideAndMerge(line) {
    // 1. Quitar ceros
    let row = line.filter(num => num !== 0);
    // 2. Combinar iguales
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            totalScore += row[i];
            row.splice(i + 1, 1);
        }
    }
    // 3. Rellenar con ceros
    while (row.length < SIZE) row.push(0);
    return row;
}
