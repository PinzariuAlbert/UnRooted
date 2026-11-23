const menu = document.getElementById("menu");
const arrow = document.getElementById("arrow");
let menuOpen = false;

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
arrow.addEventListener("click", openAnclose/*stop forgetting to not add ()*/);