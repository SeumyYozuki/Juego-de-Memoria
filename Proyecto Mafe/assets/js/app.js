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
// Iniciar Juego
// =======================

function startGame() {    
    const selectlevel = document.getElementById('levelGame');
    const cardsContainer = document.getElementById('grid-cards');
    let levelGame = selectlevel.value;
    
    if (levelGame != ""){
        cardsContainer.innerHTML ="";
        changesImg(levelGame,cardsContainer);
    }
}

function changesImg(level, cardsContainer) {
    const arrayImg = ['Bayonetta.webp', 'Bowser.webp', 'Capitan Falcon.webp', 'Duck Hunt.webp', 'Fox.webp', 'Ivysaur.webp', 'Jigglypuff.webp', 'King Dedede.webp', 'Kirby.webp', 'Link.webp', 'Luigy.webp', 'Mega Man.webp', 'Mr. Game.webp', 'Pac-Man.webp', 'Pikachu.webp', 'Pit.webp', 'Ryu.webp', 'Samus.webp', 'Sonic.webp', 'Steve.webp'];
    let textElements= '';
    
    for (let i = 0; i < level; i++) {
        textElements +='<div class="item"><img onclick="validateSelectCard(this)" src="assets/images/' +arrayImg[i]+'" data-src="'+arrayImg[i]+'" alt=""></div>';;
    }
    cardsContainer.innerHTML = textElements;
}

