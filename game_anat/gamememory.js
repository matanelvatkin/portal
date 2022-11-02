// let cards = ['a','b','c','d','a','b','c','d'];
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array
const items = [
    {name:"img-1", image: "img-1.jpg"},
    {name:"img-2", image: "img-2.jpg"},
    {name:"img-3", image: "img-3.jpg"},   
    {name:"img-4", image: "img-4.jpg"},
    {name:"img-5", image: "img-5.jpg"},
    {name:"img-6", image: "img-6.jpg"},
    {name:"img-7", image: "img-7.jpg"},
    {name:"img-8", image: "img-8.jpg"},
  ];

//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
// cards = [
//         {name:"img-1", img: "img-1.jpg"},
//         {name:"img-2", img: "img-2.jpg"},
//         {name:"img-3", img: "img-3.jpg"},
//         {name:"img-4", img: "img-4.jpg"},
//         {name:"img-5", img: "img-5.jpg"},
//         {name:"img-6", img: "img-6.jpg"},
//         {name:"img-7", img: "img-7.jpg"},
//         {name:"img-8", img: "img-8.jpg"},
//     ];




// function shufle(cards){
//     for (cardIdx in cards){
//         const rndIndx = Math.floor(Math.random() * cards.length)
//         const temp = cards[cardIdx]; //ביצוע ההחלפה 
//         cards[cardIdx]= cards[rndIndx];
//         cards[rndIndx] = temp
//         return cards
//     }
// }

// let firstCard= null;
// let firstCardElement = null;

// function cardClicked(e){
//     if(firstCardElement == null){
//         e.target.innerText = cards[e.target.id]
//         firstCardElement = e.target
//         firstCardElement.innerText = e.target.innerText
//         return
//     }
//     e.target.innerText= cards[e.target.id]
//     if(firstCardElement.innerText == e.target.innerText && e.target.id != firstCardElement.id){
//         setTimeout(() => {alert ("yay!!!")} ,300)
//         e.target.className =="win"
//         firstCardElement.className="win"
//         setTimeout(() => { e.target.innerText = " ";}, 1000)
//         setTimeout(() => {firstCardElement.innerText = " ";
//         firstCardElement.removeEventListener("click",cardClicked)
//         e.target.removeEventListener("click",cardClicked)
//         firstCardElement=null;}, 1000)
//     }
//     else{
//         setTimeout(() => { e.target.innerText = " ";}, 1000)
//         setTimeout(() => {firstCardElement.innerText = " ";
//         firstCardElement = null;}, 1000);
//     }  
// }

// function createCard(crd,idx){// לולאת 
//     const cardElement = document.createElement("div");//new div with card calss
//     // cardElement.innerText =crd;//ליצור אלמנט דיב חדש
//     cardElement.id = idx//לשים בטקסט שלו את הערך
//     cardElement.addEventListener("click",cardClicked)
//     cardElement.className = "card"
//     return cardElement;
// }

// //הפונקציה מערבבת את הקלפים ולתוך הפור יכנס הקלף 
// function init(){ //מערבבת את הקלפים ונעשה פור על כל קלף ועל כל קלף נריץ את ה cretcard
//     cards= shufle(cards);
//     console.log(cards)
//     const board = document.getElementById("board"); //מגדירים אלמנט מסוג דיב חדש
//     for(idx in cards){
//         board.appendChild(createCard(cards[idx],idx))
//     }
// }

// init();
