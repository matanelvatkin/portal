const cards = ["a", "a", "b", "b", "c", "c" ,"d" ,"d" ,"e" ,"e"]
let check = 0
let lastButtonCard
let buttonCard 
let player1 = 0
let player2 = 0
let players = [{player: "player1", grade:"0"},{layer: "player1", grade:"0"}]
let turn = true
let a = []



function shufel(cards){
    for (cardIdx in cards) {
        const rndIndx = Math.floor(Math.random() * cards.length)
        const tmp = cards[cardIdx]

        cards[cardIdx] = cards[rndIndx]
        cards[rndIndx] = tmp
    }
}

function createCard(crd, idx) {
    const cardElement = document.createElement("div")
    cardElement.id = idx
    cardElement.className = "card"
    cardElement.onclick=()=>{game(idx,crd)}
    return (cardElement)
}

shufel(cards)
console.log(cards)

function promo(optionBoard) {
    optionBoard.parentNode.removeChild(optionBoard);
    init()

}

function start() {

    const startBoard = document.getElementById("board")
    const optionBoard = document.createElement("div")
    startBoard.appendChild(optionBoard)
    // startBoard.innerText = "start"
    const textStart = document.createElement("h1")
    optionBoard.appendChild(textStart)
    // textStart.innerText = "memory game"
    // buttonStart.setAttribute('id','text')


    const buttonStart = document.createElement("button")
    optionBoard.appendChild(buttonStart)
    buttonStart.innerText = "START"
    buttonStart.setAttribute('id','button')
    // buttonStart.onclick=()=>{startBoard.parentNode.removeChild(startBoard);}
    buttonStart.onclick=()=>{promo(optionBoard)}





    // const board = document.getElementById("board")
    
    // const boardStart = document.createElement("board")
    // // board.appendChild(boardStart)

    // const buttonStart = document.createElement("button")
    // buttonStart.className = "button" 
    // buttonStart.innerText = "start"
    // boardStart.appendChild(buttonStart)
    // var sel = document.createElement("Select");
    // sel.setAttribute("id", "MySelect");
    // boardStart.appendChild(sel);
      
    // var opt = document.createElement("option");
    // opt.setAttribute("value", "opt1");
    // var nod = document.createTextNode("8 cards");
    // opt.appendChild(nod);
    // sel.appendChild(opt);

    // var opt2 = document.createElement("option");
    // opt2.setAttribute("value", "opt1");
    // var nod = document.createTextNode("10 cards");
    // opt2.appendChild(nod)
    // sel.appendChild(opt2)

    // var opt3 = document.createElement("option");
    // opt3.setAttribute("value", "opt2");
    // var nod = document.createTextNode("12 cards");
    // opt3.appendChild(nod);
    // sel.appendChild(opt3);

    // buttonStart.onclick=()=>{boardStart.removeAttribute}
    // buttonStart.onclick=()=>{promo(boardStart)}
       
}
start()

function init() {
    const board = document.getElementById("board")
    const gameBoard = document.createElement("div")
    board.appendChild(gameBoard)
    gameBoard.setAttribute('id','gameBoard')

    for (i in cards){
        let a = createCard(cards[i], i)
        gameBoard.appendChild(a)
    }
}
// init()
// promo()

function game(id,crd) {
    if (check === 0) {
        console.log("aaaaa")
        lastButtonCard = document.getElementById(id)
        lastButtonCard.innerText = crd
        if (a.includes(lastButtonCard.innerText)) {
            return(console.log("aaaaajjjj"))
        }
        check = 1
    }
    else {
        buttonCard = document.getElementById(id)
        buttonCard.innerText = crd
        if (buttonCard.id == lastButtonCard.id) {
            return
        }
        if (a.includes(buttonCard.innerText)) {
            return(console.log("aaaaajjjj"))
        }
        check = 0
        console.log("test")
        console.log(buttonCard.innerText)
        console.log(a)
        if (lastButtonCard.innerText == buttonCard.innerText && buttonCard.innerText != " ") {
            a.push(buttonCard.innerText)
            if (turn) {
                player1 += 10
            } else {
                player2 += 10
            }
            const g_player1 = document.createElement("div")
            gameBoard.appendChild(g_player1)
            g_player1.setAttribute('class','players')
            const g_player2 = document.createElement("div")
            gameBoard.appendChild(gameBoard)
            gameBoard.setAttribute('id','gameBoard')
            console.log("player1 =" ,lastButtonCard.id)
            console.log("player2 =" ,buttonCard)
            return(console.log(lastButtonCard.innerText , buttonCard.innerText))
        }
        // setTimeout(returnCards(), 55000);
        setTimeout(() => {
            returnCards()
        }, 1000);
    }
}

function returnCards() {
    console.log("qqqqqq")
    lastButtonCard.innerText = " "
    buttonCard.innerText = " "
    if (turn) {
        turn = false
    } else {
        turn = true
    }
}







