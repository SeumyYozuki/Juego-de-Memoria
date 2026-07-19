// ================================
// VARIABLES GLOBALES DEL JUEGO
// ================================

let primera = null;
let segunda = null;
let bloqueado = false;

let parejasEncontradas = 0;
let totalParejas = 0;

let tiempo = 0;
let intervalo = null;
let estado = "detenido"; 

const btnStart = document.getElementById("btn-start");
const cronometro = document.getElementById("tiempo");
const btnIniciar = document.getElementById("iniciar");
const btnPausar = document.getElementById("pausar");
const btnReiniciar = document.getElementById("reiniciar");

btnStart.addEventListener("click", startGame);

// ==========================================
// LÓGICA DEL JUEGO (MEMORAMA)
// ==========================================

function startGame(){    
    const selectlevel = document.getElementById('levelGame');
    const cardsContainer = document.getElementById('tablero');
   
    let levelGame = selectlevel.value;
    
    if(!levelGame || levelGame === "") {
        alert("Por favor, selecciona un nivel primero.");
        return;
    }

    let numParejas = parseInt(levelGame); 
    
    parejasEncontradas = 0; 
    totalParejas = numParejas; 
    
    detenerCronometro();
    tiempo = 0;
    actualizarCronometro();

    let contCards = "";
    let arrayImg = [
        'img_1.webp', 'img_2.webp', 'img_3.webp', 'img_4.webp', 'img_5.webp', 
        'img_6.webp', 'img_7.webp', 'img_8.webp', 'img_9.webp', 'img_10.webp', 
        'img_11.webp', 'img_12.webp', 'img_13.webp', 'img_14.webp', 'img_15.webp', 
        'img_16.webp', 'img_17.webp', 'img_18.webp', 'img_19.webp', 'img_20.webp'
    ];   

    arrayImg.sort(() => Math.random() - 0.5);
    
    let seleccion = arrayImg.slice(0, numParejas);
    
    let cartas = seleccion.concat(seleccion);

    cartas.sort(() => Math.random() - 0.5);

    for (let i = 0; i < numParejas * 2; i++) {
        contCards += crearCarta(cartas[i], i + 1);
    }

    cardsContainer.innerHTML = contCards;
}

function changesImg(img) {
    console.log(img.dataset.src);

    if(bloqueado) return;
    if(img === primera) return;

    if (!img.src.includes("Reverso.webp")) return;

    if(estado !== "corriendo"){
        iniciarCronometro();
    }

    let newUrl = "./assets/images/" + img.dataset.src;
    img.src = newUrl;
    console.log(newUrl);

    if (primera == null){
        primera = img;
        return;
    }

    segunda = img;
    
    comparar();    
}

function comparar(){
    if (primera.dataset.src === segunda.dataset.src) {
        parejasEncontradas++;
        
        primera = null;
        segunda = null;

        if (parejasEncontradas === totalParejas) {
            detenerCronometro();
            
            setTimeout(() => {
                finalizarPartida();
            }, 500);
        }
    } else { 
        bloqueado = true;
        setTimeout (() => {
            primera.src = "./assets/images/Reverso.webp";
            segunda.src = "./assets/images/Reverso.webp";

            primera = null;
            segunda = null;

            bloqueado = false;
        }, 1000)
    }
}

function finalizarPartida() {
    const nombreJugador = prompt("¡Felicidades! Has completado el tablero. Ingresa tu nombre para guardar tu récord en el Top 10:");
    
    if (nombreJugador && nombreJugador.trim() !== "") {
        const selectlevel = document.getElementById('levelGame');
        const textoNivel = selectlevel.options[selectlevel.selectedIndex].text;

        checkAndSaveScore(nombreJugador.trim(), tiempo, textoNivel);
    } else {
        alert("Partida terminada. Tu tiempo no fue registrado porque no ingresaste un nombre.");
    }
}

// ==========================================
// LÓGICA DEL CRONÓMETRO
// ==========================================

function actualizarCronometro() {
    let horas = Math.floor(tiempo / 3600);
    let minutes = Math.floor((tiempo % 3600) / 60);
    let segundos = tiempo % 60;

    let hh = horas.toString().padStart(2, "0");
    let mm = minutes.toString().padStart(2, "0");
    let ss = segundos.toString().padStart(2, "0");

    cronometro.textContent = `${hh}:${mm}:${ss}`;
}

function iniciarCronometro() {
    if (estado !== "corriendo") {
        estado = "corriendo";
        bloqueado = false; 

        intervalo = setInterval(() => {
            tiempo++;
            actualizarCronometro();
        }, 1000);
    }
    mostrarEstado();
}

function pausarCronometro() {
    if (estado === "corriendo") {
        clearInterval(intervalo);
        estado = "pausado";
        bloqueado = true; 
    }
    mostrarEstado();
}

function detenerCronometro() {
    clearInterval(intervalo);
    estado = "detenido";
    mostrarEstado();
}

function reiniciarCronometro() {
    detenerCronometro();
    tiempo = 0;
    actualizarCronometro();
    estado = "reiniciado";
    mostrarEstado();

    primera = null;
    segunda = null;
    bloqueado = false;
    
    startGame();
}

function mostrarEstado() {
    console.log("Estado actual: " + estado);
}

btnIniciar.addEventListener("click", iniciarCronometro);
btnPausar.addEventListener("click", pausarCronometro);
btnReiniciar.addEventListener("click", reiniciarCronometro);

actualizarCronometro();