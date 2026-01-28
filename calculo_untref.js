// Variables globales del módulo
let squares = [];
let score = 0;
const width = 4;

function cargarCalculo() {
    const area = document.getElementById('contenedor-juego');
    // Reiniciamos variables
    squares = [];
    score = 0;

    area.innerHTML = `
        <div class="juego-pantalla">
            <h2 style="color:var(--azul-untref)">Desafío 2048 UNTREF</h2>
            <div style="font-size: 1.5rem; margin-bottom: 10px;">Puntos: <span id="score">0</span></div>
            
            <div id="grid" class="grid-2048"></div>

            <div class="controles-2048">
                <button class="btn-flecha" id="btn-up">↑</button>
                <div class="fila-flechas">
                    <button class="btn-flecha" id="btn-left">←</button>
                    <button class="btn-flecha" id="btn-right">→</button>
                </div>
                <button class="btn-flecha" id="btn-down">↓</button>
            </div>

            <button class="btn-volver" onclick="volverAlMenu()" style="margin-top:20px;">← Volver al Menú</button>
        </div>
    `;

    createBoard();
    setupControls();
}

function createBoard() {
    const gridDisplay = document.getElementById('grid');
    for (let i = 0; i < width * width; i++) {
        let square = document.createElement('div');
        square.classList.add('celda'); // Usamos la clase de tu CSS
        square.innerHTML = '';
        gridDisplay.appendChild(square);
        squares.push(square);
    }
    generate();
    generate();
}

function generate() {
    let emptySquares = squares.filter(s => s.innerHTML === '');
    if (emptySquares.length > 0) {
        let randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        let value = Math.random() > 0.1 ? 2 : 4;
        randomSquare.innerHTML = value;
        randomSquare.setAttribute('data-value', value);
        actualizarColores();
        checkGameOver();
    }
}

function move(direction) {
    let hasMoved = false;
    const scoreDisplay = document.getElementById('score');

    for (let i = 0; i < 4; i++) {
        let line = [];
        for (let j = 0; j < 4; j++) {
            let index = (direction === 'left' || direction === 'right') ? (i * 4 + j) : (j * 4 + i);
            line.push(parseInt(squares[index].innerHTML) || 0);
        }

        if (direction === 'right' || direction === 'down') line.reverse();

        let filteredLine = line.filter(num => num !== 0);
        for (let j = 0; j < filteredLine.length - 1; j++) {
            if (filteredLine[j] === filteredLine[j + 1]) {
                filteredLine[j] *= 2;
                score += filteredLine[j];
                if(scoreDisplay) scoreDisplay.innerHTML = score;
                filteredLine.splice(j + 1, 1);
            }
        }
        while (filteredLine.length < 4) filteredLine.push(0);
        if (direction === 'right' || direction === 'down') filteredLine.reverse();

        for (let j = 0; j < 4; j++) {
            let index = (direction === 'left' || direction === 'right') ? (i * 4 + j) : (j * 4 + i);
            let newVal = filteredLine[j] === 0 ? '' : filteredLine[j];
            if (squares[index].innerHTML != newVal.toString()) hasMoved = true;
            squares[index].innerHTML = newVal;
            squares[index].setAttribute('data-value', newVal);
        }
    }
    if (hasMoved) {
        generate();
        actualizarColores();
    }
}

// Vincula los botones y el teclado
function setupControls() {
    // Botones pantalla
    document.getElementById('btn-up').onclick = () => move('up');
    document.getElementById('btn-down').onclick = () => move('down');
    document.getElementById('btn-left').onclick = () => move('left');
    document.getElementById('btn-right').onclick = () => move('right');

    // Teclado
    document.onkeydown = (e) => {
        if (e.key === 'ArrowLeft') move('left');
        else if (e.key === 'ArrowRight') move('right');
        else if (e.key === 'ArrowUp') move('up');
        else if (e.key === 'ArrowDown') move('down');
    };
}

function actualizarColores() {
    squares.forEach(square => {
        let val = square.innerHTML;
        square.className = 'celda'; // Reset
        if (val) square.classList.add(`celda-${val}`);
    });
}

function checkGameOver() {
    let zeros = squares.filter(s => s.innerHTML === '').length;
    if (zeros === 0) {
        // Aquí podrías añadir una comprobación de si aún hay movimientos posibles
        // Por ahora, un alert sencillo para UPAMI
        alert('¡Tablero lleno! Inténtalo de nuevo.');
    }
}
