// ... (mantiene las variables y nivelesAdmin anteriores) ...

function setupTecladoAdmin() {
    document.onkeydown = (e) => {
        // Bloqueamos scroll de flechas
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();

        if (e.key === "ArrowRight" && posicionActual < 2) {
            posicionActual++;
            renderizarEscenaAdmin();
        }
        if (e.key === "ArrowLeft" && posicionActual > 0) {
            posicionActual--;
            renderizarEscenaAdmin();
        }
        if (e.key === "Enter") {
            if (posicionActual === 0 && datoEnMemoria === null) {
                const val = document.getElementById('input-legajo').value;
                if (val) {
                    datoEnMemoria = parseInt(val);
                    lanzarEfectoDatos("zona-entrada");
                    renderizarEscenaAdmin();
                }
            } else if (posicionActual === 2) {
                validarSalida();
            }
        }
        if (e.key.toLowerCase() === "p" && posicionActual === 1 && datoEnMemoria !== null) {
            datoEnMemoria += 2;
            lanzarEfectoProceso(); // EFECTO VISUAL DE RAYO
            setTimeout(renderizarEscenaAdmin, 300); // Pequeña pausa para ver el efecto
        }
    };
}

// NUEVOS EFECTOS VISUALES
function lanzarEfectoProceso() {
    const procesador = document.getElementById('estacion-1');
    procesador.style.filter = "brightness(1.5) saturate(2)";
    procesador.style.transform = "scale(1.2) rotate(5deg)";
    
    const flash = document.createElement('div');
    flash.className = "rayo-proceso";
    procesador.appendChild(flash);
    
    setTimeout(() => {
        flash.remove();
        procesador.style.filter = "none";
        procesador.style.transform = "scale(1.1)";
    }, 300);
}

function lanzarEfectoDatos(idZona) {
    // Simula una pequeña explosión de bits
    console.log("Datos inyectados en:", idZona);
}

function inyectarEstilosAdminV2() {
    if (document.getElementById('admin-styles-v2')) return;
    const s = document.createElement('style');
    s.id = 'admin-styles-v2';
    s.innerHTML = `
        .camino-datos { display: flex; justify-content: space-around; margin: 40px 0; align-items: center; position: relative; }
        
        /* Efecto de Rayo de Procesamiento */
        .rayo-proceso {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 184, 212, 0.4);
            border-radius: 50%;
            animation: pulsoRayo 0.3s ease-out;
            pointer-events: none;
        }

        @keyframes pulsoRayo {
            0% { transform: scale(0.5); opacity: 1; box-shadow: 0 0 20px #00e5ff; }
            100% { transform: scale(2); opacity: 0; }
        }

        .estacion { padding: 10px; border-radius: 10px; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); opacity: 0.5; text-align: center; }
        .estacion.activa { opacity: 1; transform: scale(1.1); background: #e3f2fd; border: 2px solid var(--azul-untref); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        
        .buzon-box { width: 80px; height: 80px; background: white; border: 2px solid #999; margin-top: 10px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 1.5rem; transition: 0.3s; }
        .process-circle { border-radius: 50%; border-style: dashed; animation: rotarEngranaje 5s linear infinite; }
        
        @keyframes rotarEngranaje {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .legajo-viva { background: #fff176; padding: 10px; border: 1px solid #fbc02d; font-weight: bold; animation: aparecerLegajo 0.3s ease; }
        
        @keyframes aparecerLegajo {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        .consola-viva { background: #1a1a1a; color: #00ff00; padding: 15px; border-radius: 8px; font-family: 'Courier New', monospace; margin: 20px 0; border-left: 5px solid #00ff00; }
        .teclas-ayuda { font-size: 0.8rem; color: #666; background: #eee; padding: 5px; border-radius: 5px; }
    `;
    document.head.appendChild(s);
}
