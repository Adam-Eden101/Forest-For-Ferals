class Player {
    constructor() {
        this.resources = {
            meat: 0,
            fish: 0,
            wood: 0,
            // Add more resource types as needed
        };
        this.animals = [];
        this.availableHunts = [];
    }

    addResource(type, amount) {
        if (this.resources.hasOwnProperty(type)) {
            this.resources[type] += amount;
        }
    }

    addAnimal(animal) {
        this.animals.push(animal);
    }

    addAvailableHunt(hunt) {
        this.availableHunts.push(hunt);
    }

    // You can add more methods to manage the player's actions and progress
}