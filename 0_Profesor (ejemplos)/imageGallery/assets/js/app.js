function startCards() {
  const objSelect = document.getElementById('level-games');
  const objGridCards = document.getElementById('grid-cards');
  let selectValue = objSelect.value;

  if (selectValue != "") {
    //console.log(selectValue);
    objGridCards.innerHTML = "";
    createCards(selectValue, objGridCards);
    changesImgDefault(objGridCards);
  } else {
    alert("Debe seleccionar un nivel de juego");
    objGridCards.innerHTML = '<label class="viewLoad">Load.....</label>';
  }
}

function createCards(level, objGrid) {
  const arrayImg = ['img_1.png', 'img_2.png', 'img_3.png', 'img_4.png', 'img_5.png', 'img_6.png', 'img_7.png', 'img_8.png', 'img_9.png', 'img_10.png'];
  const getNewArray = shuffleArrayCard(arrayImg, (level / 2));
  let textElements = '';

  for (let i = 0; i < level; i++) {
    textElements += '<div class="item-grid"><img onclick="validateSelectCard(this)" src="assets/img/' + getNewArray[i] + '" data-src="' + getNewArray[i] + '" alt=""></div>';
  }
  objGrid.innerHTML = textElements;
}

function shuffleArrayCard(getArray, level) {
  //console.table(getArray);
  let newShuffle = getArray.sort(() => Math.random() - 0.5);
  let newArray = [];
  let mingle = [];

  for (let i = 0; i < level; i++) {
    newArray[i] = newShuffle[i];
  }
  mingle = [...newArray, ...newArray];
  // console.table(newShuffle);
  // console.table(mingle);
  return mingle;

}

function validateSelectCard(obj) {
  console.log(obj.dataset.src)
  obj.src="assets/img/"+obj.dataset.src;
}

function changesImgDefault(objContainerCards) {
  const elementsCards = objContainerCards.querySelectorAll('img');
  setTimeout(() => {
    alert("A Juagar..");
    elementsCards.forEach(item => {
      item.src = "assets/img/img_0.png";
    })

  }, 5000)
}

