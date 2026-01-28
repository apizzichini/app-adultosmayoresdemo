// Variables de control
let nivelActual = 0;
let datoEnMano = null;

// Niveles para el Serious Game (puedes añadir los 20 aquí)
const nivelesAdministrativo = [
    { n: 1, titulo: "Entrada Simple", mision: "Mueve el Legajo 8 a la Salida.", datoInicial: 8, objetivo: 8 },
    { n: 2, titulo: "Proceso Básico", mision: "Suma +2 al Legajo 8 para enviarlo.", datoInicial: 8, objetivo: 10 },
    { n: 3, titulo: "Dato Actualizado", mision: "Suma +2 al Legajo 5.", datoInicial: 5, objetivo: 7 }
];

// FUNCIÓN QUE LLAMA EL INDEX.HTML
function cargarAdministrativo() {
    nivelActual = 0;
    renderizarNivelAdmin();
}

function renderizarNivelAdmin() {
    const n = nivelesAdministrativo[nivelActual] || nivelesAdministrativo[0];
    const area = document.getElementById('contenedor-juego');
    
    area.innerHTML = `
        <div class="juego-pantalla">
            <h2 style="color:var(--azul-untref)">Nivel ${n.n}: ${n.titulo}</h2>
            <div class="mision-box" style="background:#e1f5fe; padding:15px; border-radius:10px; margin-bottom:15px;">
                <strong>Misión:</strong> ${n.mision}
            </div>
            <div style="display:flex; justify-content:space-around; align-items:center; margin:30px 0;">
                <div class="buzon" style="border:2px solid #ccc; width:80px; height:80px; display:flex; align-items:center; justify-content:center;">
                    <div id="legajo-doc" style="background:#fff176; padding:10px; border:1px solid #fbc02d; cursor:pointer;" onclick="adminAccion('tomar')">${n.datoInicial}</div>
                </div>
                <button onclick="adminAccion('procesar')" style="padding:10px; background:var(--azul-untref); color:white; border:none; border-radius:5px; cursor:pointer;">SUMAR +2</button>
                <div id="outbox" style="border:2px dashed #ccc; width:80px; height:80px;" onclick="adminAccion('soltar')"></div>
            </div>
            <div id="admin-consola" style="background:#333; color:#0f0; padding:10px; font-family:monospace; border-radius:5px;">Esperando acción...</div>
            <button class="btn-volver" onclick="volverAlMenu()" style="margin-top:20px;">← Volver al Menú</button>
        </div>
    `;
    datoEnMano = null;
}

function adminAccion(tipo) {
    const n = nivelesAdministrativo[nivelActual];
    const consola = document.getElementById('admin-consola');
    const doc = document.getElementById('legajo-doc');

    if (tipo === 'tomar') {
        datoEnMano = parseInt(doc.innerText);
        consola.innerText = "> Legajo " + datoEnMano + " en mano.";
    } else if (tipo === 'procesar' && datoEnMano !== null) {
        datoEnMano += 2;
        doc.innerText = datoEnMano;
        consola.innerText = "> Procesando... Nuevo valor: " + datoEnMano;
    } else if (tipo === 'soltar' && datoEnMano === n.objetivo) {
        document.getElementById('outbox').appendChild(doc);
        consola.innerText = "> ¡ÉXITO! Pasando al siguiente nivel...";
        setTimeout(() => {
            nivelActual++;
            if(nivelActual < nivelesAdministrativo.length) renderizarNivelAdmin();
            else alert("¡Felicidades! Completaste los niveles.");
        }, 1200);
    }
}
