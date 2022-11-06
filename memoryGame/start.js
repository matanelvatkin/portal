const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const users = []
let user = JSON.parse(localStorage.getItem("users"));//to names
const names = document.getElementById("name");//to names
let gameNumber = localStorage.getItem("gameNumber")!=undefined?localStorage.getItem("gameNumber"):0 //to names
const setName = ()=> {
    names.innerText = user[Number(gameNumber)].nickName;
}
const getUsers = ()=>{
    if(gameNumber==0){
        user.forEach((v,i)=>{
            user[i]=(JSON.parse(v));
        })
    }
}
button1.addEventListener("click",()=>{
    localStorage.setItem("numOfCards",6);
    window.location.href="./gameIndex.html";
});
button2.addEventListener("click",()=>{
    localStorage.setItem("numOfCards",10);
    window.location.href="./gameIndex.html";
})
button3.addEventListener("click",()=>{
    localStorage.setItem("numOfCards",20);
    window.location.href="./gameIndex.html";
});
button4.addEventListener("click",()=>{
    localStorage.setItem("numOfCards",30);
    window.location.href="./gameIndex.html";
});

function main(){
    getUsers();
    setName();
}

main();