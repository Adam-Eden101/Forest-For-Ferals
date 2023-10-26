const player = initPlayer();

updateResourceDisplay(player);
updateAnimalList(player);

function initPlayer() {
    const player = new Player();
    player.addResource('meat', 50);

    const wolf = new Animal("Wolf", 5, "Pack Mentality", "meat", 5);
    wolf.add(5);
    player.addAnimal(wolf);

    return player;
}

function updateResourceDisplay(player) {
    const resourceDisplayDiv = document.getElementById('resource-display');
    resourceDisplayDiv.innerHTML = `
        <div>Meat: ${player.resources.meat}</div>
    `;
}

function updateAnimalList(player) {
    const animalListDiv = document.getElementById('animal-list');
    animalListDiv.innerHTML = player.animals.map(animal => `${animal.name} x${animal.quantity}`).join("<br>");

    const buyWolfButton = document.createElement('button');
    buyWolfButton.textContent = 'Buy Wolf (10 Meat)';
    buyWolfButton.addEventListener('click', () => buyAnimal(player, 'Wolf', 'meat', 10));
    animalListDiv.appendChild(buyWolfButton);
}

function buyAnimal(player, animalName, costType, costAmount) {
    const cost = costType === 'meat' ? costAmount : 0;
    if (player.resources[costType] >= cost) {
        player.addResource(costType, -cost);
        player.animals.find(animal => animal.name === animalName).add(1);
        updateAnimalList(player);
        updateResourceDisplay(player);
    } else {
        alert(`Not enough ${costType} to buy a ${animalName}!`);
    }
}
