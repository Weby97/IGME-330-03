'use strict'

//GLOBALS
let ctx;
let homes = [];
let stores = [];
let buildings = [];
let people = [];

let peopleCount = 4;
let homeCount = 3;
let storeCount = 3;
let buildingCount = homeCount + storeCount;
let paused = false;

// To Make a Person Options
let houseNumber = 1;
let wearsMask = false;
let isInfected = false;
let random = false;

const canvasWidth = 750;
const canvasHeight = 500;
const spacing = 150;
const xOffset = 50;
const homeYOffset = 50;
const storeYOffset = 400;
const buildingWidth = 100;
const buildingHeight = 50;

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

let going = false;

//time between steps
const stepTime = 3000;

window.onload = init;

function init() {
    let canvas = document.querySelector('canvas');
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // UI Setup
    storeSlider = document.querySelector("#storeNumSlider");
    storeOutput = document.querySelector("#storeValue");

    homeSlider = document.querySelector("#homeNumSlider");
    homeOutput = document.querySelector("#homeValue");

    randomCheckmark = document.querySelector("#randomCheck");
    maskCheckmark = document.querySelector("#maskCheck");
    infectedCheckmark = document.querySelector("#infectedCheck");
    houseNumInput = document.querySelector("#houseNum");

    makePersonBtn = document.querySelector("#personButton");
    resetBtn = document.querySelector("#resetButton");

    homeCount = homeSlider.value;
    storeCount = storeSlider.value;
    random = randomCheckmark.checked;
    wearsMask = maskCheckmark.checked;
    isInfected = infectedCheckmark.checked;
    houseNumber = houseNumInput.value;

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
        }
        else {
            clLib.makePerson(houseNumber - 1, wearsMask, isInfected);
        }
        peopleCount++;
    }

    // Refreshes the Page
    resetBtn.onclick = function () {
        history.go(0);
    }


    document.querySelector("#nextButton").addEventListener("click", clLib.newDay);

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
        clLib.drawMap();
        clLib.movePeople();
        clLib.drawPeople();
        //console.log(people[2].destinations[0]);
        //console.log(canvas.mouseX)
        //if(boolean) step();
        //console.log("updating")

    }
