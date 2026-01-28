// ... (mantiene los nivelesAdministrativo anteriores) ...

function renderizarNivel() {
    const n = nivelesAdministrativo[nivelActual];
    const area = document.getElementById('contenedor-juego');
    
    // Cambiamos el color según el nivel (frío a cálido)
    const colorNivel = `hsl(${200 + (nivelActual * 5)}, 70%, 40%)`;

    area.innerHTML = `
        <div class="juego-pantalla">
            <div class="header-nivel">
                <span class="badge-nivel" style="background: ${colorNivel}">Nivel ${n.n} / 20</span>
                <h2 style="color:var(--azul-untref); margin: 5px 0;">${n.titulo}</h2>
            </div>
            
            <div class="mision-box" style="border-left-color: ${colorNivel}">
                <strong>📋 INSTRUCCIÓN:</strong> ${n.mision}
            </div>

            <div class="escena-administrativa">
                <div class="estacion">
                    <span class="tag">ENTRADA</span>
                    <div id="inbox" class="buzon">
                        <div id="legajo-doc" class="documento" onclick="adminAccion('tomar')">${n.datoInicial}</div>
                    </div>
                </div>

                <div class="estacion">
                    <span class="tag">PROCESO (+2)</span>
                    <div class="buzon-proceso" style="border-color: ${colorNivel}">
                        <button class="btn-operar" style="background: ${colorNivel}" onclick="adminAccion('procesar')">⚙️ EJECUTAR</button>
                    </div>
                </div>

                <div class="estacion">
                    <span class="tag">SALIDA</span>
                    <div id="outbox" class="buzon" onclick="adminAccion('soltar')"></div>
                </div>
            </div>

            <div id="admin-consola" class="consola">Esperando ingreso de datos...</div>
            
            <div style="margin-top:20px;">
                <button class="btn-volver" onclick="volverAlMenu()">← Menú Principal</button>
            </div>
        </div>
    `;
    
    datoEnMano = null;
    inyectarEstilosAdminExtra();
}

// NUEVA FUNCIÓN: Pantalla de Victoria Final
function mostrarVictoriaFinal() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="victoria-pantalla" style="text-align: center; padding: 50px; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <div style="font-size: 5rem;">🏆</div>
            <h1 style="color: var(--azul-untref); font-size: 2.5rem;">¡GRADUADO!</h1>
            <p style="font-size: 1.2rem; color: #555;">Has completado los 20 niveles de la carrera administrativa.</p>
            <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; margin: 20px 0; border: 2px solid var(--azul-untref);">
                <h3 style="margin:0;">Certificado Innovar UNTREF</h3>
                <p>Otorgado a: <b>Alumno UPAMI</b></p>
                <small>Por dominar la lógica de Entrada, Proceso y Salida.</small>
            </div>
            <button onclick="volverAlMenu()" style="padding: 15px 30px; background: var(--azul-untref); color: white; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; font-size: 1.1rem;">
                Volver al Portal
            </button>
        </div>
    `;
}

// Modificamos el final de la función siguienteNivel:
function siguienteNivel() {
    nivelActual++;
    if (nivelActual < nivelesAdministrativo.length) {
        renderizarNivel();
    } else {
        mostrarVictoriaFinal();
    }
}
