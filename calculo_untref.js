let tablero = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function cargarCalculo() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="juego-pantalla">
            <h2 style="color:var(--azul-untref)">Desafío 2048 UNTREF</h2>
            <p>Combina los números iguales para sumar puntos.</p>
            
            <div id="tablero-2048" class="grid-2048"></div>

            <div class="controles-2048">
                <button class="btn-flecha" onclick="mover('arriba')">↑</button>
                <div class="fila-flechas">
                    <button class="btn-flecha" onclick="mover('izquierda')">←</button>
                    <button class="btn-flecha" onclick="mover('derecha')">→</button>
                </div>
                <button class="btn-flecha" onclick="mover('abajo')">↓</button>
            </div>

            <button class="btn-volver" onclick="volverAlMenu()" style="margin-top:20px;">← Volver al Menú</button>
        </div>
    `;
    reiniciarJuego2048();
}

function reiniciarJuego2048() {
    tablero = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    agregarNumero();
    agregarNumero();
    dibujarTablero();
}

function dibujarTablero() {
    const contenedor = document.getElementById('tablero-2048');
    contenedor.innerHTML = '';
    tablero.forEach(fila => {
        fila.forEach(valor => {
            const celda = document.createElement('div');
            celda.className = `celda celda-${valor}`;
            celda.innerText = valor === 0 ? '' : valor;
            contenedor.appendChild(celda);
        });
    });
}

function agregarNumero() {
    let vacias = [];
    for(let f=0; f<4; f++) {
        for(let c=0; c<4; c++) {
            if(tablero[f][c] === 0) vacias.push({f, c});
        }
    }
    if(vacias.length > 0) {
        let {f, c} = vacias[Math.floor(Math.random() * vacias.length)];
        tablero[f][c] = Math.random() > 0.1 ? 2 : 4;
    }
}

// Lógica de movimiento simplificada
function mover(direccion) {
    let cambio = false;
    // Aquí iría la lógica matemática de sumar celdas (simplificado para el prototipo)
    // Para una versión funcional rápida, simulamos un movimiento aleatorio o desplazamiento
    console.log("Moviendo hacia: " + direccion);
    
    // Implementación básica de lógica 2048
    // (Por brevedad, agregamos un número nuevo para simular el avance del juego)
    agregarNumero();
    dibujarTablero();
}
