const Allcards = [{src:'card\\boston.svg', class:"boston",},{src:'card\\boston.svg', class:"boston",}
,{src:'card\\chicago.svg',class:"chicago"},{src:'card\\chicago.svg',class:"chicago",}
,{class:"golden",src:"card\\golden.svg"},{class:"golden",src:"card\\golden.svg",}
,{class:"atlnta",src:"card\\atlnta.svg",},{class:"atlnta",src:"card\\atlnta.svg",}
,{class:"brooklin",src:"card\\brooklin.svg",},{class:"brooklin",src:"card\\brooklin.svg",}
,{class:"buks",src:"card\\buks.svg",},{class:"buks",src:"card\\buks.svg",}
,{class:"cabs",src:"card\\cabs.svg",},{class:"cabs",src:"card\\cabs.svg",}
,{class:"charlote",src:"card\\charlote.svg",},{class:"charlote",src:"card\\charlote.svg",}
,{class:"detroit",src:"card\\detroit.svg",},{class:"detroit",src:"card\\detroit.svg",}
,{class:"denver",src:"card\\denver.svg",},{class:"denver",src:"card\\denver.svg",}
,{class:"indiana",src:"card\\indiana.svg",},{class:"indiana",src:"card\\indiana.svg",}
,{class:"kings",src:"card\\kings.svg",},{class:"kings",src:"card\\kings.svg",}
,{class:"knicks",src:"card\\knicks.svg",},{class:"knicks",src:"card\\knicks.svg",}
,{class:"lac",src:"card\\lac.svg",},{class:"lac",src:"card\\lac.svg",}
,{class:"lal",src:"card\\lal.svg",},{class:"lal",src:"card\\lal.svg",}
,{class:"memphis",src:"card\\memphis.svg",},{class:"memphis",src:"card\\memphis.svg",}
,{class:"miami",src:"card\\miami.svg",},{class:"miami",src:"card\\miami.svg",}
,{class:"mini",src:"card\\mini.svg",},{class:"mini",src:"card\\mini.svg",}
,{class:"okc",src:"card\\okc.svg",},{class:"okc",src:"card\\okc.svg",}
,{class:"orlando",src:"card\\orlando.svg",},{class:"orlando",src:"card\\orlando.svg",}
,{class:"pelicens",src:"card\\pelicens.svg",},{class:"pelicens",src:"card\\pelicens.svg",}
,{class:"phili",src:"card\\phili.svg",},{class:"phili",src:"card\\phili.svg",}
,{class:"phs",src:"card\\phs.svg",},{class:"phs",src:"card\\phs.svg",}
,{class:"portlend",src:"card\\portlend.svg",},{class:"portlend",src:"card\\portlend.svg",}
,{class:"dallas",src:"card\\dallas.svg",},{class:"dallas",src:"card\\dallas.svg",}
,{class:"san-antonio",src:"card\\san-antonio.svg",},{class:"san-antonio",src:"card\\san-antonio.svg",}
,{class:"toronto",src:"card\\toronto.svg",},{class:"toronto",src:"card\\toronto.svg",}
,{class:"utah",src:"card\\utah.svg",},{class:"utah",src:"card\\utah.svg",}
,{class:"wizards",src:"card\\wizards.svg",},{class:"wizards",src:"card\\wizards.svg",}
,{class:"hoston",src:"card\\hoston.svg",},{class:"hoston",src:"card\\hoston.svg",}];
let cards=[];
const board=document.getElementById("board");
const eTime = document.getElementById("time");
const record = document.getElementById("record");
const users =[];
const gameNumber = localStorage.getItem("gameNumber");
let extract = JSON.parse(localStorage.getItem("users"))

const getUsers = ()=>{
    if(gameNumber==0){
        extract.forEach((v)=>{
            users.push(JSON.parse(v))
            console.log(users);
        
        }); 
    }
    else{
        extract.forEach((v)=>{
            users.push(v);
            console.log(users);
        
        }); 
    }
}

let firstCard = null,timer,victory=0 ,scores = 0,clicker = 0 ,addScore = 1;

function shaffle(){
    let max = cards.length;
    let temp,ran,ran2;
    for(let i =0 ;i<cards.length * 2;i++){
        ran = Math.floor((Math.random()*max));
        ran2 = Math.floor((Math.random()*max));
        temp = cards[ran];
        cards[ran]= cards[ran2];
        cards[ran2]=temp;
    }
}

function creatCard(inx){
    const card = document.createElement("div");
    const face = document.createElement("Img");
    const back = document.createElement("Img");
    card.id= inx;
    card.classList = "card";
    card.setAttribute("name",cards[inx].class);
    face.classList= "face";
    back.classList = "back";
    back.src = "card\\logo-nba.svg";
    face.src = cards[inx].src;
    face.classList.toggle("toggleCard")
    card.appendChild(face);
    card.appendChild(back);
    card.addEventListener("click",(e)=>{
        clicker++;
        if((cards.length === 60 && timer === 120)||(cards.length === 40 && timer === 90)||(cards.length === 20 && timer === 60)||(cards.length === 12 && timer === 30)){
            time();
        }
        if(timer>0.1 && victory != cards.length){
            card.classList.toggle("toggleCard");
            card.classList.add("flip");
            const flip = document.querySelectorAll(".flip")
            if(flip.length === 2){
                
                if(flip[0].getAttribute("name") === flip[1].getAttribute("name")){
                    flip.forEach((card)=>{
                        victory++;
                        scores+=addScore;
                        document.getElementById("score").innerText = scores
                        card.classList.remove("flip");
                        card.style.pointerEvents = "none";
                    })
                }
                else{
                    flip.forEach((card)=>{
                        card.classList.remove("flip");
                        setTimeout(()=>{card.classList.remove("toggleCard")},800)
                    }); 
                }
            }
        }
        else{
            card.removeEventListener("click",(e) => {})
        }
    })
    return card;
}


function time(){
    timer--;
    if(victory == cards.length){
        score();
        addRcorde();
        printer("you won, well done")
        return 0;
    }
    setTimeout(()=>{
        if(timer>=70){
            eTime.innerText = "01:"+ (timer - 60);
        }
        else if(timer>=60){
            eTime.innerText ="01:0"+ (timer-60);
        }
        else if(timer>=10){
            eTime.innerText ="00:"+ timer;
        }
        else if(timer<10){
            eTime.innerText="00:0" + timer;
            eTime.style.color = "red"
        }
        if(timer === 0)
        {
            printer("you out of time");     
            return 0;
        }
        time();
    },1000);
}

function score() {
    if(clicker === cards.length){
        scores+=40;
    }
    else if(clicker < cards.length *1.5){
        scores+=30
    }
    else if(clicker < cards.length * 2){
        scores+=20
    }
    else if (clicker < cards.length * 2.5){
        scores += 10
    }
    document.getElementById("score").innerText = scores
}

function printer(str){
    localStorage.setItem("endPrinter", str);
    localStorage.setItem("score",scores);
    setTimeout(()=>{window.location.href="./endIndex.html"},1000)
    
}


function getNumCards(){
    const numOfCards = localStorage.getItem("numOfCards");
    if(numOfCards==20){
        for(let i = 0; i<40;i++){
            cards.push(Allcards[i]);
        }
        timer = 90;
        addScore=1.5;
        eTime.innerText = "01:30";
        board.style.gridTemplateColumns = "repeat(8,5rem)";
        board.style.gridTemplateRows = "repeat(5,5rem)";
    }
    else if(numOfCards=='10'){
        for(let i = 0; i<20;i++){
            cards.push(Allcards[i]);
        }
        timer = 60;
        addScore =3;
        eTime.innerText = "01:00";
        board.style.gridTemplateColumns = "repeat(5,6rem)";
        board.style.gridTemplateRows = "repeat(4,6rem)";
    }
    else if(numOfCards==6){
        for(let i = 0; i<12;i++){
            cards.push(Allcards[i]);
        }
        timer = 30;
        eTime.innerText = "00:30";
        addScore = 5;
        board.style.gridTemplateColumns = "repeat(4,7rem)";
        board.style.gridTemplateRows = "repeat(3,7rem)";
    }
    else{
        timer = 120;
        cards = Allcards;
        eTime.innerText = "02:00";
    }
}
function addRcorde(){
    users[gameNumber].score+=scores;
    localStorage.setItem("users",JSON.stringify(users))
}

function checkRecord(){
    // let temp = [];
    // let smeller = 0;
    // for (i of users){
    //     for(j of users){
    //         if(i.score <j.score){
    //             smeller++;
    //         }
    //     }
    //     temp[smeller] = i;
    //     smeller = 0;
    // }
    // temp.forEach((v,i)=>{
    //     users[i] = v;
    // });
}
function showRecord(){
    getUsers();
    checkRecord();
    record.innerHTML =""
    users.map((v)=>{
        record.innerHTML +=  `
        <ul style = "display: block;">
        <il><img src="${v.avtar}" alt="${v.nickName}" class = "avatrImg"></il>
        <il>${v.user}</il>
        <il>${v.nickName}</il>
        <il>${v.score}</il>
        </ul>`
    });
}

function init(){    
    getNumCards();
    showRecord();
    shaffle();
    for(crd in cards){
        board.appendChild(creatCard(Number(crd)));
    }
    
}

init();

