function cargarMemoria() {
    const area = document.getElementById('contenedor-juego');
    area.innerHTML = `
        <div class="juego-pantalla">
            <h2 style="color:var(--azul-untref)">Memoria de Sedes</h2>
            <p>Encuentra los pares de las sedes de nuestra universidad.</p>
            <div style="display:grid; grid-template-columns: repeat(2, 80px); gap:10px; justify-content:center; margin:20px;">
                <div style="background:#ccc; height:80px; cursor:pointer" onclick="this.innerText='Sede Caseros'">?</div>
                <div style="background:#ccc; height:80px; cursor:pointer" onclick="this.innerText='Sede Lynch'">?</div>
                <div style="background:#ccc; height:80px; cursor:pointer" onclick="this.innerText='Sede Caseros'">?</div>
                <div style="background:#ccc; height:80px; cursor:pointer" onclick="this.innerText='Sede Lynch'">?</div>
            </div>
            <button class="btn-volver" onclick="volverAlMenu()">← Volver al Menú</button>
        </div>
    `;
}
