document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA: MOSTRAR / OCULTAR (FADE) ---
    const btnToggleFade = document.getElementById('btn-toggle-fade');
    const fadeBox = document.getElementById('fade-box');

    btnToggleFade.addEventListener('click', () => {
        // .toggle quita la clase si existe, o la añade si no está.
        fadeBox.classList.toggle('is-hidden');
    });


    // --- 2. LÓGICA: MOVIMIENTO Y GIRO DE CARTA ---
    const btnMoveCard = document.getElementById('btn-move-card');
    const btnFlipCard = document.getElementById('btn-flip-card');
    const pokerCard = document.getElementById('poker-card');

    btnMoveCard.addEventListener('click', () => {
        pokerCard.classList.toggle('is-moved');
    });

    btnFlipCard.addEventListener('click', () => {
        pokerCard.classList.toggle('is-flipped');
    });


    // --- 3. LÓGICA: REBOTE (KEYFRAMES CONTROLADO) ---
    const btnBounce = document.getElementById('btn-bounce');
    const ball = document.getElementById('ball');

    btnBounce.addEventListener('click', () => {
        // Para repetir una animación de keyframe al hacer clic, debemos reiniciar la clase.
        ball.classList.remove('animate-bounce');
        
        // Un pequeño truco técnico: forzar un "reflow" en el DOM para que el navegador note el reinicio
        void ball.offsetWidth; 
        
        // Volvemos a añadir la clase de animación
        ball.classList.add('animate-bounce');
    });

    // Opcional: Remover la clase cuando la animación termine para limpiar el DOM
    ball.addEventListener('animationend', () => {
        ball.classList.remove('animate-bounce');
    });

});