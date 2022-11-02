const print = document.getElementById("pEnd");
print.innerText = localStorage.getItem("endPrinter") +" you get: " +localStorage.getItem("score") + " points!";
const restart = document.getElementById("bEnd");
let gameNumber =Number(localStorage.getItem("gameNumber"));
let user= localStorage.getItem("users");    
const getUsers = ()=>{
    user=JSON.parse(user);
    if(user.length==1){
        user=JSON.parse(user[0]);
    }
    else{
        user = user.map(v=>JSON.parse(v))
    }
}
const main= ()=>{
    getUsers();
    if(gameNumber == user.length){
        restart.innerText = "to home page";
    }
    else{
        restart.innerText = "next player: " +user[gameNumber++].nickName; 
        localStorage.setItem("gameNumber",gameNumber);
    }
}
restart.addEventListener("click",()=>{
    if(gameNumber == user.length){
        //localStorage.removeItem("gameNumber");
        window.location.href="C:\\Users\\hp\\OneDrive\\שולחן העבודה\\binyamintek\\portalGames\\mainIndex.html";
    }
    else{
        localStorage.setItem("gameNumber",gameNumber);
        window.location.href="./startIndex.html";
    }
}); 
main();
