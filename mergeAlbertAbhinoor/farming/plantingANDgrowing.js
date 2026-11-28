const wheat_stages = ["/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat1.png", "/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat2.png","/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat3.png", "/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat4.png", "/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat5.png"];

let seedSelected = false;

//seed button added
document.querySelector("#seed button").addEventListener("click", () => {
    seedSelected = !seedSelected;
    if (seedSelected) {
        hammerSelected = false;
        document.body.classList.remove("hammer-cursor");
    }
    document.body.classList.toggle("seed-cursor", seedSelected);
});

function logging(value){
    console.log("Whatever you are trying to do worked!!"+`${value}`)
}


function plantWheat(){
    if (!seedSelected) return; //added so only activate if the button is pressed
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
    2000); //wheat growth time i changed to total 10 sec to test mole eat wheat code
    }
}

function collect_Wheat(event){
    event.stopPropagation();
    if (hammerSelected || seedSelected) return; // added Only harvest when hammer or seed are not selected.

    if(this.id=="5"){
        const money = document.getElementById("money");
        money.innerHTML=`${parseInt(money.innerHTML)+15}`+"$";
        this.parentNode.removeChild(this);
    }
}
