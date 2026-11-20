var time =[2000, 2500, 3000];
var audio= new Audio("Shit.wav");
var zChange =document.getElementById('image');
var Ihit = document.getElementById('hit');
var Imiss = document.getElementById('missed');

function move(){
    setInterval( DetPosition, time[Math.floor(Math.random() * time.length)]);
}

function DetPosition(){
    var positionx=["1%", "19%", "37%"]; 
    var positiony=["2%", "20%", "38%"];
    changePos =document.getElementById('image');
    changePos.style.top= positiony[Math.floor(Math.random() * positiony.length)];
    changePos.style.left= positionx[Math.floor(Math.random() * positionx.length)];
    if(zChange.style.zIndex==1){
    Imiss.value++;
    }
}

function DP_hit(){
    var positionx=["1%", "19%", "37%"]; 
    var positiony=["2%", "20%", "38%"];
    changePos =document.getElementById('image');
    changePos.style.top= positiony[Math.floor(Math.random() * positiony.length)];
    changePos.style.left= positionx[Math.floor(Math.random() * positionx.length)];
    zChange.style.zIndex = 1;
}

function hit_move(){
    playS()
    Ihit.value++;
    zChange.style.zIndex =-1;
   setTimeout(DP_hit, time[Math.floor(Math.random() * time.length)])
   
}

function delay(){
    var FinTime;
    FinTime= time[Math.floor(Math.random() * time.length)];
}

function playS(){
    audio.play();
}
