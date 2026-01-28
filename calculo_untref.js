let matriz2048 = [];
let puntuacion2048 = 0;

function cargarCalculo() {
    const juegoArea = document.getElementById('contenedor-juego');
    juegoArea.classList.remove('oculto'); 
    
    juegoArea.innerHTML = `
        <div class="juego-pantalla fade-in" style="text-align:center; width:100%;">
            <h2 style="color:var(--azul-untref); text-align:center;">DESAFÍO 2048 UNTREF</h2>
            <div id="puntos-actuales" style="font-weight:bold; margin-bottom:10px; text-align:center;">Puntos: 0</div>
            
            <div style="display:flex; justify-content:center; margin:20px 0;">
                <div id="grid-2048" style="
                    display: grid; 
                    grid-template-columns: repeat(4, 70px); 
                    gap: 10px; 
                    background: #bbada0; 
                    padding: 10px; 
                    border-radius: 10px;
                    border: 5px solid #bbada0;
                "></div>
            </div>

            <p style="text-align:center;">Usa las <b>Flechas del Teclado</b> para combinar</p>
            <button class="btn-nav" onclick="volverAlMenu()" style="background:#e74c3c; color:white; margin-top:20px;">
                ← VOLVER AL PORTAL
            </button>
        </div>
    `;

    iniciarDatos2048();
    renderizarTablero();
    
    document.onkeydown = (e) => {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
            e.preventDefault();
            ejecutarMovimiento(e.key);
        }
    };
}

function iniciarDatos2048() {
    matriz2048 = Array(4).fill().map(() => Array(4).fill(0));
    puntuacion2048 = 0;
    ponerRandom();
    ponerRandom();
}

function ponerRandom() {
    let vacios = [];
    for(let r=0; r<4; r++) {
        for(let c=0; c<4; c++) {
            if(matriz2048[r][c] === 0) vacios.push({r, c});
        }
    }
    if(vacios.length > 0) {
        let {r, c} = vacios[Math.floor(Math.random()*vacios.length)];
        matriz2048[r][c] = Math.random() > 0.1 ? 2 : 4;
    }
}

function renderizarTablero() {
    const grid = document.getElementById('grid-2048');
    if(!grid) return;
    grid.innerHTML = '';
    
    for(let r=0; r<4; r++) {
        for(let c=0; c<4; c++) {
            let val = matriz2048[r][c];
            let div = document.createElement('div');
            div.style.cssText = `
                width: 70px; height: 70px; background: ${obtenerColor(val)}; 
                display: flex; align-items: center; justify-content: center; 
                font-weight: bold; font-size: 1.5rem; border-radius: 5px;
                color: ${val <= 4 ? "#776e65" : "white"};
            `;
            div.innerText = val > 0 ? val : '';
            grid.appendChild(div);
        }
    }
    document.getElementById('puntos-actuales').innerText = `Puntos: ${puntuacion2048}`;
}

function obtenerColor(v) {
    const colores = {
        0: "#cdc1b4", 2: "#eee4da", 4: "#ede0c8", 8: "#f2b179", 
        16: "#f59563", 32: "#f67c5f", 64: "#f65e3b", 128: "#edcf72", 256: "#edcc61"
    };
    return colores[v] || "#3c3a32";
}

// --- LÓGICA DE MOVIMIENTO INFALIBLE ---
function ejecutarMovimiento(dir) {
    let copiaString = JSON.stringify(matriz2048);
    
    if (dir === "ArrowLeft") {
        for (let r = 0; r < 4; r++) matriz2048[r] = operarFila(matriz2048[r]);
    } else if (dir === "ArrowRight") {
        for (let r = 0; r < 4; r++) matriz2048[r] = operarFila(matriz2048[r].reverse()).reverse();
    } else if (dir === "ArrowUp") {
        for (let c = 0; c < 4; c++) {
            let col = [matriz2048[0][c], matriz2048[1][c], matriz2048[2][c], matriz2048[3][c]];
            col = operarFila(col);
            for (let r = 0; r < 4; r++) matriz2048[r][c] = col[r];
        }
    } else if (dir === "ArrowDown") {
        for (let c = 0; c < 4; c++) {
            let col = [matriz2048[0][c], matriz2048[1][c], matriz2048[2][c], matriz2048[3][c]];
            col = operarFila(col.reverse()).reverse();
            for (let r = 0; r < 4; r++) matriz2048[r][c] = col[r];
        }
    }

    if (copiaString !== JSON.stringify(matriz2048)) {
        ponerRandom();
        renderizarTablero();
    }
}

function operarFila(fila) {
    // 1. Deslizar números (quitar ceros)
    let nuevaFila = fila.filter(num => num !== 0);
    // 2. Sumar iguales adyacentes
    for (let i = 0; i < nuevaFila.length - 1; i++) {
        if (nuevaFila[i] === nuevaFila[i+1]) {
            nuevaFila[i] *= 2;
            puntuacion2048 += nuevaFila[i];
            nuevaFila.splice(i + 1, 1);
        }
    }
    // 3. Rellenar con ceros al final
    while (nuevaFila.length < 4) nuevaFila.push(0);
    return nuevaFila;
}
