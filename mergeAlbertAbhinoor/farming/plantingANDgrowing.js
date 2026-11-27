const wheat_stages = ["/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat1.png", "/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat2.png","/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat3.png", "/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat4.png", "/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat5.png"];

function logging(value){
    console.log("Whatever you are trying to do worked!!"+`${value}`)
}
function plantWheat(){
    // the plant object is actually created, it starts off as being the seeds(wheat_stages[0])
    if(!this.querySelector(".wheat")){
    let plant = document.createElement("img");
    plant.src=wheat_stages[0];
    plant.id= "0"
    plant.className="wheat";
    plant.addEventListener("click", collect_Wheat);
    this.appendChild(plant);

    // this is how the plant grows. the interval stops after it reaches the maximum stage.
     var growing_interval = setInterval(()=>{
        if(plant.id<="4"){
            plant.src=wheat_stages[parseInt(plant.id)];    
            plant.id = `${parseInt(plant.id) + 1}`;
        }
        else clearInterval(growing_interval);
        }
    , 
    1000);
    }
}

function collect_Wheat(){
    if(this.id=="5"){
        const money = document.getElementById("money");
        money.innerHTML=`${parseInt(money.innerHTML)+15}`+"$";
        this.parentNode.removeChild(this);
    }
}
