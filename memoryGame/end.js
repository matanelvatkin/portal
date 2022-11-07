const print = document.getElementById("pEnd");
print.innerText = localStorage.getItem("endPrinter") +" you get: " +localStorage.getItem("score") + " points!";
const restart = document.getElementById("bEnd");
let gameNumber =Number(localStorage.getItem("gameNumber"));
const user= []; 
let users =JSON.parse(localStorage.getItem("users"));    // get users
const getUsers = ()=>{ //extract JSON
    users.forEach(v => {
        user.push(v)
    });
    console.log(user);
}
const main= ()=>{ //check if is the last player
    getUsers();
    if(gameNumber < user.length&&user.length > 1){
        restart.innerText = "next player: " +user[++gameNumber].nickName; 
        localStorage.setItem("gameNumber",gameNumber);
    }
}
restart.addEventListener("click",()=>{
    localStorage.setItem("users",JSON.stringify(user))
    console.log(JSON.stringify(user));
    if(gameNumber == user.length){
        window.location.href="\\mainIndex.html";
    }
    else{
        localStorage.setItem("gameNumber",gameNumber);
        window.location.href="./startIndex.html";
    }
}); 
main();
