let currMoleTile;
let currMole1Tile;
let currMole2Tile;
let currMole5Tile;
let mole2HP =0;
let mole5HP =0;

//hammer button  
let hammerSelected = false;

document.querySelector("#hammeritem button").addEventListener("click", () => {
    hammerSelected = !hammerSelected;
    if (hammerSelected) {
        seedSelected = false;
        document.body.classList.remove("seed-cursor");
    }
    document.body.classList.toggle("hammer-cursor", hammerSelected);
});


window.onload = function() {
    setGame();
}
function setGame() {
    //set up the grid in html
    for (let i = 0; i < 15; i++) { //i goes from 0 to 14, stops at 15
        //<div id="0-14"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        tile.addEventListener("click",plantWheat);
        document.getElementById("board").appendChild(tile);
    }
     setInterval(setMole, 2500); // 1000 miliseconds = 1 second, every 1 second call setMole
     setInterval(setMole1, 2500);
     setInterval(mole2heart, 3000); // 2000 miliseconds = 2 seconds, every 2 second call mole2HP
     setInterval(mole5heart, 5000);
}

//if the mole is on the tile after 2 sec it eat the wheat (hopefully works???)
function eatwheat(tile, moleElement) {
    setTimeout(() => {
        //only if the mole wasn't wacked or moved away yet
        if (tile.contains(moleElement)){
            let wheat = tile.querySelector('.wheat');
            if (wheat) {
                wheat.remove();
            }
        }
        
    }, 2000);

}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 15 = (0-15) --> round down to (0-14) integers
    let num = Math.floor(Math.random() * 15);
    return num.toString();
}

function isTileOccupied(nun) {
    return (currMoleTile && currMoleTile.id == nun) ||
    (currMole1Tile && currMole1Tile.id == nun) ||
    (currMole2Tile && currMole2Tile.id == nun) ||
    (currMole5Tile && currMole5Tile.id == nun);
}

function setMole() {
    if (currMoleTile) {
        currMoleTile.querySelector(".mole")?.remove(); // Deletes ONLY the mole, wheat stays safe!
        currMoleTile = null;
    }
    let mole = document.createElement("img");
    mole.src = "/mergeAlbertAbhinoor/ActualDrawings/mole-Recovered.png";
    mole.className = "mole";

    let num = getRandomTile();
    if (isTileOccupied(num)) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
    eatwheat(currMoleTile, mole);
}

function setMole1() {
    if (currMole1Tile) {
        currMole1Tile.querySelector(".mole")?.remove(); // Deletes ONLY the mole, wheat stays safe!
        currMole1Tile = null;
    }
    let mole1 = document.createElement("img");
    mole1.src = "/mergeAlbertAbhinoor/ActualDrawings/mole1.png";
    mole1.className = "mole";

    let num = getRandomTile();
    if (isTileOccupied(num)) {
        return;
    }
    currMole1Tile = document.getElementById(num);
    currMole1Tile.appendChild(mole1);
    eatwheat(currMole1Tile, mole1);
}

function mole2heart() {
    if (currMole2Tile) {
        currMole2Tile.querySelector(".mole")?.remove(); // Deletes ONLY the mole, wheat stays safe!
        currMole2Tile = null;
    }
    let mole2 = document.createElement("img");
    mole2.src = "/mergeAlbertAbhinoor/ActualDrawings/mole2heart.png";
    mole2.className = "mole";

    let num = getRandomTile();
    if (isTileOccupied(num)) {
        return;
    }
    currMole2Tile = document.getElementById(num);
    currMole2Tile.appendChild(mole2);
    mole2HP = 2;
    eatwheat(currMole2Tile, mole2);
}

function mole5heart() {
        if (currMole5Tile) {
        currMole5Tile.querySelector(".mole")?.remove(); // Deletes ONLY the mole, wheat stays safe!
        currMole5Tile = null;
    }
    let mole5 =document.createElement("img")
    mole5.src ="/mergeAlbertAbhinoor/ActualDrawings/mole5heart.png"
    mole5.className = "mole";

    let num = getRandomTile();
    if (isTileOccupied(num)) {
        return;
    }
    currMole5Tile = document.getElementById(num);
    currMole5Tile.appendChild(mole5);
    mole5HP = 5;
    eatwheat(currMole5Tile, mole5);
}

function selectTile() {
    if (!hammerSelected) return;


    if (this == currMoleTile) {
        currMoleTile.querySelector(".mole")?.remove();
        currMoleTile = null;
    }
    else if (this == currMole1Tile) {
        currMole1Tile.querySelector(".mole")?.remove();
        currMole1Tile = null;
    }
    else if (this == currMole2Tile) {
        mole2HP--;
        if (mole2HP <= 0) {
            currMole2Tile.querySelector(".mole")?.remove();
            currMole2Tile = null;
        }
    }
    else if (this == currMole5Tile) {
        mole5HP--;
        if (mole5HP <=0) {
            currMole5Tile.querySelector(".mole")?.remove();
            currMole5Tile = null;
        }
    }
}