document.addEventListener('DOMContentLoaded', function () {
    // Initialize resources and animal counts
    let resources = {
        Meat: 0
    };
    let wolfCount = 5; // Starting with 5 wolves

    // Load animals from JSON
    fetch('./json/animals.json')
        .then(response => response.json())
        .then(data => {
            // Find the wolf data
            const wolfData = data.find(animal => animal.name === 'Wolf');
            // Create an instance of the Animal class
            const wolf = new Animal(wolfData.name, wolfData.power, wolfData.ability);
            // Display wolf data in the sidebar
            const animalList = document.getElementById('animal-list');
            const wolfItem = document.createElement('li');
            wolfItem.textContent = `${wolf.name}: Power ${wolf.power}, Ability: ${wolf.ability}`;
            animalList.appendChild(wolfItem);
            // Update the cost for buying a wolf
            const buyWolfButton = document.getElementById('buy-wolf');
            const wolfCost = wolfData.cost.amount;
            const wolfCostType = wolfData.cost.type;
            buyWolfButton.textContent = `Buy Wolf (${wolfCost} ${wolfCostType})`;
            // Handle the "Buy Wolf" button click event
            buyWolfButton.addEventListener('click', function () {
                if (resources[wolfCostType] >= wolfCost) {
                    // Deduct the cost from resources
                    resources[wolfCostType] -= wolfCost;
                    meatDisplay.textContent = `${resources.Meat} Meat`;
                    // Increment the wolf count
                    wolfCount++;
                    wolfCountItem.textContent = `${wolfCount} ${wolf.name}s`;
                } else {
                    alert(`Not enough ${wolfCostType} to buy a wolf!`);
                }
            });
        })
        .catch(error => console.error('Error loading animals:', error));

    // Load captains from JSON
    fetch('./json/captains.json')
        .then(response => response.json())
        .then(data => {
            // Find the captain data
            const iemyrData = data.find(captain => captain.name === 'Iemyr');
            // Create an instance of the Captain class
            const iemyr = new Captain(iemyrData.name, iemyrData.ability);
            // Display captain data in the sidebar
            const captainList = document.getElementById('captain-list');
            const iemyrItem = document.createElement('li');
            iemyrItem.textContent = `${iemyr.name}: Ability: ${iemyr.ability}`;
            captainList.appendChild(iemyrItem);
        })
        .catch(error => console.error('Error loading captains:', error));

    // ... (the rest of your code remains the same)
});
