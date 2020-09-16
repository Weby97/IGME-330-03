//GLOBALS
let ctx;
let homes = [];
let stores = [];
let people = [];
let homeCount = 0;
let storeCount = 0;
const canvasWidth = 750
const canvasHeight = 500;




window.onload = init;

function init() {
    let canvas = document.querySelector('canvas');
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //create starting homes
    homes.push(new Building(50, 50));
    homes.push(new Building(100, 50));
    homes.push(new Building(150, 50));

    for (let i = 0; i < homes.length; i++) {
        homes[i].number = i;
        homeCount++;
    }

    //create starting stores
    stores.push(new Building(50, 250));
    stores.push(new Building(100, 250));
    stores.push(new Building(150, 250));

    for (let i = 0; i < stores.length; i++) {
        stores[i].number = i;
        storeCount++;
    }
    for (let home of homes) {

        blLIB.drawRectangle(ctx, home.x, home.y, 25, 50);

    }
    for (let store of stores) {
        blLIB.drawRectangle(ctx, store.x, store.y, 25, 50);


    }

    for (let i = 0; i < 3; i++) {
        people.push(new Person(i, false, false));
        people[i].x = homes[i].x;
        people[i].y = homes[i].y;
    }

    for (let person of people) {

        blLIB.drawCircle(ctx, person.x, person.y, 10, fillStyle = "green")

    }



    document.querySelector("#nextButton").addEventListener("click", function () {

        //console.log("Hello World!");
        for (let person of people) {

            let points = createPath(person)

            //console.log(path) 

            let aString = `Person ${person.houseNumber} will follow these points:`

            for (let i = 0; i < points.length - 1; i++) {

                aString += ` (${points[i][0] },${points[i][1]}) `
            }
            
            console.log(aString);

        }


    });



}
