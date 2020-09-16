

    'use strict'
    
    //Chase Lear, Person, Building, makePerson, createPath
    
    //PERSON OBJECT
    class Person{
        constructor(houseNumber, hasMask, infected) {
            this.houseNumber = houseNumber;
            this.hasMask = hasMask;
            this.infected = infected;
            this.x = 0;
            this.y = 0;
        }

    }

    //BUILDING OBJECT
    class Building{
        constructor(x,y)  {
            this.number;
            this.members = [];
            this.x = x;
            this.y = y;

        }

    }



    //MAKES A PERSON OBJECT
    function makePerson() {
        //what house they belong in
        let aHouseNumber = blLIB.getRandomInt(0, homeCount);

        //are they wearing a mask?
        let wearsMask = blLIB.getRandomInt(0, 1);

        //are they infected?
        let isInfected = blLIB.getRanomInt(0, 1);

        //make person
        let aPerson = new Person(aHouseNumber, wearsMask, isInfected);

        //put into people array
        people.push(aPerson);

        //put person in proper home
        for (let home of homes) {
            if (home.number == aPerson.houseNumber) {
                home.members.push(aPerson);

            }

        }
    }

    //RETURNS 2D ARRAY OF XY LOCATIONS FOR A PERSON TO FOLLLOW
    function createPath(person) {

        //2d array of xy coordinates
        let pathArray = [];

        //how many destinations?
        let destinations = blLIB.getRandomInt(0, storeCount);
        
        //bail early if it's 0
        if (destinations ==0) 
            return 0;

        //find this person's home
        let thisHome;
        for (let home of homes) {
            if (home.number == person.houseNumber) {
                thisHome = home;
            }
        }


        for (let i = 0; i < destinations; i++) {

            //xy array;
            let xyPair = [];

            //put coords into innerArray
            for (let store of stores) {
                if (store.number == i) {
                    xyPair.push(store.x);
                    xyPair.push(store.y);
                }
            }
            //put that in the big array
            pathArray.push(xyPair);
        }
           
        //find coords of home
        let xyPair = [thisHome.x, thisHome.y]
      

        //add coords of person's home
        pathArray.push(xyPair);

        //return the pathArray
        return pathArray;

    }

