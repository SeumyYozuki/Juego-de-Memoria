function crearCarta(imagen, id){

    return `
        <div class="items">
            <img 
                onclick="changesImg(this)"
                src="assets/images/Reverso.webp"
                data-src="${imagen}"
                id="img_${id}"
                alt="">
        </div>
    `;

}
    