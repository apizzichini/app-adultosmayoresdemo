// --- VARIABLES DE ESTADO ---
let tablero2048 = [];
let puntaje2048 = 0;
const TAMANIO = 4;

function cargarCalculo() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="juego-pantalla">
            <h2 style="color:var(--azul-untref)">Desafío 2048 UNTREF</h2>
            <div style="font-size: 1.5rem; margin-bottom: 10px;">Puntos: <span id="score">0</span></div>
            
            <div id="grid" class="grid-2048"></div>

            <div class="controles-2048">
                <button class="btn-flecha" onclick="ejecutarMovimiento('up')">↑</button>
                <div class="fila-flechas">
                    <button class="btn-flecha" onclick="ejecutarMovimiento('left')">←</button>
                    <button class="btn-flecha" onclick="ejecutarMovimiento('right')">→</button>
                </div>
                <button class="btn-flecha" onclick="ejecutarMovimiento('down')">↓</button>
            </div>

            <button class="btn-volver" onclick="volverAlMenu()" style="margin-top:20px;">← Volver al Menú</button>
        </div>
    `;
    inicializarJuego();
}

function inicializarJuego() {
    // Crear matriz vacía de 4x4
    tablero2048 = Array(TAMANIO).fill().map(() => Array(TAMANIO).fill(0));
    puntaje2048 = 0;
    document.getElementById('score').innerText = "0";
    
    agregarNumeroAleatorio();
    agregarNumeroAleatorio();
    renderizarTablero();

    // Escuchar teclado
    document.onkeydown = (e) => {
        if (e.key === 'ArrowLeft') ejecutarMovimiento('left');
        if (e.key === 'ArrowRight') ejecutarMovimiento('right');
        if (e.key === 'ArrowUp') ejecutarMovimiento('up');
        if (e.key === 'ArrowDown') ejecutarMovimiento('down');
    };
}

function renderizarTablero() {
    const gridDisplay = document.getElementById('grid');
    gridDisplay.innerHTML = ''; // Limpiar visualmente
    
    for (let f = 0; f < TAMANIO; f++) {
        for (let c = 0; c < TAMANIO; c++) {
            let valor = tablero2048[f][c];
            let div = document.createElement('div');
            div.className = `celda ${valor > 0 ? 'celda-' + valor : ''}`;
            div.innerText = valor > 0 ? valor : '';
            gridDisplay.appendChild(div);
        }
    }
}

function agregarNumeroAleatorio() {
    let vacias = [];
    for (let f = 0; f < TAMANIO; f++) {
        for (let c = 0; c < TAMANIO; c++) {
            if (tablero2048[f][c] === 0) vacias.push({f, c});
        }
    }
    if (vacias.length > 0) {
        let spot = vacias[Math.floor(Math.random() * vacias.length)];
        tablero2048[spot.f][spot.c] = Math.random() > 0.1 ? 2 : 4;
    }
}

function ejecutarMovimiento(dir) {
    let antes = JSON.stringify(tablero2048);

    for (let i = 0; i < TAMANIO; i++) {
        let fila = [];
        // Extraer la línea según dirección
        for (let j = 0; j < TAMANIO; j++) {
            if (dir === 'left' || dir === 'right') fila.push(tablero2048[i][j]);
            else fila.push(tablero2048[j][i]);
        }

        if (dir === 'right' || dir === 'down') fila.reverse();
        
        // Lógica de deslizar y combinar
        let nuevaFila = fila.filter(val => val !== 0);
        for (let j = 0; j < nuevaFila.length - 1; j++) {
            if (nuevaFila[j] === nuevaFila[j+1]) {
                nuevaFila[j] *= 2;
                puntaje2048 += nuevaFila[j];
                nuevaFila.splice(j + 1, 1);
            }
        }
        while (nuevaFila.length < TAMANIO) nuevaFila.push(0);
        
        if (dir === 'right' || dir === 'down') nuevaFila.reverse();

        // Reinsertar en el tablero original
        for (let j = 0; j < TAMANIO; j++) {
            if (dir === 'left' || dir === 'right') tablero2048[i][j] = nuevaFila[j];
            else tablero2048[j][i] = nuevaFila[j];
        }
    }

    if (antes !== JSON.stringify(tablero2048)) {
        document.getElementById('score').innerText = puntaje2048;
        agregarNumeroAleatorio();
        renderizarTablero();
        chequearPerdio();
    }
}

function chequearPerdio() {
    let hayEspacio = tablero2048.flat().includes(0);
    if (!hayEspacio) {
        alert("¡Tablero lleno! El juego se reiniciará.");
        inicializarJuego();
    }
}
