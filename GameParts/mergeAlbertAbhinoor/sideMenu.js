const menu = document.getElementById("menu");
const arrow = document.getElementById("arrow");
const items = document.getElementsByClassName("item");
let menuOpen = false;


// var follower = document.getElementById("follower");
// follower.addEventListener('pointermove', moveObject);

function openAnclose(){
    if(menuOpen){
        menu.style.transform = "translateX(-90%)";
        arrow.style.transform = "translateX(-155%)";
        menuOpen=false;
    }
    else{
        menu.style.transform = "translateX(0%)";
        arrow.style.transform = "translateX(67%)";
        menuOpen=true;
    }
}
function pickItem(){
    if(item.id == "seed"){

    }
}
arrow.addEventListener("click", openAnclose/*stop forgetting to not add ()*/);
for(item of items){
    item.addEventListener("click", pickItem)
}

function moveObject(event){
   
    var x= event.clientX;
    var y= event.clientY;
    
    follower.style.left = x-50 + "px";
    follower.style.top = y-50 + "px";
}