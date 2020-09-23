//GLOBALS
let ctx;
let homes = [];
let stores = [];
let buildings = [];
let people = [];

let peopleCount = 20;
let homeCount = 3;
let storeCount = 3;
let buildingCount = 6;
let paused = false;

const canvasWidth = 750
const canvasHeight = 500;
const spacing = 150;
const xOffset = 50;
const homeYOffset = 50;
const storeYOffset = 200;
const buildingWidth = 100;
const buildingHeight = 50;



let going = false;

//time between steps
const stepTime = 3000;

window.onload = init;

function init() {
    let canvas = document.querySelector('canvas');
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);


    clLib.createBuildings();
    clLib.drawMap();

//    //starting people
    for (let i = 0; i < peopleCount; i++) {
        
        clLib.makeRandomPerson();
        
//        people.push(new clLib.Person(i, false, false));
//        people[i].x = homes[i].x + buildingWidth / 2;
//        people[i].y = homes[i].y + buildingHeight / 2;
    }
//    let aPerson = new clLib.Person(2,false,true)
//    aPerson.x = homes[2].x + buildingWidth / 2;
//    aPerson.y = homes[2].y + buildingHeight / 2;
//    
//    people.push(aPerson)

    document.querySelector("#nextButton").addEventListener("click", clLib.newDay);

    paused = false;
    update();

}

function update() {

if (paused) return;
    requestAnimationFrame(update);
    clLib.drawMap();
    clLib.movePeople();
    clLib.drawPeople();
    //console.log(people[2].destinations[0]);
    //console.log(canvas.mouseX)
    //if(boolean) step();
    //console.log("updating")

}
