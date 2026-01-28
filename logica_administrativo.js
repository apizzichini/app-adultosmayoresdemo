let nivelActualAdmin = 0;
let datoEnMemoria = null;
let posicionActual = 0; 

const nivelesAdmin = [
    { id: 1, objetivo: 10, inicial: 8, titulo: "Sede Caseros", explicacion: "Ingresa el legajo 8, súmale 2 para llegar a 10." },
    { id: 2, objetivo: 15, inicial: 13, titulo: "Sede Lynch", explicacion: "Ingresa el legajo 13, súmale 2 para llegar a 15." },
    { id: 3, objetivo: 22, inicial: 20, titulo: "Rectorado", explicacion: "Ingresa el legajo 20, súmale 2 para llegar a 22." }
    // Puedes seguir agregando hasta 20 niveles aquí
];

// FUNCIÓN DE CARGA QUE LLAMA EL INDEX
function cargarAdministrativo() {
    nivelActualAdmin = 0;
    datoEnMemoria = null;
    posicionActual = 0;
    renderizarEscenaAdmin();
    setupTecladoAdmin();
}

function renderizarEscenaAdmin() {
    const n = nivelesAdmin[nivelActualAdmin];
    const area = document.getElementById('contenedor-juego');
    if(!area) return;

    area.innerHTML = `
        <div class="juego-pantalla">
            <div class="header-admin">
                <span class="badge">Nivel ${n.id} / ${nivelesAdmin.length}</span>
                <h3>${n.titulo}</h3>
            </div>
            <p class="instruccion"><b>Misión:</b> ${n.explicacion}</p>

            <div class="camino-datos">
                <div id="estacion-0" class="estacion ${posicionActual === 0 ? 'activa' : ''}">
                    <span class="label">1. ENTRADA</span>
                    <div class="buzon-box">
                        ${datoEnMemoria === null ? `<input type="number" id="input-legajo" value="${n.inicial}" style="width:50px; font-size:1.2rem; text-align:center;">` : `<div class="legajo-viva">${datoEnMemoria}</div>`}
                    </div>
                </div>

                <div id="estacion-1" class="estacion ${posicionActual === 1 ? 'activa' : ''}">
                    <span class="label">2. PROCESO</span>
                    <div class="buzon-box process-circle">⚙️</div>
                </div>

                <div id="estacion-2" class="estacion ${posicionActual === 2 ? 'activa' : ''}">
                    <span class="label">3. SALIDA</span>
                    <div class="buzon-box output-box">🏢</div>
                </div>
            </div>

            <div class="consola-viva">> ${obtenerMensajeGuia()}</div>
            
            <div class="ayuda-teclado">
                <span>⬅️➡️ Mover</span> | <span>P: Procesar</span> | <span>Enter: Acción</span>
            </div>

            <button class="btn-volver" onclick="volverAlMenu()" style="margin-top:20px;">← Salir al Menú</button>
        </div>
    `;
    inyectarEstilosFinales();
}

function obtenerMensajeGuia() {
    if (datoEnMemoria === null) return "Escribe el legajo y pulsa ENTER en la Entrada";
    if (posicionActual === 1) return "Pulsa 'P' para transformar el dato (+2)";
    if (posicionActual === 2) return "Pulsa ENTER para validar con Dirección";
    return "Muévete con las flechas ⬅️ ➡️";
}

function setupTecladoAdmin() {
    document.onkeydown = (e) => {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();

        if (e.key === "ArrowRight" && posicionActual < 2) { posicionActual++; renderizarEscenaAdmin(); }
        if (e.key === "ArrowLeft" && posicionActual > 0) { posicionActual--; renderizarEscenaAdmin(); }
        
        if (e.key === "Enter") {
            if (posicionActual === 0 && datoEnMemoria === null) {
                const val = document.getElementById('input-legajo').value;
                if(val) { datoEnMemoria = parseInt(val); renderizarEscenaAdmin(); }
            } else if (posicionActual === 2) {
                verificarVictoria();
            }
        }
        
        if (e.key.toLowerCase() === "p" && posicionActual === 1 && datoEnMemoria !== null) {
            datoEnMemoria += 2;
            lanzarEfectoBlitz();
            renderizarEscenaAdmin();
        }
    };
}

function lanzarEfectoBlitz() {
    const st = document.getElementById('estacion-1');
    if(st) {
        st.classList.add('blitz-anim');
        setTimeout(() => st.classList.remove('blitz-anim'), 400);
    }
}

function verificarVictoria() {
    const n = nivelesAdmin[nivelActualAdmin];
    if (datoEnMemoria === n.objetivo) {
        nivelActualAdmin++;
        if (nivelActualAdmin < nivelesAdmin.length) {
            alert("✅ ¡Legajo correcto! Pasando a la siguiente sede...");
            cargarAdministrativo();
        } else {
            pantallaVictoriaFinal();
        }
    } else {
        alert("❌ Error en el proceso. El valor final no es correcto. Reiniciando nivel...");
        cargarAdministrativo();
    }
}

function pantallaVictoriaFinal() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="victoria-final">
            <div class="confeti-container" id="confeti"></div>
            <h1 class="titulo-ganador">🏆 ¡EXCELENTE GESTIÓN!</h1>
            <p>Has completado el ciclo de datos de Innovar UNTREF</p>
            <div class="diploma">
                <p>Certificado de Aptitud Tecnológica</p>
                <hr>
                <h2>ALUMNO UPAMI</h2>
            </div>
            <button class="btn-volver" onclick="volverAlMenu()">VOLVER AL PORTAL</button>
        </div>
    `;
    crearConfeti();
}

function crearConfeti() {
    const container = document.getElementById('confeti');
    for (let i = 0; i < 50; i++) {
        const c = document.createElement('div');
        c.className = 'confeti-piece';
        c.style.left = Math.random() * 100 + '%';
        c.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        c.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(c);
    }
}

function inyectarEstilosFinales() {
    if (document.getElementById('styles-admin-final')) return;
    const s = document.createElement('style');
    s.id = 'styles-admin-final';
    s.innerHTML = `
        .camino-datos { display: flex; justify-content: center; gap: 30px; margin: 40px 0; align-items: flex-end; }
        .estacion { padding: 15px; border-radius: 12px; transition: 0.4s; opacity: 0.3; text-align: center; border: 2px solid transparent; }
        .estacion.activa { opacity: 1; transform: scale(1.15); background: #e3f2fd; border-color: #2196F3; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .buzon-box { width: 80px; height: 80px; background: white; border: 2px solid #ccc; margin: 10px auto; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 1.5rem; }
        .process-circle { border-radius: 50%; border-style: dashed; animation: girar 5s linear infinite; }
        @keyframes girar { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .blitz-anim { animation: blitz 0.4s ease-out; }
        @keyframes blitz { 0% { box-shadow: 0 0 0px #00e5ff; } 50% { box-shadow: 0 0 40px #00e5ff; } 100% { box-shadow: 0 0 0px #00e5ff; } }
        .legajo-viva { background: #ffeb3b; padding: 10px; border: 2px solid #fbc02d; font-weight: bold; transform: rotate(-2deg); }
        .consola-viva { background: #1a1a1a; color: #00ff00; padding: 15px; font-family: 'Courier New', monospace; border-radius: 8px; margin: 20px 0; border-left: 5px solid #00ff00; }
        .victoria-final { position: relative; overflow: hidden; padding: 40px; text-align: center; animation: fadeUp 0.8s ease; }
        .confeti-piece { position: absolute; width: 10px; height: 10px; top: -10px; animation: caer 3s linear infinite; }
        @keyframes caer { to { transform: translateY(600px) rotate(360deg); } }
        .diploma { border: 4px double var(--azul-untref); padding: 20px; background: #fff9c4; margin: 20px auto; max-width: 300px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(s);
}
