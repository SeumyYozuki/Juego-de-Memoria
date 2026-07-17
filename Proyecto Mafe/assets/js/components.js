export function crearcarta(imagen) {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.innerHTML = `
        <img class="cara frontal" src="${imagen}">
        <img class="cara trasera" src="assets/img/Reverso.webp">
    `;
    return carta;

}
    