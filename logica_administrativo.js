// Variables de estado
let nivelActualAdmin = 0;
let datoEnMemoria = null;
let posicionActual = 0; 

const nivelesAdmin = [
    { id: 1, objetivo: 10, inicial: 8, titulo: "Sede Caseros", explicacion: "Ingresa el legajo 8, súmale 2 para llegar a 10." },
    { id: 2, objetivo: 15, inicial: 13, titulo: "Sede Lynch", explicacion: "Ingresa el legajo 13, súmale 2 para llegar a 15." }
];

// FUNCIÓN REQUERIDA POR EL INDEX
function cargarAdministrativo() {
    nivelActualAdmin = 0;
    datoEnMemoria = null;
    posicionActual = 0;
    renderizarEscenaAdmin();
    setupTecladoAdmin();
}

function renderizarEscenaAdmin() {
    const n = nivelesAdmin[nivelActualAdmin] || nivelesAdmin[0];
    const area = document.getElementById('contenedor-juego');
    
    area.innerHTML = `
        <div class="juego-pantalla">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="badge">Nivel ${n.id} / 20</span>
                <h3>${n.titulo}</h3>
            </div>
            <p class="instruccion">${n.explicacion}</p>

            <div class="camino-datos">
                <div id="estacion-0" class="estacion ${posicionActual === 0 ? 'activa' : ''}">
                    <span>ENTRADA</span>
                    <div class="buzon-box">
                        ${datoEnMemoria === null ? `<input type="number" id="input-legajo" value="${n.inicial}" style="width:50px;">` : `<div class="legajo-viva">${datoEnMemoria}</div>`}
                    </div>
                </div>

                <div id="estacion-1" class="estacion ${posicionActual === 1 ? 'activa' : ''}">
                    <span>PROCESO</span>
                    <div class="buzon-box process-circle">⚙️</div>
                </div>

                <div id="estacion-2" class="estacion ${posicionActual === 2 ? 'activa' : ''}">
                    <span>SALIDA</span>
                    <div class="buzon-box output-box">🏢</div>
                </div>
            </div>

            <div class="consola-viva">> Use Flechas para mover | P para Procesar | Enter para Acción</div>
            <button class="btn-volver" onclick="volverAlMenu()">← Salir</button>
        </div>
    `;
    inyectarEstilosV3();
}

function setupTecladoAdmin() {
    document.onkeydown = (e) => {
        if (e.key === "ArrowRight" && posicionActual < 2) { posicionActual++; renderizarEscenaAdmin(); }
        if (e.key === "ArrowLeft" && posicionActual > 0) { posicionActual--; renderizarEscenaAdmin(); }
        if (e.key === "Enter") {
            if (posicionActual === 0 && datoEnMemoria === null) {
                datoEnMemoria = parseInt(document.getElementById('input-legajo').value);
                renderizarEscenaAdmin();
            } else if (posicionActual === 2) {
                const n = nivelesAdmin[nivelActualAdmin];
                if(datoEnMemoria === n.objetivo) {
                    alert("✅ ¡Legajo validado!");
                    nivelActualAdmin++;
                    if(nivelActualAdmin < nivelesAdmin.length) cargarAdministrativo();
                    else alert("🎉 ¡GANASTE!");
                } else {
                    alert("❌ Error: Objetivo no alcanzado.");
                    cargarAdministrativo();
                }
            }
        }
        if (e.key.toLowerCase() === "p" && posicionActual === 1 && datoEnMemoria !== null) {
            datoEnMemoria += 2;
            lanzarDestello();
            renderizarEscenaAdmin();
        }
    };
}

function lanzarDestello() {
    // Efecto visual rápido
    const st1 = document.getElementById('estacion-1');
    if(st1) st1.style.boxShadow = "0 0 30px #00ff00";
}

function inyectarEstilosV3() {
    if (document.getElementById('v3-styles')) return;
    const s = document.createElement('style');
    s.id = 'v3-styles';
    s.innerHTML = `
        .camino-datos { display: flex; justify-content: center; gap: 20px; margin: 30px 0; }
        .estacion { padding: 15px; border: 2px solid transparent; border-radius: 10px; transition: 0.3s; opacity: 0.4; text-align:center; }
        .estacion.activa { opacity: 1; border-color: #2196F3; background: #e3f2fd; transform: scale(1.1); }
        .buzon-box { width: 70px; height: 70px; background: white; border: 1px solid #ccc; margin: 10px auto; display: flex; align-items:center; justify-content:center; }
        .legajo-viva { background: #ffeb3b; padding: 5px; font-weight: bold; }
        .consola-viva { background: #222; color: #0f0; padding: 10px; font-family: monospace; font-size: 0.8rem; margin: 20px 0; }
        .process-circle { border-radius: 50%; border-style: dashed; animation: rotar 4s linear infinite; }
        @keyframes rotar { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }
    `;
    document.head.appendChild(s);
}
