function cargarAdministrativo() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="juego-pantalla">
            <h2 style="color:var(--azul-untref)">El Administrativo UNTREF</h2>
            <p>Instrucción: Toma el legajo de la entrada y llévalo a la salida.</p>
            
            <div style="display:flex; justify-content:center; gap:20px; margin:40px 0;">
                <div id="inbox" style="border:3px dashed #aaa; width:100px; height:100px; padding:10px;">
                    <div id="legajo" style="background:#ffcc00; padding:20px; border-radius:5px; font-weight:bold;">LEG. 8</div>
                </div>
                <div id="manos" style="border:3px solid var(--celeste-claro); width:100px; height:100px; padding:10px;"></div>
                <div id="outbox" style="border:3px dashed #aaa; width:100px; height:100px; padding:10px;"></div>
            </div>

            <button class="card-juego" style="width:auto; padding:15px;" onclick="cmdTomar()">1. TOMAR</button>
            <button class="card-juego" style="width:auto; padding:15px;" onclick="cmdSoltar()">2. SOLTAR</button>
            
            <br>
            <button class="btn-volver" onclick="volverAlMenu()">← Volver al Menú</button>
        </div>
    `;
}

let holding = false;
function cmdTomar() {
    if(!holding) {
        document.getElementById('manos').appendChild(document.getElementById('legajo'));
        holding = true;
    }
}
function cmdSoltar() {
    if(holding) {
        document.getElementById('outbox').appendChild(document.getElementById('legajo'));
        holding = false;
        alert("¡Excelente! Proceso completado.");
    }
}
