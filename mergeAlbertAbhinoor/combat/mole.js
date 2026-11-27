let currMoleTile;
let currMole1Tile;
let currMole2Tile;
let currMole5Tile;
let mole2HP =0;
let mole5HP =0;
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
    // setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
    // setInterval(setMole1, 1000);
    // setInterval(mole2heart, 2000); // 2000 miliseconds = 2 seconds, every 2 second call mole2HP
    // setInterval(mole5heart, 5000);
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 15 = (0-15) --> round down to (0-14) integers
    let num = Math.floor(Math.random() * 15);
    return num.toString();
}

function setMole() {
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "/mergeAlbertAbhinoor/ActualDrawings/mole-Recovered.png";

    let num = getRandomTile();
    if (currMole2Tile && currMole2Tile.id && currMole1Tile && currMole1Tile.id && currMole5Tile && currMole5Tile.id== num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setMole1() {
    if (currMole1Tile) {
        currMole1Tile.innerHTML = "";
    }
    let mole1 = document.createElement("img");
    mole1.src = "/mergeAlbertAbhinoor/ActualDrawings/mole1.png";

    let num = getRandomTile();
    if (currMole2Tile && currMole2Tile.id && currMoleTile && currMoleTile.id && currMole5Tile && currMole5Tile.id == num) {
        return;
    }
    currMole1Tile = document.getElementById(num);
    currMole1Tile.appendChild(mole1);
}

function mole2heart() {
    if (currMole2Tile) {
        currMole2Tile.innerHTML = "";
    }
    let mole2 = document.createElement("img");
    mole2.src = "/mergeAlbertAbhinoor/ActualDrawings/mole2heart.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id && currMole1Tile && currMole1Tile.id && currMole5Tile && currMole5Tile.id == num) {
        return;
    }
    currMole2Tile = document.getElementById(num);
    currMole2Tile.appendChild(mole2);
    mole2HP = 2;
}

function mole5heart() {
        if (currMole5Tile) {
        currMole5Tile.innerHTML = "";
    }
    let mole5 =document.createElement("img")
    mole5.src ="/mergeAlbertAbhinoor/ActualDrawings/mole5heart.png"

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id && currMole2Tile && currMole2Tile.id && currMole1Tile && currMole1Tile== num) {
        return;
    }
    currMole5Tile = document.getElementById(num);
    currMole5Tile.appendChild(mole5);
    mole5HP = 5;
}

function selectTile() {
    if (this == currMoleTile) {
        currMoleTile.innerHTML = "";
        currMoleTile = null;
    }
    else if (this == currMole1Tile) {
        currMole1Tile.innerHTML = "";
        currMole1Tile = null;
    }
    else if (this == currMole2Tile) {
        mole2HP--;
        if (mole2HP <= 0) {
            currMole2Tile.innerHTML = "";
            currMole2Tile = null;
        }
    }
    else if (this == currMole5Tile) {
        mole5HP--;
        if (mole5HP <=0) {
            currMole5Tile.innerHTML = "";
            currMole5Tile = null;
        }
    }
}