// =======================
// Iniciar Juego
// =======================

// Boton Inicio

const btnStart = document.getElementById("btn-start");
btnStart.addEventListener("click", startGame);

// Logica del juego

let primera = null;
let segunda = null;
let bloqueado = false;

//Funciones

function startGame(){    
    const selectlevel = document.getElementById('levelGame');
    const cardsContainer = document.getElementById('tablero');
   
    let levelGame = selectlevel.value;
    let longCards = levelGame;
    const imgText = '<div class="items"><img src="assets/images/Reverso.webp" alt=""></div>' 
    let contCards = "";
    let arrayImg =['img_1.webp', 'img_2.webp', 'img_3.webp', 'img_4.webp', 'img_5.webp', 'img_6.webp', 'img_7.webp', 'img_8.webp', 'img_9.webp', 'img_10.webp', 'img_11.webp', 'img_12.webp', 'img_13.webp', 'img_14.webp', 'img_15.webp', 'img_16.webp', 'img_17.webp', 'img_18.webp', 'img_19.webp', 'img_20.webp',]   

    arrayImg.sort(() => Math.random()- 0.5);
    let seleccion = arrayImg.slice(0, levelGame);
    let cartas = seleccion.concat(seleccion);

    cartas.sort(() => Math.random() - 0.5);

    if(levelGame !=""){
        console.log(levelGame);

        for (let i=0; i < levelGame * 2; i++) {
            contCards += crearCarta(cartas[i], i+1);
        }

        cardsContainer.innerHTML = contCards;
    }
}

function changesImg(img) {
    console.log(img.dataset.src);

    if(bloqueado) return;
    if(img === primera) return;

    if(estado!== "corriendo" &&estado != "corriendo"){
        iniciarCronometro ();
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

function pausarCronometro() {
    if (estado === "corriendo") {
        clearInterval(intervalo);
        estado = "pausado";

        bloqueado = true; 
    }
    mostrarEstado();
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

function reiniciarCronometro() {
    detenerCronometro();
    tiempo = 0;
    actualizarCronometro();
    estado = "detenido";

    startGame(); 
    
    mostrarEstado();
}

function comparar(){
    if (primera.dataset.src === segunda.dataset.src) {
        primera = null;
        segunda = null;
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

    primera = null;
    segunda = null;
    bloqueado = false;
    startGame();
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





