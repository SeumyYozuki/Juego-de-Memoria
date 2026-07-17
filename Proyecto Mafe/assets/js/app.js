// =======================
// CRONÓMETRO
// =======================

let tiempo = 0;
let intervalo = null;
let estado = "detenido"; 

// Elementos del HTML
const cronometro = document.getElementById("tiempo");
const btnIniciar = document.getElementById("iniciar");
const btnPausar = document.getElementById("pausar");
const btnReiniciar = document.getElementById("reiniciar");

// Actualizar el cronómetro
function actualizarCronometro() {

    let horas = Math.floor(tiempo / 3600);
    let minutos = Math.floor((tiempo % 3600) / 60);
    let segundos = tiempo % 60;

    let hh = horas.toString().padStart(2, "0");
    let mm = minutos.toString().padStart(2, "0");
    let ss = segundos.toString().padStart(2, "0");

    cronometro.textContent = `${hh}:${mm}:${ss}`;
}

// Iniciar
function iniciarCronometro() {

    if (estado !== "corriendo") {

        estado = "corriendo";

        intervalo = setInterval(() => {

            tiempo++;

            actualizarCronometro();

        }, 1000);

    }

    mostrarEstado();
}

// Pausar
function pausarCronometro() {

    if (estado === "corriendo") {

        clearInterval(intervalo);

        estado = "pausado";

    }

    mostrarEstado();
}

// Detener
function detenerCronometro() {

    clearInterval(intervalo);

    estado = "detenido";

    mostrarEstado();
}

// Reiniciar
function reiniciarCronometro() {

    detenerCronometro();

    tiempo = 0;

    actualizarCronometro();

    estado = "reiniciado";

    mostrarEstado();
}

// Mostrar estado en consola
function mostrarEstado() {

    console.log("Estado actual: " + estado);

}

// Eventos de los botones
btnIniciar.addEventListener("click", iniciarCronometro);
btnPausar.addEventListener("click", pausarCronometro);
btnReiniciar.addEventListener("click", reiniciarCronometro);

// Mostrar 00:00:00 al abrir la página
actualizarCronometro();

// =======================
// TABLERO Y CARTAS
// =======================

const tablero= document.querySelector(".tablero");

for (let i = 0; i < 8; i++) {
    const carta = document.createElement("img");
    carta.src = "assets/images/Reverso.webp";
    tablero.appendChild(carta);
}



