// --- VARIABLES GLOBALES DEL MÓDULO ---
let matrix = [];
let totalScore = 0;
const SIZE = 4;

/**
 * Función principal que carga la interfaz del juego
 */
function cargarCalculo() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="juego-pantalla">
            <h2 style="color:var(--azul-untref)">Desafío 2048 UNTREF</h2>
            <div style="font-size: 1.5rem; margin-bottom: 10px; font-weight: bold;">
                Puntos: <span id="score">0</span>
            </div>
            
            <div id="grid-container" class="grid-2048"></div>

            <div class="controles-2048">
                <button class="btn-flecha" id="btn-up">↑</button>
                <div class="fila-flechas">
                    <button class="btn-flecha" id="btn-left">←</button>
                    <button class="btn-flecha" id="btn-right">→</button>
                </div>
                <button class="btn-flecha" id="btn-down">↓</button>
            </div>

            <div style="margin-top:20px;">
                <button onclick="init2048()" style="padding:10px 20px; background:#666; color:white; border:none; border-radius:5px; cursor:pointer;">Reiniciar Juego</button>
                <button class="btn-volver" onclick="volverAlMenu()">← Volver al Menú</button>
            </div>
        </div>
    `;
    
    init2048();
    bloquearScroll();
}

/**
 * Inicializa la matriz y los eventos
 */
function init2048() {
    // 1. Crear matriz lógica de ceros
    matrix = Array(SIZE).fill().map(() => Array(SIZE).fill(0));
    totalScore = 0;

    // 2. Agregar dos números iniciales
    addRandomTile();
    addRandomTile();
    
    // 3. Dibujar en pantalla
    drawGrid();

    // 4. Configurar Controles (Teclado y Botones)
    setupEventListeners();
}

function drawGrid() {
    const container = document.getElementById('grid-container');
    const scoreElement = document.getElementById('score');
    if (!container) return;

    container.innerHTML = ''; // Limpiar tablero previo
    scoreElement.innerText = totalScore;

    matrix.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            // La clase dinámica celda-2, celda-4, etc. aplica los colores del CSS
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

/**
 * Lógica de Movimiento Principal
 */
function handleMove(direction) {
    let oldMatrix = JSON.stringify(matrix);

    for (let i = 0; i < SIZE; i++) {
        let line = [];
        // Extraer línea (fila o columna) según dirección
        for (let j = 0; j < SIZE; j++) {
            if (direction === 'left' || direction === 'right') {
                line.push(matrix[i][j]);
            } else {
                line.push(matrix[j][i]);
            }
        }

        // Invertir si es derecha o abajo para procesar siempre hacia adelante
        if (direction === 'right' || direction === 'down') line.reverse();
        
        // Procesar deslizamiento y combinación
        let processed = slideAndMerge(line);
        
        if (direction === 'right' || direction === 'down') processed.reverse();

        // Guardar cambios en la matriz original
        for (let j = 0; j < SIZE; j++) {
            if (direction === 'left' || direction === 'right') {
                matrix[i][j] = processed[j];
            } else {
                matrix[j][i] = processed[j];
            }
        }
    }

    // Solo si el tablero cambió, agregamos número y redibujamos
    if (oldMatrix !== JSON.stringify(matrix)) {
        addRandomTile();
        drawGrid();
        checkGameOver();
    }
}

function slideAndMerge(line) {
    // 1. Quitar los ceros [2, 0, 2, 0] -> [2, 2]
    let row = line.filter(num => num !== 0);
    // 2. Sumar iguales adyacentes [2, 2] -> [4]
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            totalScore += row[i];
            row.splice(i + 1, 1);
        }
    }
    // 3. Rellenar con ceros hasta completar el tamaño [4] -> [4, 0, 0, 0]
    while (row.length < SIZE) row.push(0);
    return row;
}

function setupEventListeners() {
    // Botones físicos en pantalla
    document.getElementById('btn-up').onclick = () => handleMove('up');
    document.getElementById('btn-down').onclick = () => handleMove('down');
    document.getElementById('btn-left').onclick = () => handleMove('left');
    document.getElementById('btn-right').onclick = () => handleMove('right');

    // Teclado
    document.onkeydown = (e) => {
        const keyMap = { 
            'ArrowUp': 'up', 
            'ArrowDown': 'down', 
            'ArrowLeft': 'left', 
            'ArrowRight': 'right' 
        };
        if (keyMap[e.key]) {
            handleMove(keyMap[e.key]);
        }
    };
}

/**
 * Bloquea el scroll de la página al usar las flechas del teclado
 */
function bloquearScroll() {
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
}

function checkGameOver() {
    let hasEmpty = matrix.flat().includes(0);
    if (!hasEmpty) {
        // Podrías agregar una lógica más compleja aquí, 
        // pero para UPAMI un aviso de tablero lleno es suficiente.
        alert("¡Tablero lleno! Buen intento.");
    }
}
