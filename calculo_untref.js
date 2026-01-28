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
            <p>Usa las flechas para combinar números iguales.</p>
            
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
    if (!contenedor) return;
    contenedor.innerHTML = '';
    tablero.forEach(fila => {
        fila.forEach(valor => {
            const celda = document.createElement('div');
            // Asigna clase según el valor para el color
            celda.className = `celda celda-${valor > 2048 ? 'super' : valor}`;
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

// Lógica de Movimiento Core
function mover(direccion) {
    let tableroAnterior = JSON.stringify(tablero);

    for (let i = 0; i < 4; i++) {
        let linea = [];
        if (direccion === 'izquierda' || direccion === 'derecha') {
            linea = [...tablero[i]];
            if (direccion === 'derecha') linea.reverse();
            linea = consolidar(linea);
            if (direccion === 'derecha') linea.reverse();
            tablero[i] = linea;
        } else {
            // Para arriba y abajo extraemos la columna como una fila temporal
            for (let j = 0; j < 4; j++) linea.push(tablero[j][i]);
            if (direccion === 'abajo') linea.reverse();
            linea = consolidar(linea);
            if (direccion === 'abajo') linea.reverse();
            for (let j = 0; j < 4; j++) tablero[j][i] = linea[j];
        }
    }

    // Si hubo cambios, agregamos número y redibujamos
    if (tableroAnterior !== JSON.stringify(tablero)) {
        agregarNumero();
        dibujarTablero();
        verificarFinDeJuego();
    }
}

function consolidar(linea) {
    // 1. Desplazar todo lo que no es cero hacia el inicio
    let nuevaLinea = linea.filter(v => v !== 0);
    // 2. Sumar iguales adyacentes
    for (let i = 0; i < nuevaLinea.length - 1; i++) {
        if (nuevaLinea[i] === nuevaLinea[i + 1]) {
            nuevaLinea[i] *= 2;
            nuevaLinea.splice(i + 1, 1);
        }
    }
    // 3. Rellenar con ceros hasta tener 4 elementos
    while (nuevaLinea.length < 4) nuevaLinea.push(0);
    return nuevaLinea;
}

function verificarFinDeJuego() {
    // Si no hay ceros, podrías agregar una lógica de "Perdiste", 
    // pero para UPAMI es mejor dejar que sigan intentando o reinicien.
}
