const text = document.querySelectorAll(".game");
const imgs = document.querySelectorAll(".mainGames");
const imgLink = {ft:{src:null,admin:"moshe",name:"fortnite"}
, gow:{src:null,admin:"dfasc",name:"game of wor"} 
, giba :{src:null,admin:"mob vd",name:"giga bash"}
, mario:{src:null,admin:"asdf",name:"mario"},
nba:{src:".\\memoryGame\\startIndex.html",admin:"matanel",name:"nba"},
rr:{src:null,admin:"bfasdfcx",name:"rosh royal"}};
const next = document.getElementById("submit");
const openPopUp = document.getElementById("popUp");
const nextButton = document.getElementById("playrB");
const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const leftArrow = document.getElementById("leftB");
const rightArrow = document.getElementById("rightB");
const avatarImg =document.getElementById("avatr");
const inputUsers = document.getElementById("numPlayrs");
const avatars = ["./gamesPictures/avatar1.jpg","./gamesPictures/avatar2.jpg","./gamesPictures/avatar3.jpg","./gamesPictures/avatar4.jpg"];
const removePop = document.getElementById("remove_player");
const showUsers = document.getElementById("user");
let numPlayers, numPopUps = 1, avatarCounter = 0,nicki = 0;
const users =[];

const creatUsers = (nickName,user,avtar)=>{
    return {nickName
        ,avtar
        ,user
        ,score :0
    }
}
const checkUsers = ()=>{
    if(users.length>0){
        if(users.findIndex(v=>document.getElementById("nickName").value==v.nickName)!=-1){
            let exsit = document.createElement("p");
            exsit.id="nicki"
            exsit.innerText= "this nick name exist";
            document.getElementById("signin").appendChild(exsit);
            nicki = 1;
            return 1;
        }
    }
    return 0;
}
const showingUsers = ()=>{
    users.map((v)=>{
        showUsers.innerHTML +=  `
        <ul">
           <il><img src="${v.avtar}" alt="${v.nickName}" class = "avatrImg"></il>
           <il>${v.user}</il>
           <il>${v.nickName}</il>
           <il>${v.score}</il>
       </ul>`
    });
}
const addFunctions= ()=>{
    addButton.addEventListener("click",()=>{
        document.getElementById("signin").style.visibility = "visible";
        numPlayers++;
    });
    addButton.addEventListener("mouseover",()=>{
        addButton.style.background = "rgb(20 85 170)"
    })
    addButton.addEventListener("mouseout",()=>{
        addButton.style.background = "rgb(25 90 175)"
    })   
}
const removeFunctoins = ()=>{
    removeButton.addEventListener("click",()=>{
        document.getElementById("removing").style.visibility = "visible";
        numPlayers--    
    });
    removeButton.addEventListener("mouseover",()=>{
        removeButton.style.background = "rgb(20 85 170)"
    })
    removeButton.addEventListener("mouseout",()=>{
        removeButton.style.background = "rgb(25 90 175)"
    })   
    
}
removePop.addEventListener("click",()=>{
    users.splice(users.findIndex((v)=>{
        if(v.nickName == document.getElementById("RnickName").value){
            return true
        }
        return false
    }) -1);
    document.getElementById("RnickName").value = "";
    localStorage.setItem("users",JSON.stringify(users));
    document.getElementById("removing").style.visibility = "hidden";
    showingUsers();
})


nextButton.addEventListener("click",()=>{
    
    if(nicki){
        document.getElementById("nicki").remove();
        nicki = 0;
    }
    if(users.length >= numPlayers){
        document.getElementById("signin").style.visibility = "hidden";
    }
    else{
        if(checkUsers()){
        }
        else{
            users.push(creatUsers(document.getElementById("nickName").value,
            document.getElementById("fullName").value,
            avatarImg.src));
            document.getElementById("nickName").value = "";
            document.getElementById("fullName").value = "";
            document.getElementById("signin").style.visibility = "hidden";
            if(users.length == numPlayers-1){
                nextButton.innerText="end";
                addFunctions();
            }
        }
    }
    if(users.length<numPlayers){
        setTimeout(()=>{document.getElementById("signin").style.visibility = "visible";},100)
    }
    else{
        console.log(users);
        localStorage.setItem("users",JSON.stringify(users));
    }
});

inputUsers.addEventListener("change",()=>{
    if(inputUsers.value > 4){
        inputUsers.value = "1";
    }
});

next.addEventListener("click",()=>{
    numPlayers = inputUsers.value;
    inputUsers.value = "";
    openPopUp.classList.remove("open_popup");
    if(numPlayers == 0){
    openPopUp.classList.add("open_popup");
    }
    else{
        document.getElementById("signin").style.visibility = "visible";
        if(numPopUps == numPlayers){
            nextButton.innerText = "end";
        }
    }
});

imgs.forEach((v)=>{
    v.addEventListener("mouseover",()=>{
      v.classList.add("opasity");
      text.forEach((tx)=>{
            
            setTimeout(()=>tx.innerText = `game name: ${imgLink[v.id].name}\n admin code: ${imgLink[v.id].admin}`,300)
            tx.style.fontSize = "24px"
      })
    });
    v.addEventListener("mouseout",()=>{
        v.classList.remove("opasity")
        text.forEach((tx)=>{
            tx.innerText = "";
        })
    });
    v.addEventListener("click",()=>{
        let js_users=users.map((v)=>{
            return JSON.stringify(v)
        })
        localStorage.setItem('users', JSON.stringify(js_users));
        localStorage.setItem("gameNumber",0)
        window.location.href = imgLink[v.id].src;
    });
});

leftArrow.addEventListener("click",()=>{
    avatarCounter--;
    if(avatarCounter < 0){
        avatarCounter = 3;
    }
    avatarImg.src = avatars[avatarCounter]    
});

rightArrow.addEventListener("click",()=>{
    avatarCounter++;
    if(avatarCounter > 3){
        avatarCounter = 0;
    }
    avatarImg.src = avatars[avatarCounter]    
});


if(localStorage.getItem("users") == null){
    setTimeout(()=>openPopUp.classList.add("open_popup"),1000);
}
else{
    addFunctions();
    removeFunctoins();
    let temp = JSON.parse(localStorage.getItem("users"))
    temp.forEach((v)=>{
        users.push(JSON.parse(v))
    })
    showingUsers();
    console.log(users);
}


