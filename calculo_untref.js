let matriz2048 = [];
let puntuacion2048 = 0;

function cargarCalculo() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="juego-pantalla fade-in" style="text-align: center;">
            <h2 class="titulo-centrado">Desafío 2048 UNTREF</h2>
            
            <div id="score-box" class="puntaje-2048">
                Puntos: 0
            </div>

            <p style="margin-bottom: 20px;">Usa las <b>flechas del teclado</b> para combinar los números.</p>

            <div class="contenedor-tablero">
                <div id="grid-2048" class="grid-container-2048"></div>
            </div>

            <button class="btn-nav" style="margin-top:30px; background:#e74c3c; color:white;" onclick="volverAlMenu()">
                ← VOLVER AL PORTAL
            </button>
        </div>
    `;
    inyectarEstilos2048();
    iniciarJuego2048();
    configurarTeclado2048();
}

function iniciarJuego2048() {
    matriz2048 = Array(4).fill().map(() => Array(4).fill(0));
    puntuacion2048 = 0;
    agregarNumeroNuevo();
    agregarNumeroNuevo();
    actualizarVista2048();
}

function agregarNumeroNuevo() {
    let vacios = [];
    for(let r=0; r<4; r++) {
        for(let c=0; c<4; c++) {
            if(matriz2048[r][c] === 0) vacios.push({r, c});
        }
    }
    if(vacios.length > 0) {
        let spot = vacios[Math.floor(Math.random() * vacios.length)];
        matriz2048[spot.r][spot.c] = Math.random() > 0.1 ? 2 : 4;
    }
}

function actualizarVista2048() {
    const grid = document.getElementById('grid-2048');
    grid.innerHTML = '';
    matriz2048.forEach(fila => {
        fila.forEach(valor => {
            let celda = document.createElement('div');
            celda.className = 'celda-2048';
            if(valor > 0) {
                celda.innerText = valor;
                celda.setAttribute('data-value', valor);
            }
            grid.appendChild(celda);
        });
    });
    document.getElementById('score-box').innerText = `Puntos: ${puntuacion2048}`;
}

function configurarTeclado2048() {
    document.onkeydown = (e) => {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
            e.preventDefault();
            mover2048(e.key);
        }
    };
}

function mover2048(direccion) {
    let anterior = JSON.stringify(matriz2048);
    if(direccion === 'ArrowLeft') slideIzquierda();
    if(direccion === 'ArrowRight') slideDerecha();
    if(direccion === 'ArrowUp') slideArriba();
    if(direccion === 'ArrowDown') slideAbajo();

    if(anterior !== JSON.stringify(matriz2048)) {
        agregarNumeroNuevo();
        actualizarVista2048();
    }
}

// Lógica de suma y movimiento
function slide(fila) {
    let arr = fila.filter(val => val);
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            arr[i] *= 2;
            puntuacion2048 += arr[i];
            arr[i + 1] = 0;
        }
    }
    arr = arr.filter(val => val);
    while (arr.length < 4) arr.push(0);
    return arr;
}

function slideIzquierda() { matriz2048 = matriz2048.map(fila => slide(fila)); }
function slideDerecha() { matriz2048 = matriz2048.map(fila => slide(fila.reverse()).reverse()); }
function slideArriba() {
    for (let c = 0; c < 4; c++) {
        let col = [matriz2048[0][c], matriz2048[1][c], matriz2048[2][c], matriz2048[3][c]];
        col = slide(col);
        for (let r = 0; r < 4; r++) matriz2048[r][c] = col[r];
    }
}
function slideAbajo() {
    for (let c = 0; c < 4; c++) {
        let col = [matriz2048[0][c], matriz2048[1][c], matriz2048[2][c], matriz2048[3][c]];
        col = slide(col.reverse()).reverse();
        for (let r = 0; r < 4; r++) matriz2048[r][c] = col[r];
    }
}

function inyectarEstilos2048() {
    if(document.getElementById('css-2048')) return;
    const s = document.createElement('style');
    s.id = 'css-2048';
    s.innerHTML = `
        .titulo-centrado { color: var(--azul-untref); text-align: center; margin-bottom: 10px; }
        .puntaje-2048 { background: var(--azul-untref); color: white; display: inline-block; padding: 10px 20px; border-radius: 5px; margin-bottom: 15px; font-weight: bold; }
        .contenedor-tablero { display: flex; justify-content: center; width: 100%; }
        .grid-container-2048 {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
            background: #8b7d70; padding: 10px; border-radius: 10px;
            width: 300px; height: 300px;
        }
        .celda-2048 {
            width: 65px; height: 65px; background: rgba(238, 228, 218, 0.35);
            border-radius: 5px; display: flex; align-items: center; justify-content: center;
            font-weight: bold; font-size: 1.4rem; color: #444; border: 1px solid rgba(0,0,0,0.1);
        }
        .celda-2048[data-value="2"] { background: #eee4da; color: #776e65; }
        .celda-2048[data-value="4"] { background: #ede0c8; color: #776e65; }
        .celda-2048[data-value="8"] { background: #f2b179; color: white; }
        .celda-2048[data-value="16"] { background: #f59563; color: white; }
        .celda-2048[data-value="32"] { background: #f67c5f; color: white; }
        .celda-2048[data-value="64"] { background: #f65e3b; color: white; }
        .celda-2048[data-value="128"] { background: #edcf72; color: white; font-size: 1.1rem; }
        .celda-2048[data-value="256"] { background: #edcc61; color: white; font-size: 1.1rem; }
    `;
    document.head.appendChild(s);
}
