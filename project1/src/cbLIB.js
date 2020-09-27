// Chase's Functions w/ Edits and Assistance from Brandon
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

                let lowerXVariance = (-buildingWidth / 2) + personCircleSize;
                let upperXVariance = (buildingWidth / 2) - personCircleSize;
                let lowerYVariance = (-buildingHeight / 2) + personCircleSize;
                let upperyVariance = (buildingHeight / 2) - personCircleSize;


                aPerson.x += blLIB.getRandomInt(lowerXVariance, upperXVariance);
                aPerson.y += blLIB.getRandomInt(lowerYVariance, upperyVariance);

                aPerson.id = people.length;
                //put into people array
                people.push(aPerson);

            },

            makePerson(houseNumber = 1, wearsMask = true, isInfected = false, x = 10, y = 10) {

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


                let lowerXVariance = (-buildingWidth / 2) + personCircleSize;
                let upperXVariance = (buildingWidth / 2) - personCircleSize;
                let lowerYVariance = (-buildingHeight / 2) + personCircleSize;
                let upperyVariance = (buildingHeight / 2) - personCircleSize;


                aPerson.x += blLIB.getRandomInt(lowerXVariance, upperXVariance);
                aPerson.y += blLIB.getRandomInt(lowerYVariance, upperyVariance);

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

                //find this person's home
                let thisPersonsHome;

                //bail early if it's 0
                if (destinationCount == 0) {
                    if (person.houseNumber > homeCount - 1) {
                        let newHome = blLIB.getRandomInt(0, homeCount - 1);
                        thisPersonsHome = homes[newHome];
                        person.houseNumber = newHome;
                        destinationArray.push(thisPersonsHome);
                        return destinationArray;
                    }
                    return [];
                }

                //random store array index number
                let picker = blLIB.getRandomInt(0, storeCount - 1);

                //fetch the store and place it into the array
                for (let store of stores) {
                    if (picker == store.number) {
                        destinationArray.push(store);
                    }
                }

                for (let home of homes) {
                    if (home.number == person.houseNumber) {
                        thisPersonsHome = home;
                    } else if (person.houseNumber > homeCount - 1) {
                        let newHome = blLIB.getRandomInt(0, homeCount - 1);
                        thisPersonsHome = homes[newHome];
                        person.houseNumber = newHome;
                    }
                }

                destinationArray.push(thisPersonsHome);
                return destinationArray;
            },

            step() {
                //create new paths for each person
                for (let person of people) {
                    person.destinations = clLib.createPath(person);
                }

                //            for (let person of people) {
                //
                //                if (person.destinations.length == 0) {
                //                    continue;
                //                } else {
                //                    return;
                //                }
                //                
                //
                //
                //            }
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

            clearPeople() {
                for (let person of people) {
                    people.splice(0, people.length);
                }
            },

            moveVirus(building) {
                //maths
                let insideBuilding = building.members;
                let spreadChance = 0;

                for (let person of insideBuilding) {
                    if ((person.infected ==true)&& (person.hasMask == false)) {
                        spreadChance += .5;
                    } else if (person.infected) {
                        if (person.hasMask) {
                            spreadChance += .01;
                        }
                    }
                }

                if (spreadChance >= 1) {
                    spreadChance = .95;
                };


                for (let person of insideBuilding) {
                    if (person.infected == false) {
                        let determiner = Math.random().toFixed(2);
                        if (determiner < spreadChance) {
                            person.infected = true;
                        }
                    }
                }
            },

            newDay() {
                UIEnabled = false;
                clLib.step();

            },

            createBuildings() {

                homes.splice(0, homes.length);
                stores.splice(0, stores.length);
                buildings.splice(0, buildings.length);

                for (let i = 0; i < homeCount; i++) {
                    let aHome = new Building(xOffset + (i * spacing), homeYOffset, i)
                    homes.push(aHome);
                    buildings.push(aHome);

                }

                for (let i = 0; i < storeCount; i++) {

                    let aStore = new Building(xOffset + (i * spacing), storeYOffset, i)
                    stores.push(aStore);
                    buildings.push(aStore);
                }

                storeCount = stores.length;
                homeCount = homes.length;
                buildingCount = buildings.length;

            },

            drawMap() {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.fillStyle = "#212121";
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                for (let home of homes) {

                    blLIB.drawRectangle(ctx, home.x, home.y, buildingWidth, buildingHeight, "lightgrey");

                }
                for (let store of stores) {
                    blLIB.drawRectangle(ctx, store.x, store.y, buildingWidth, buildingHeight, "darkslategrey");


                }
            },

            drawPeople() {
                
                for (let person of people) {



                    if (person.infected == true) {
                        blLIB.drawCircle(ctx, person.x, person.y, personCircleSize, "red")
                    } else {

                        blLIB.drawCircle(ctx, person.x, person.y, personCircleSize, "blue")
                    }

                    if (person.hasMask) {
                        blLIB.drawRectangle(ctx, person.x - personCircleSize / 2, person.y, personCircleSize, personCircleSize, "white")
                    }

                }


            },

            

                moveToNextPoint(person) {
                        //building object
                        let destination = person.destinations[0];

                        //x and y in the top left corner of the building
                        let destinationX = destination.x;
                        let destinationY = destination.y;

                        if (person.x > (destinationX + (buildingWidth / 2))) {
                            person.x -= 1;
                        } else if (person.x < (destinationX + (buildingWidth / 2))) {
                            person.x += 1;
                        }

                        if (person.y > (destinationY + (buildingHeight / 2))) {
                            person.y -= 1;
                        } else if (person.y < (destinationY + (buildingHeight / 2))) {
                            person.y += 1;
                        }

                        if (person.x > destinationX && person.x <= (destinationX + buildingWidth) &&
                            person.y > destinationY && person.y <= (destinationY + buildingHeight)) {

                            if (!person.inAStore) {
                                destination.members.push(person);
                                person.inAStore = true;
                                clLib.moveVirus(destination);
                            }

                            //removes the specified person who has reached the center of the building out of the array and onto their next point
                            if (person.x == (destinationX + (buildingWidth / 2)) && person.y == (destinationY + (buildingHeight / 2))) {




                                person.destinations.shift();
                                person.inAStore = false;
                                for (let i = 0; i < destination.members.length; i++) {
                                    if (destination.members[i].id == person.id) {
                                        destination.members.splice(i, 1);
                                    }
                                }

                                let lowerXVariance = (-buildingWidth / 2) + personCircleSize;
                                let upperXVariance = (buildingWidth / 2) - personCircleSize;
                                let lowerYVariance = (-buildingHeight / 2) + personCircleSize;
                                let upperyVariance = (buildingHeight / 2) - personCircleSize;


                                person.x += blLIB.getRandomInt(lowerXVariance, upperXVariance);
                                person.y += blLIB.getRandomInt(lowerYVariance, upperyVariance);




                            }

                        }

                        //disable UI during movement
                        let aBool = false;
                        for (let aPerson of people) {

                            if (aPerson.destinations.length == 0) {
                                aBool = true;
                            } else {
                                aBool = false;

                            }

                        }
                        if (aBool == true) UIEnabled = true;

                    },

                    movePeople() {
                        for (let person of people) {
                            if (person.destinations.length > 0) {
                                clLib.moveToNextPoint(person);
                            }





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

    // Brandon's Basic Helper Functions
    (function () {
        "use strict";
        let blLIB = {
            getRandomColor() {
                const getByte = _ => 55 + Math.round(Math.random() * 200);
                return `rgba(${getByte()},${getByte()},${getByte()},.9)`;
            },

            getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            getDistance(x1, y1, x2, y2) {
                return Math.sqrt((Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)));
            },

            drawRectangle(ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") {
                ctx.save();
                ctx.fillStyle = fillStyle;
                ctx.beginPath();
                ctx.rect(x, y, width, height);
                ctx.closePath();
                ctx.fill();
                if (lineWidth > 0) {
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = strokeStyle;
                    ctx.stroke();
                }
                ctx.restore();
            },

            drawCircle(ctx, x, y, radius, fillStyle = "gray", startAngle = 0, endAngle = Math.PI * 2, anticlockwise = false) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
                ctx.closePath();
                ctx.fillStyle = fillStyle;
                ctx.globalAlpha = 1;
                ctx.fill();
                ctx.restore();
            }
        };

        if (window) {
            window["blLIB"] = blLIB
        } else {
            throw "'window' is not defined!";
        }
    })();
