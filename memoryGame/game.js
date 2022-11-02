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

let firstCard = null,timer,victory=0 ,scores = 0,clicker = 0 ,addScore = 1;
const records={"r1":{"score":0,"name":"empty","numOfCard":0},
"r2":{"score":0,"name":"empty","numOfCard":0},
"r3":{"score":0,"name":"empty","numOfCard":0},
"r4":{"score":0,"name":"empty","numOfCard":0},
"r5":{"score":0,"name":"empty","numOfCard":0}};

const printerRecord = {"R1":{"s":document.getElementById("score1"),"cn":document.getElementById("cardNumber1"),"n":document.getElementById("name1")},
"R2":{"s":document.getElementById("score2"),"cn":document.getElementById("cardNumber2"),"n":document.getElementById("name2")},
"R3":{"s":document.getElementById("score3"),"cn":document.getElementById("cardNumber3"),"n":document.getElementById("name3")},
"R4":{"s":document.getElementById("score4"),"cn":document.getElementById("cardNumber4"),"n":document.getElementById("name4")},
"R5":{"s":document.getElementById("score5"),"cn":document.getElementById("cardNumber5"),"n":document.getElementById("name5")},}

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
    if((localStorage.getItem("s1") < scores) || ((localStorage.getItem("s1") == scores) && (localStorage.getItem("cn1") < cards.length)) ){
        localStorage.setItem("s5",localStorage.getItem("s4"))
        localStorage.setItem("s4",localStorage.getItem("s3"))
        localStorage.setItem("s3",localStorage.getItem("s2"))
        localStorage.setItem("s2",localStorage.getItem("s1"))
        
        localStorage.setItem("n5",localStorage.getItem("n4"))
        localStorage.setItem("n4",localStorage.getItem("n3"))
        localStorage.setItem("n3",localStorage.getItem("n2"))
        localStorage.setItem("n2",localStorage.getItem("n1"))
        
        localStorage.setItem("cn5",localStorage.getItem("cn4"))
        localStorage.setItem("cn4",localStorage.getItem("cn3"))
        localStorage.setItem("cn3",localStorage.getItem("cn2"))
        localStorage.setItem("cn2",localStorage.getItem("cn1"))
        
        localStorage.setItem("s1",scores)
        localStorage.setItem("n1",localStorage.getItem("name"))
        localStorage.setItem("cn1",localStorage.getItem("numOfCards"))
    }
    else if((localStorage.getItem("s2") < scores)|| ((localStorage.getItem("s2") == scores) && (localStorage.getItem("cn2") < cards.length))){
        localStorage.setItem("s5",localStorage.getItem("s4"))
        localStorage.setItem("s4",localStorage.getItem("s3"))
        localStorage.setItem("s3",localStorage.getItem("s2"))
        
        localStorage.setItem("n5",localStorage.getItem("n4"))
        localStorage.setItem("n4",localStorage.getItem("n3"))
        localStorage.setItem("n3",localStorage.getItem("n2"))

        localStorage.setItem("cn5",localStorage.getItem("cn4"))
        localStorage.setItem("cn4",localStorage.getItem("cn3"))
        localStorage.setItem("cn3",localStorage.getItem("cn2"))
        
        localStorage.setItem("s2",scores)
        localStorage.setItem("n2",localStorage.getItem("name"))
        localStorage.setItem("cn2",localStorage.getItem("numOfCards"))
    }
    else if((localStorage.getItem("s3") < scores)|| ((localStorage.getItem("s3") == scores) && (localStorage.getItem("cn3") < cards.length))){
        localStorage.setItem("s5",localStorage.getItem("s4"))
        localStorage.setItem("s4",localStorage.getItem("s3"))
        
        localStorage.setItem("n5",localStorage.getItem("n4"))
        localStorage.setItem("n4",localStorage.getItem("n3"))
        
        localStorage.setItem("cn5",localStorage.getItem("cn4"))
        localStorage.setItem("cn4",localStorage.getItem("cn3"))
        
        localStorage.setItem("s3",scores)
        localStorage.setItem("n3",localStorage.getItem("name"))
        localStorage.setItem("cn3",localStorage.getItem("numOfCards"))
    }
    else if((localStorage.getItem("s4") < scores)|| ((localStorage.getItem("s4") == scores) && (localStorage.getItem("cn4") < cards.length))){
        localStorage.setItem("s5",localStorage.getItem("s4"))
        
        localStorage.setItem("n5",localStorage.getItem("n4"))
        
        localStorage.setItem("cn5",localStorage.getItem("cn4"))
        
        localStorage.setItem("s4",scores)
        localStorage.setItem("n4",localStorage.getItem("name"))
        localStorage.setItem("cn4",localStorage.getItem("numOfCards"))
    }
    else if((localStorage.getItem("5") < scores)|| ((localStorage.getItem("s5") == scores) && (localStorage.getItem("cn5") < cards.length))){
        localStorage.setItem("s5",scores)
        localStorage.setItem("n5",localStorage.getItem("name"))
        localStorage.setItem("cn5",localStorage.getItem("numOfCards"))
    }
    
}
function checkingRcords(){
    const ob ={"s":"0","n":"empty","cardsNumber":"0"}
    if(localStorage.getItem("s1") == undefined){
        localStorage.setItem("s1",ob.s);
        localStorage.setItem("n1",ob.n);
        localStorage.setItem("cn1",ob.cardsNumber);
        
    }
    const rc1 ={"n":localStorage.getItem("n1"),"s":localStorage.getItem("s1"),"cardsNumber":localStorage.getItem("cn1")};
    records.r1.name=rc1.n;
    records.r1.score=rc1.s;
    records.r1.numOfCard=rc1.cardsNumber;
    
    if(localStorage.getItem("s2") == undefined){
        localStorage.setItem("s2",ob.s);
        localStorage.setItem("n2",ob.n);
        localStorage.setItem("cn2",ob.cardsNumber);
        
    }
    const rc2 ={"n":localStorage.getItem("n2"),"s":localStorage.getItem("s2"),"cardsNumber":localStorage.getItem("cn2")};
    records.r2.name=rc2.n;
    records.r2.score=rc2.s;
    records.r2.numOfCard=rc2.cardsNumber;
    
    if(localStorage.getItem("s3") == undefined){
        localStorage.setItem("s3",ob.s);
        localStorage.setItem("n3",ob.n);
        localStorage.setItem("cn3",ob.cardsNumber);
        
    }
    const rc3 ={"n":localStorage.getItem("n3"),"s":localStorage.getItem("s3"),"cardsNumber":localStorage.getItem("cn3")};
    records.r3.name=rc3.n;
    records.r3.score=rc3.s;
    records.r3.numOfCard=rc3.cardsNumber;
    
    if(localStorage.getItem("s4") == undefined){
        localStorage.setItem("s4",ob.s);
        localStorage.setItem("n4",ob.n);
        localStorage.setItem("cn4",ob.cardsNumber);

    }
    const rc4 ={"n":localStorage.getItem("n4"),"s":localStorage.getItem("s4"),"cardsNumber":localStorage.getItem("cn4")};
    records.r4.name=rc4.n;
    records.r4.score=rc4.s;
    records.r4.numOfCard=rc4.cardsNumber;
    
    if(localStorage.getItem("s5") == undefined){
        localStorage.setItem("s5",ob.s);
        localStorage.setItem("n5",ob.n);
        localStorage.setItem("cn5",ob.cardsNumber);
        
    }
    const rc5 ={"n":localStorage.getItem("n5"),"s":localStorage.getItem("s5"),"cardsNumber":localStorage.getItem("cn5")};
    records.r5.name=rc5.n;
    records.r5.score=rc5.s;
    records.r5.numOfCard=rc5.cardsNumber;
}
function showRecord(){
    checkingRcords();
    printerRecord.R1.s.innerText = records.r1.score;
    printerRecord.R1.n.innerText=records.r1.name;
    printerRecord.R1.cn.innerText= records.r1.numOfCard;
    printerRecord.R2.s.innerText = records.r2.score;
    printerRecord.R2.n.innerText=records.r2.name;
    printerRecord.R2.cn.innerText= records.r2.numOfCard;
    printerRecord.R3.s.innerText = records.r3.score;
    printerRecord.R3.n.innerText=records.r3.name;
    printerRecord.R3.cn.innerText= records.r3.numOfCard;
    printerRecord.R4.s.innerText = records.r4.score;
    printerRecord.R4.n.innerText=records.r4.name;
    printerRecord.R4.cn.innerText= records.r4.numOfCard;
    printerRecord.R5.s.innerText = records.r5.score;
    printerRecord.R5.n.innerText=records.r5.name;
    printerRecord.R5.cn.innerText= records.r5.numOfCard;
    
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

