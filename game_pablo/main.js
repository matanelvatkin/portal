const cards = ["a", "a", "a", "a", "b", "b", "b", "b", "c", "c", "c", "c"];

function shuffleCards(arr) {
  for (i in arr) {
    randomInx = Math.floor(Math.random() * arr.length);
    const tmp = cards[i];
    arr[i] = arr[randomInx];
    arr[randomInx] = tmp;
  }
  return arr;
}
console.log(cards); //check
console.log(shuffleCards(cards)); //check



// const divElement = document.getElementById("d");
//       divElement.innerText = "hello from js";

// const newElement = document.createElement("p");
// newElement.innerText = "this is p from js";
// newElement.id = "moshe";

// divElement.appendChild(newElement);

let firstCard = null,
    secondCard = null,
    count = 0;

function resetCards(){
  firstCard.classList.add("hidden");
  secondCard.classList.add("hidden");
  firstCard = null,
  secondCard = null;
  count = 0;
}

function cardClicked(e){
  let clicked = null;
  if(e.target.matches('p')){
    clicked = e.target.parentElement;
  }
  else{
    clicked = e.target;
  }
  if(firstCard == null && !(clicked.classList.contains("sameCard")) && count < 1){
    firstCard = clicked;
    firstCard.classList.remove("hidden");
    count++;
  }
  else {
    if(firstCard.id != clicked.id && !(clicked.classList.contains("sameCard")) && count < 2){
      count++;
      secondCard = clicked;
      secondCard.classList.remove("hidden");
      if(secondCard.innerText == firstCard.innerText){
        firstCard.classList.add("sameCard");
        secondCard.classList.add("sameCard");
        firstCard = null;
        secondCard = null;
        count = 0;
      }
      else {
        setTimeout(resetCards, 1000);
      }
    }

  }
  // else {
  //   if(firstCard.id != e.target.id){
  //     secondCard = e.target;
  //     secondCard.classList.remove("hidden");

  //     if(firstCard == secondCard){
  //       console.log("they are equal");
        
  //    }
     
  //    else{
  //     firstCard.classList.add("hidden");
  //     secondCard.classList.add("hidden");
  //     firstCard = null; 
  //     secondCard = null;
  //   }

  //   }
  // }
}

function createCard(crd, idx) {
    const board = document.querySelector("#board");
    const cardDiv = document.createElement("div");
    const cardElement = document.createElement("p");
    cardDiv.append(cardElement);
    cardElement.innerText = crd;
    cardDiv.id = idx;
    cardDiv.className = "cardBox";
    cardDiv.classList.add("hidden");
    cardDiv.addEventListener("click", cardClicked);
    board.append(cardDiv);
    return cardElement;
    // new div with card class
}

function resetGame(cards){
  const cardStyles = Array.from(document.querySelector("#board").children);
  for(i in cardStyles){
      if(!(cardStyles[i].classList.contains("hidden")) && cardStyles[i].classList.contains("sameCard")){
        cardStyles[i].classList.add("hidden");
        cardStyles[i].classList.remove("sameCard");
      }
      // console.log(cardStyles[i]);
    }
  // const cardStyles = document.querySelector("#board").children;
  // for(i in cards){
  //   if(!(cardStyles[i].contains("hidden")) && cardStyles[i].contains("sameCard")){
  //     cardStyles[i].classList.add("hidden");
  //     cardStyles[i].classList.remove("sameCard");
  //   }
  //   else if(!(cardStyles[i].contains("hidden"))){
  //     cardStyles[i].classList.add("hidden");
  //   }
  // }
  // return true;
}


function init(){
    const buttonPush = document.querySelector("button");
    console.log(buttonPush);
    shuffleCards(cards);
    for(idx in cards){
        // cardElement create card
        createCard(cards[idx], idx);
    }
    // const buttonPush = document.querySelector("button");
    // buttonPush.addEventListener("click", resetGame(cards));
    buttonPush.addEventListener("click", resetGame);
}

init();

