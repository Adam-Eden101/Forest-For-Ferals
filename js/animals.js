class Animal {
    constructor(name, power, ability, type, amount) {
        this.name = name;
        this.power = power;
        this.ability = ability;
        this.cost = {
            type: type,
            amount: amount,
        };
        this.quantity = 0;
    }
    add(quantity) {
        this.quantity += quantity;
    }
    displayAnimals() {

    }
}
