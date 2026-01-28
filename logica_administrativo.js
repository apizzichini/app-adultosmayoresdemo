let nivelActualAdmin = 0;
let datoEnMemoria = null;
let posicionActual = 0; 

const nivelesAdmin = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    inicial: 10 + (i * 2),
    objetivo: 10 + (i * 2) + 2,
    titulo: `Sede UNTREF - Oficina ${i + 1}`,
    explicacion: `Misión: Ingresa el legajo ${10+(i*2)}, procésalo (+2) y entrégalo en Salida.`
}));

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
    
    area.innerHTML = `
        <div class="juego-pantalla fade-in">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="color:var(--azul-untref); margin:0;">${n.titulo}</h2>
                <span style="background:var(--azul-untref); color:white; padding:5px 15px; border-radius:20px;">${n.id} / 20</span>
            </div>
            <p style="background:#e3f2fd; padding:10px; border-radius:5px; margin:15px 0;">${n.explicacion}</p>

            <div style="display:flex; justify-content:space-around; align-items:flex-end; margin:40px 0;">
                <div class="estacion ${posicionActual===0?'activa':''}">
                    <small>ENTRADA</small>
                    <div class="slot">${datoEnMemoria === null ? `<input type="number" id="in-admin" value="${n.inicial}" style="width:50px; text-align:center; font-size:1.2rem;">` : `<div class="doc">${datoEnMemoria}</div>`}</div>
                </div>
                <div class="estacion ${posicionActual===1?'activa':''}">
                    <small>PROCESO</small>
                    <div class="slot circulo">⚙️</div>
                </div>
                <div class="estacion ${posicionActual===2?'activa':''}">
                    <small>SALIDA</small>
                    <div class="slot">🏢</div>
                </div>
            </div>

            <div class="consola-viva">> Flechas para mover | P para Procesar | Enter para Acción</div>
            <button class="btn-nav" style="margin-top:20px;" onclick="volverAlMenu()">← VOLVER AL PORTAL</button>
        </div>
    `;
    inyectarEstilosAdmin();
}

function setupTecladoAdmin() {
    document.onkeydown = (e) => {
        if(["ArrowLeft","ArrowRight","Enter"].includes(e.key)) e.preventDefault();
        if(e.key === "ArrowRight" && posicionActual < 2) { posicionActual++; renderizarEscenaAdmin(); }
        if(e.key === "ArrowLeft" && posicionActual > 0) { posicionActual--; renderizarEscenaAdmin(); }
        if(e.key === "Enter") {
            if(posicionActual === 0 && datoEnMemoria === null) {
                datoEnMemoria = parseInt(document.getElementById('in-admin').value);
                renderizarEscenaAdmin();
            } else if(posicionActual === 2) {
                validarNivel();
            }
        }
        if(e.key.toLowerCase() === "p" && posicionActual === 1 && datoEnMemoria !== null) {
            datoEnMemoria += 2;
            renderizarEscenaAdmin();
        }
    };
}

function validarNivel() {
    if(datoEnMemoria === nivelesAdmin[nivelActualAdmin].objetivo) {
        nivelActualAdmin++;
        if(nivelActualAdmin < 20) {
            alert("¡Correcto! Legajo validado.");
            datoEnMemoria = null; posicionActual = 0;
            renderizarEscenaAdmin();
        } else {
            pantallaVictoria();
        }
    } else {
        alert("El valor no es correcto. Revisa el proceso.");
    }
}

function pantallaVictoria() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="victoria-final fade-in" style="text-align:center; padding:40px;">
            <div id="confeti-box"></div>
            <h1 style="color:var(--azul-untref)">🏆 ¡GESTIÓN COMPLETADA!</h1>
            <p>Has finalizado los 20 niveles de capacitación digital.</p>
            <div style="border:4px double var(--azul-untref); padding:20px; background:white; margin:20px 0;">
                <h3>CERTIFICADO UPAMI - UNTREF</h3>
                <p>Otorgado al Alumno/a UPAMI por su agilidad lógica.</p>
                <small>Desarrollado por Agustin Pizzichini y Estefania Morreale</small>
            </div><br>
            <button class="btn-nav" onclick="volverAlMenu()">VOLVER AL INICIO</button>
        </div>
    `;
    // Aquí podrías llamar a una función de confeti simple si tienes el CSS
}

function inyectarEstilosAdmin() {
    if(document.getElementById('admin-css')) return;
    const s = document.createElement('style');
    s.id = 'admin-css';
    s.innerHTML = `
        .estacion { opacity: 0.3; transition: 0.3s; text-align:center; }
        .estacion.activa { opacity: 1; transform: scale(1.1); }
        .slot { width: 80px; height: 80px; background: white; border: 2px solid var(--azul-untref); display: flex; align-items:center; justify-content:center; border-radius: 8px; font-size: 1.5rem; }
        .doc { background: #fff176; padding: 10px; border: 1px solid #fbc02d; font-weight: bold; }
        .circulo { border-radius: 50%; border-style: dashed; animation: spin 4s linear infinite; }
        .consola-viva { background: #222; color: #0f0; padding: 12px; font-family: monospace; border-radius: 5px; font-size: 0.85rem; margin-top:20px;}
        @keyframes spin { from {transform:rotate(0deg)} to {transform:rotate(360deg)} }
    `;
    document.head.appendChild(s);
}
