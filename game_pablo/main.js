// letters to be used in the cards
const cards = ["a", "a", "a", "a", "b", "b", "b", "b", "c", "c", "c", "c"];
// the score a player got by playing the game, taken from the portal's local storage 
let gameScore = Number(localStorage.getItem("gameNumber"));
let addScore = gameScore;
// alert(`current game score is ${gameScore}`);

// an element that adds the score to the board
let scoreHtml = document.querySelector(".footer h2");

// shuffle the letters in the array for the board
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

let firstCard = null,
    secondCard = null,
    count = 0;

// if the the two chosen cards are don't match, they become hidden 
function resetCards(){
  firstCard.classList.add("hidden");
  secondCard.classList.add("hidden");
  firstCard = null,
  secondCard = null;
  count = 0;
}

// what should happen when one or two cards are clicked 
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
        gameScore += Number(10);
        scoreHtml.innerText = `Game Score: ${gameScore}`;

      }
      else {
        setTimeout(resetCards, 1000);
      }
    }

  }
}

function portalClick(){
  addScore += gameScore;
  localStorage.setItem("gameNumber",addScore)
  window.location.href = "\\mainIndex.html";
}

// add the letters to the cards on the board
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

// start the game from scratch
function resetGame(cards){
  const cardStyles = Array.from(document.querySelector("#board").children);
  for(i in cardStyles){
      if(!(cardStyles[i].classList.contains("hidden")) && cardStyles[i].classList.contains("sameCard")){
        cardStyles[i].classList.add("hidden");
        cardStyles[i].classList.remove("sameCard");
      }
    }
    gameScore = Number(0);
    scoreHtml.innerText = `Game Score: ${gameScore}`;
}

// initialize the board 
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

