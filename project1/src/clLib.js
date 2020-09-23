//Chase Lear, Person, Building, makePerson, createPath

(function () {
    'use strict'
    let clLib = {

        //MAKES A PERSON OBJECT
        makeRandomPerson() {
            //what house they belong in
            let aHouseNumber = blLIB.getRandomInt(0, homeCount - 1);

            //are they wearing a mask?
            let wearsMask = blLIB.getRandomInt(0, 1);

            //are they infected?
            let isInfected = blLIB.getRandomInt(0, 1);

            //make person
            let aPerson = new clLib.Person(aHouseNumber, wearsMask, isInfected);

            //put person in proper home
            for (let home of homes) {
                if (home.number == aPerson.houseNumber) {
                    home.members.push(aPerson);
                    aPerson.x = home.x + buildingWidth / 2;
                    aPerson.y = home.y + buildingHeight / 2;
                }

            }
            aPerson.id = people.length;
            //put into people array
            people.push(aPerson);

        },
        
        makePerson(houseNumber = 1,wearsMask = true,isInfected = false,x=10,y=10) {

            //make person
            let aPerson = new clLib.Person(houseNumber, wearsMask, isInfected);

            //put person in proper home
            for (let home of homes) {
                if (home.number == aPerson.houseNumber) {
                    home.members.push(aPerson);
                    aPerson.x = home.x + buildingWidth / 2;
                    aPerson.y = home.y + buildingHeight / 2;
                }

            }



            aPerson.id = people.length;

            //put into people array
            people.push(aPerson);

        },

        //RETURNS 2D ARRAY OF XY LOCATIONS FOR A PERSON TO FOLLLOW
        createPath(person) {

            //2d array of building objects
            let destinationArray = [];

            //how many destinations?
            let destinationCount = blLIB.getRandomInt(0, storeCount);

            //bail early if it's 0
            if (destinationCount == 0) return [];

            //random store array index number
            let picker = blLIB.getRandomInt(0, storeCount-1);

            //fetch the store and palce it into the array
            for (let store of stores) {
                if (picker == store.number) {
                    destinationArray.push(store);
                }
            }

            //find this person's home
            let thisPersonsHome;

            for (let home of homes) {
                if (home.number == person.houseNumber) {
                    thisPersonsHome = home;
                }
            }



            destinationArray.push(thisPersonsHome);
            
            //console.log(destinationArray)
            return destinationArray;

           

        },

        returnHome() {


            for (let person of people) {

                for (let home of homes) {

                    if (person.houseNumber.x == home.number) {

                        person.destinations = [[0], [home.x + buildingWidth / 2, home.y + buildingHeight]]
                    }

                }


            }

            movePeople();

        },

        step() {

            //create new paths for each person
            for (let person of people) {
                person.destinations = clLib.createPath(person);
            }
            going = true;
        },

        countMembers() {


            for (let store of stores) {
                for (let person of people) {
                    if (person.x == store.x)
                        store.members.push(person);
                }
            }

            for (let house of homes) {
                for (let person of people) {
                    if (person.x == house.x)
                        house.members.push(person);
                }
            }

        },

        clearMembers() {


            for (let house of homes) {
                house.members.splice(0, homes.length);
            }
        },

        moveVirus(building) {
            //debugger;
            //maths
            let insideBuilding = building.members;
            let masklessPeople = 0;
            let maskedPeople = 0;
            let spreadChance = 0;
            let nonInfected = [];

            for (let person of insideBuilding) {
                if (person.infected && person.hasMask == false) {
                    spreadChance += .5;
                } else if (person.infected) {
                    if (person.hasMask) {
                        spreadChance += .1;
                    }
                }
            }

            console.log(`spread chance: ${spreadChance} building: ${building.number} building members: ${building.members.length}`);

            if (spreadChance >= 1) {
                spreadChance = .95
            };


            for (let person of insideBuilding) {
                if (person.infected == false) {
                    let determiner = Math.random().toFixed(2);
                    console.log(determiner)
                    //console.log("determiner for person ",person.houseNumber," in building " +building.number+"is "+determiner);
                    if (determiner < spreadChance) {

                        console.log("new infected in store "+building.number)
                        person.infected = true;

                    } else {
                        console.log("store ",building.number," clear!")
                    }
                }
            }


           // console.log("virus move");
            //check virus spread
        },

        newDay() {


            //if (going) return;
            going = true;
            clLib.step();
            //console.log(buildings);
        },

        createBuildings() {

            for (let i = 0; i < homeCount; i++) {
                let aHome = new Building(xOffset + (i * spacing), homeYOffset, i)
                homes.push(aHome);
                buildings.push(aHome)

            }

            for (let i = 0; i < storeCount; i++) {

                let aStore = new Building(xOffset + (i * spacing), storeYOffset, i)
                stores.push(aStore);
                buildings.push(aStore)
            }



            storeCount = stores.length;
            homeCount = homes.length;
            buildingCount = buildings.length

        },

        drawMap() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            for (let home of homes) {

                blLIB.drawRectangle(ctx, home.x, home.y, buildingWidth, buildingHeight, "grey");

            }
            for (let store of stores) {
                blLIB.drawRectangle(ctx, store.x, store.y, buildingWidth, buildingHeight, "darkslategrey");


            }
        },

        drawPeople() {

            for (let person of people) {


                if (person.infected == true) {
                    blLIB.drawCircle(ctx, person.x, person.y, 10, "red")
                } else {

                    blLIB.drawCircle(ctx, person.x, person.y, 10, "blue")
                }

                if (person.hasMask) {
                    blLIB.drawRectangle(ctx, person.x - 5, person.y, 10, 10, "white")
                }

            }


        },

        moveToNextPoint(person) {
            //building object
            let destination = person.destinations[0];

            //x and y in the top left corner of the building
            let destinationX = destination.x;
            let destinationY = destination.y;

            console.log(person.destinations[0])
            console.log(person.x, destinationX)
            console.log(person.y, destinationY)

            //building number
            let destinationNumber = destination.number;

            //console.log("person " + person.houseNumber + " is moving to " + destinationX + " " + destinationY)

            if (person.x > (destinationX + (buildingWidth / 2))) {
                console.log("moving -x")
                person.x -= 1;

            } else if (person.x < (destinationX + (buildingWidth / 2))) {
                console.log("moving +x")
                person.x += 1;
            }

            if (person.y > (destinationY + (buildingHeight / 2))) {
                console.log("moving -y")
                person.y -= 1;
            } else if (person.y < (destinationY + (buildingHeight / 2))) {
                console.log("moving y")
                person.y += 1;
            }
           
            if (person.x > destinationX && person.x <= (destinationX + buildingWidth)
                && person.y > destinationY && person.y <= (destinationY + buildingHeight)) {

                ////push them into the current building
                //for (let building of buildings) {
                //    //console.log(building.x, building.y, person.x, person.y)
                //    //blLIB.drawCircle(ctx,building.x+buildingWidth/2, building.y, 10, "red")

                //    if (building.x + buildingWidth / 2 == person.x && building.y + buildingHeight / 2 == person.y) {

                //        //Put this person into the building
                //        building.members.push(person);

                //        clLib.moveVirus(building);

                //        //clear all members arrays
                //    }

                //}
                if (!person.inAStore) {
                    destination.members.push(person);
                    person.inAStore = true;
                    clLib.moveVirus(destination);
                }

                //console.log("Im person "+person.houseNumber+"and I just went to "+destinationX,destinationY)
                //removes the specified person who has reached the center of the building out of the array and onto their next point
                if (person.x == (destinationX + (buildingWidth / 2)) && person.y == (destinationY + (buildingHeight / 2))) {
                    person.destinations.shift();
                    person.inAStore = false;
                    for (let i = 0; i < destination.members.length; i++) {
                        if (destination.members[i].id == person.id) {
                            destination.members.splice(i, 1);
                        }
                    }
                }
                

            }



        },

        movePeople() {
            //for (let i = 0; i < storeCount; i++) {

            for (let person of people) {
                if (person.destinations.length > 0) {
                    clLib.moveToNextPoint(person);
                }
            }
            //}

        },

        logPaths() {

            //console.log("Hello World!");
            for (let person of people) {

                let points = person.destinations;

                //console.log(path) 

                let aString = `Person ${person.houseNumber} will follow these points:`

                for (let i = 0; i < points.length; i++) {

                    aString += ` (${points[i][0] },${points[i][1]}) `
                }

                //console.log(aString);


            }


        }
    };

    //PERSON OBJECT
    class Person {
        constructor(houseNumber, hasMask, infected, inAStore = false, id) {
            this.id = id;
            this.houseNumber = houseNumber;
            this.hasMask = hasMask;
            this.infected = infected;
            this.x = 0;
            this.y = 0;
            this.destinations = [];
            this.inAStore = inAStore;
        }

    }

    //BUILDING OBJECT
    class Building {
        constructor(x, y, number) {
            this.number = number
            this.members = [];
            this.x = x;
            this.y = y;

        }

    }

    clLib.Person = Person;
    clLib.Building = Building;

    if (window) {
        window["clLib"] = clLib;
    } else {
        throw "'window' is not defined!";
    }
})();
