let matriz2048 = [];
let puntuacion2048 = 0;

function cargarCalculo() {
    const juegoArea = document.getElementById('contenedor-juego');
    
    // Forzamos que el área se limpie y se vea
    juegoArea.classList.remove('oculto'); 
    
    juegoArea.innerHTML = `
        <div class="juego-container-viva fade-in" style="width:100%; text-align:center;">
            <h2 style="color:var(--azul-untref);">DESAFÍO 2048 UNTREF</h2>
            <div id="puntos-actuales" style="font-weight:bold; margin-bottom:10px;">Puntos: 0</div>
            
            <div id="tablero-wrapper" style="display:flex; justify-content:center; margin:20px 0;">
                <div id="grid-2048" style="
                    display: grid; 
                    grid-template-columns: repeat(4, 70px); 
                    grid-template-rows: repeat(4, 70px); 
                    gap: 10px; 
                    background: #bbada0; 
                    padding: 10px; 
                    border-radius: 10px;
                    border: 5px solid #bbada0;
                ">
                    </div>
            </div>

            <p>Usa las <b>Flechas del Teclado</b></p>
            <button class="btn-nav" onclick="volverAlMenu()" style="background:#e74c3c; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">
                ← VOLVER AL MENÚ
            </button>
        </div>
    `;

    inyectarEstilosCeldas();
    iniciarDatos2048();
    renderizarTablero();
    
    // Activar teclado
    document.onkeydown = (e) => {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
            e.preventDefault();
            manejarMovimiento(e.key);
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
            div.className = 'celda-viva';
            div.style.cssText = `
                width: 70px; height: 70px; background: #cdc1b4; 
                display: flex; align-items: center; justify-content: center; 
                font-weight: bold; font-size: 1.5rem; border-radius: 5px;
            `;
            if(val > 0) {
                div.innerText = val;
                div.style.background = obtenerColor(val);
                div.style.color = val <= 4 ? "#776e65" : "white";
            }
            grid.appendChild(div);
        }
    }
    document.getElementById('puntos-actuales').innerText = `Puntos: ${puntuacion2048}`;
}

function obtenerColor(v) {
    const colores = {
        2: "#eee4da", 4: "#ede0c8", 8: "#f2b179", 16: "#f59563",
        32: "#f67c5f", 64: "#f65e3b", 128: "#edcf72", 256: "#edcc61"
    };
    return colores[v] || "#3c3a32";
}

// Lógica de movimiento (simplificada para asegurar funcionamiento)
function manejarMovimiento(dir) {
    let original = JSON.stringify(matriz2048);
    // ... aquí iría la lógica de slide que ya tienes ...
    // Para probar que se vea, asegúrate de que esta función actualice:
    // renderizarTablero(); 
}

function inyectarEstilosCeldas() {
    if(document.getElementById('css-celdas')) return;
    const s = document.createElement('style');
    s.id = 'css-celdas';
    s.innerHTML = `.celda-viva { transition: all 0.1s ease; }`;
    document.head.appendChild(s);
}
