'use strict'

//GLOBALS
let ctx;

//collection of buildings that people return to each day
let homes = [];

//collection of buildings that people possibly visit each day
let stores = [];

//collection of all homes and stores in the simulation
let buildings = [];

//collection of all people in the simulation
let people = [];

//default amount of people in the simulation at start
let peopleCount = 4;

//amount of homes in the simulation
let homeCount = 3;

//amount of stores in the simulation
let storeCount = 3;

//total amount buildings in simulation
let buildingCount = homeCount + storeCount;

//update() function stopper
let paused = false;

// To Make a Person Options
let houseNumber = 1;
let wearsMask = false;
let isInfected = false;
let random = false;

//measurements for display
const canvasWidth = 750;
const canvasHeight = 500;
const spacing = canvasWidth/6;
const xOffset = 60;
const homeYOffset = 50;
const storeYOffset = 400;
const buildingWidth = 100;
const buildingHeight = 50;
const personCircleSize = 10;

// UI Elements
let storeSlider;
let storeOutput;

let homeSlider;
let homeOutput;

let randomCheckmark;
let maskCheckmark;
let infectedCheckmark;
let houseNumInput;

let makePersonBtn;
let resetBtn;

let UIArray;

//UI disabler
let UIEnabled = true;

let mousePos;

let mouseX;
let mouseY;


//time between steps
const stepTime = 3000;

window.onload = init;






function init() {
    let canvas = document.querySelector('canvas');
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    

    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // UI Setup
    let storeSlider = document.querySelector("#storeNumSlider");
    let storeOutput = document.querySelector("#storeValue");

    let homeSlider = document.querySelector("#homeNumSlider");
    let homeOutput = document.querySelector("#homeValue");

    let randomCheckmark = document.querySelector("#randomCheck");
    let maskCheckmark = document.querySelector("#maskCheck");
    let infectedCheckmark = document.querySelector("#infectedCheck");
    let houseNumInput = document.querySelector("#houseNum");

    let makePersonBtn = document.querySelector("#personButton");
    let resetBtn = document.querySelector("#resetButton");
    let nextDayButton = document.querySelector("#nextButton");
    let clearPeople = document.querySelector("#clearPeople");

    homeCount = homeSlider.value;
    storeCount = storeSlider.value;
    random = randomCheckmark.checked;
    wearsMask = maskCheckmark.checked;
    isInfected = infectedCheckmark.checked;
    houseNumber = houseNumInput.value;


    UIArray = [storeSlider, storeOutput, homeSlider, homeOutput, randomCheckmark, maskCheckmark, infectedCheckmark, houseNumInput, makePersonBtn, resetBtn, nextDayButton]

    clLib.createBuildings();
    clLib.drawMap();

    // Display the default slider value
    storeOutput.innerHTML = storeSlider.value;
    homeOutput.innerHTML = homeSlider.value;

    // Update the current sliders values (each time you drag the slider handle)
    storeSlider.oninput = function () {
        storeOutput.innerHTML = this.value;
        storeCount = this.value;
        clLib.createBuildings();
        clLib.drawMap();
    }

    homeSlider.oninput = function () {
        homeOutput.innerHTML = this.value;
        homeCount = this.value;
        houseNumInput.max = homeCount;
        // Dummy proof
        if (houseNumInput.value > homeCount) {
            houseNumInput.value = homeCount;
            houseNumber = houseNumInput.value;
        }
        clLib.createBuildings();
        clLib.drawMap();
    }

    // Update the values when checkmarks are changed
    randomCheckmark.onclick = function () {
        if (!random) {
            random = true;
            maskCheckmark.disabled = true;
            infectedCheckmark.disabled = true;
            houseNumInput.disabled = true;
        } else {
            random = false;
            maskCheckmark.disabled = false;
            infectedCheckmark.disabled = false;
            houseNumInput.disabled = false;
        }
    }

    maskCheckmark.onclick = function () {
        wearsMask = maskCheckmark.checked;
    }

    infectedCheckmark.onclick = function () {
        isInfected = infectedCheckmark.checked;
    }

    houseNumInput.onchange = function () {
        // Dummy proof
        if (this.value > homeCount) {
            this.value = homeCount;
        }
        houseNumber = this.value;
    }

    makePersonBtn.onclick = function () {
        if (random) {
            clLib.makeRandomPerson();
        } else {
            clLib.makePerson(houseNumber - 1, wearsMask, isInfected);
        }
        peopleCount++;
    }

    // Refreshes the Page
    resetBtn.onclick = function () {
        history.go(0);
    }
    
    clearPeople.addEventListener("click",clLib.clearPeople);

    nextDayButton.addEventListener("click", clLib.newDay);

    //    //starting people
    for (let i = 0; i < peopleCount; i++) {

        clLib.makeRandomPerson();

        paused = false;

        update();
    }

}

function update() {

    if (paused) return;
    requestAnimationFrame(update);


    for (let UI of UIArray) {

        if (!UIEnabled) {
            UI.disabled = true;
        } else {
            UI.disabled = false;
        }
    }


    clLib.drawMap();
    clLib.movePeople();
    clLib.drawPeople();

}
//console.log(people[2].destinations[0]);
//console.log(canvas.mouseX)
//if(boolean) step();
//console.log("updating")
