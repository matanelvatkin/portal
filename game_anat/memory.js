// const divElement = document.getElementById("d");  //לקחנו אלמנט מה html ושינינו אותו וזה משתקף בתצוגה כשנריץ
// divElement.innerText = "hello from js:"; //  שינוי הטקסט ב html ותצוגה למשתמש


// //  htmlעכשיו נראה מצב הפוך שאנחנו לוקחים אלמנט ונשים אותו ב 

// const newElement = document.createElement("p"); //מגדירים אלמנט מסוג דיב חדש
// newElement.innerText ="this is p from js"; // כותבים את הטקסט שאנחנו רוצים בתוך הדיב
// newElement.id = "moshe" // שינוי ה אי די שהיה

// divElement.appendChild(newElement) //יוצר ילד ל



/////////////////////////////////////////////////////////////////////////////////////////////
// משחק זיכרון:
// Declare an array object for our array of images
// let cards = [];
// cards.push('img-1.jpg');
// cards.push('img-2.jpg');
// cards.push('img-3.jpg');
// cards.push('img-4.jpg');
// cards.push('img-5.jpg');
// cards.push('img-6.jpg');
// cards.push('img-7.jpg');
// cards.push('img-8.jpg');

// Output arrayOfImages to the console


// let cards = [ 
//     {name:"img-1", img: "img-1.jpg"},
//     {name:"img-2", img: "img-2.jpg"},
//     {name:"img-3", img: "img-3.jpg"},
//     {name:"img-4", img: "img-4.jpg"},
//     {name:"img-5", img: "img-5.jpg"},
//     {name:"img-6", img: "img-6.jpg"},
//     {name:"img-7", img: "img-7.jpg"},
//     {name:"img-8", img: "img-8.jpg"},
    
// ];
// const cardDiv= document.createElement("div");
// // for (i in cards){
//     document.getElementById("memory").appendChild(cardDiv);
//     cardDiv.id = "a";
//     document.getElementById("a").style.backgroundImage ="animals/img-1.jpg";

// gameContainer.innerHTML += '
// <div class="card-container" data-card-value+"
// {cardValues[i].name}">
// <img src ="${cardValues[i].image}"
// </div>

// '

// let cards = ['a','b','c','d','e','f','g','h','a','b','c','d','e','f','g','h'];
// let cards = new Array();

// cards[0] = new Image();
// cards[0].src = 'img-1.jpg';

// cards[1] = new Image();
// cards[1].src = 'img-2.jpg';

// cards[2] = new Image();
// cards[2].src = 'img-3.jpg';


// function nextImage(element)
// {
//     var img = document.getElementById(element);

//     for(var i = 0;i<imgArray.length;i++)
//     {
//         if(imgArray[i] == img)
//         {
//             if(i == imgArray.length)
//             {
//                 var j = 0;
//                 document.getElementById(element).src = imgArray[j].src;
//                 break;
//             }
//             else
//             var j = i + 1;
//             document.getElementById(element).src = imgArray[j].src;
//             break;
//         }
//     }   
// }
let cards = ['a','b','c','d','a','b','c','d'];

function shufle(cards){
    for (cardIdx in cards){
        const rndIndx = Math.floor(Math.random() * cards.length)
        const temp = cards[cardIdx]; //ביצוע ההחלפה 
        cards[cardIdx]= cards[rndIndx];
        cards[rndIndx] = temp
        return cards
    }
}
//console.log(shufle(cards));
let firstCard= null;
let firstCardElement = null;

// function
// if this the first card
// tehn open the card()
// save the cards
// return
function cardClicked(e){
    if(firstCardElement == null){
        e.target.innerText = cards[e.target.id]
        firstCardElement = e.target
        firstCardElement.innerText = e.target.innerText
        return
    }
    e.target.innerText= cards[e.target.id]
    if(firstCardElement.innerText == e.target.innerText && e.target.id != firstCardElement.id){
        setTimeout(() => {alert ("yay!!!")} ,300)
        e.target.className =="win"
        firstCardElement.className="win"
        setTimeout(() => { e.target.innerText = " ";}, 1000)
        setTimeout(() => {firstCardElement.innerText = " ";
        firstCardElement.removeEventListener("click",cardClicked)
        e.target.removeEventListener("click",cardClicked)
        firstCardElement=null;}, 1000)
    }
    else{
        setTimeout(() => { e.target.innerText = " ";}, 1000)
        setTimeout(() => {firstCardElement.innerText = " ";
        firstCardElement = null;}, 1000);
    }  
}



function createCard(crd,idx){// לולאת 
    const cardElement = document.createElement("div");//new div with card calss
    // cardElement.innerText =crd;//ליצור אלמנט דיב חדש
    cardElement.id = idx//לשים בטקסט שלו את הערך
    cardElement.addEventListener("click",cardClicked)
    cardElement.className = "card"
    return cardElement;
}

//הפונקציה מערבבת את הקלפים ולתוך הפור יכנס הקלף 
function init(){ //מערבבת את הקלפים ונעשה פור על כל קלף ועל כל קלף נריץ את ה cretcard
    cards= shufle(cards);
    console.log(cards)
    const board = document.getElementById("board"); //מגדירים אלמנט מסוג דיב חדש
    for(idx in cards){
        board.appendChild(createCard(cards[idx],idx))
    }
}

init();

// function buildImage(url) {
//     var img = new Image();
//     img.onerror = function() {
//       console.log("could not load image on URL " + url);
//     };
//     img.src = url;
//     return img;
//   }