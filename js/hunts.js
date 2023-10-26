// Class Definition
class Hunt {
    constructor(name, difficulty, duration) {
        this.name = name;
        this.difficulty = difficulty;
        this.duration = duration;
        this.isCompleted = false;
    }
    
    start(power) {
        console.log(power);
    }
    
    calculateSuccess() {
        // Logic to determine success based on provided power...
    }
}

// Data
const hunts = [
    new Hunt('Forest Hunt', 50, 30),
    new Hunt('Mountain Hunt', 100, 300),
    // Add more hunts as needed...
];

let ongoingHunts = [];
const selectedAnimals = [];

// Hunt-related Functions
function displayAvailableHunts() {
    const huntsDiv = document.getElementById('available-hunts');
    huntsDiv.innerHTML = ''; // Clear the div
    
    hunts.forEach(hunt => {
        const huntItem = document.createElement('div');
        huntItem.classList.add('hunt-item'); // This can be used for styling
        
        const huntName = document.createElement('div');
        huntName.textContent = hunt.name;
        huntItem.appendChild(huntName);
        
        const huntDifficulty = document.createElement('div');
        huntDifficulty.textContent = `Difficulty: ${hunt.difficulty}`;
        huntItem.appendChild(huntDifficulty);
        
        const huntDuration = document.createElement('div');
        huntDuration.textContent = `Duration: ${hunt.duration}`;
        huntItem.appendChild(huntDuration);
        
        const startButton = document.createElement('button');
        startButton.textContent = 'Start Hunt';
        startButton.addEventListener('click', () => showAnimalSelectionModal(hunt));
        huntItem.appendChild(startButton);
        
        huntsDiv.appendChild(huntItem);
    });
}

function startHunt(hunt, totalPower) {
    hunt.start(totalPower);
    hunt.remainingTime = hunt.duration;
    ongoingHunts.push(hunt);
    updateDisplayedHunts();
}

function updateDisplayedHunts() {
    const huntsDiv = document.getElementById('available-hunts');
    huntsDiv.innerHTML = ''; // Clear the div
    
    hunts.forEach(hunt => {
        const huntItem = document.createElement('div');
        huntItem.classList.add('hunt-item'); 
        
        const huntName = document.createElement('div');
        huntName.textContent = hunt.name;
        huntItem.appendChild(huntName);
        
        const huntDifficulty = document.createElement('div');
        huntDifficulty.textContent = `Difficulty: ${hunt.difficulty}`;
        huntItem.appendChild(huntDifficulty);
        
        const huntDuration = document.createElement('div');
        
        if (ongoingHunts.includes(hunt)) {
            huntDuration.textContent = `Time Remaining: ${hunt.remainingTime}`;
            const timer = setInterval(() => {
                hunt.remainingTime--;
                if (hunt.remainingTime <= 0) {
                    clearInterval(timer);
                    hunt.isCompleted = true;
                    updateDisplayedHunts();
                    // Here you can also check for success or failure of the hunt based on the total power vs difficulty
                } else {
                    huntDuration.textContent = `Time Remaining: ${hunt.remainingTime}`;
                }
            }, 1000);
        } else {
            huntDuration.textContent = `Duration: ${hunt.duration}`;
        }
        
        huntItem.appendChild(huntDuration);
        
        if (!hunt.isCompleted && !ongoingHunts.includes(hunt)) {
            const startButton = document.createElement('button');
            startButton.textContent = 'Start Hunt';
            startButton.addEventListener('click', () => showAnimalSelectionModal(hunt));
            huntItem.appendChild(startButton);
        } else if (hunt.isCompleted) {
            // Here you can display some kind of "Completed" label or give rewards.
        }
        
        huntsDiv.appendChild(huntItem);
    });
}

function showAnimalSelectionModal(hunt) {
    const modal = document.getElementById('animal-selection-modal');
    const animalList = document.getElementById('available-animals-for-hunt');
    modal.style.display = 'block';
    
    // 1. Define selectedAnimals
    const selectedAnimals = player.animals.map(animal => ({
        ...animal,
        selectedQuantity: 0
    }));
    
    animalList.innerHTML = `<h2>${hunt.name} (${hunt.duration}s)</h2>`;
    
    for (let i = 0; i < player.animals.length; i++) {
        const animal = player.animals[i];
        
        // Create container for each animal
        const animalContainer = document.createElement('div');
        animalContainer.className = 'available-animals-for-hunt-line';
        
        // Create label for animal count
        const label = document.createElement('span');
        label.innerHTML = `0/${animal.quantity} ${animal.name}`;
        animalContainer.appendChild(label);
        
        // 2. Attach click handlers
        
        // "+" button
        const addButton = document.createElement('button');
        addButton.innerHTML = '+';
        addButton.onclick = () => {
            selectedAnimals[i].selectedQuantity++;
            if (selectedAnimals[i].selectedQuantity > animal.quantity) {
                selectedAnimals[i].selectedQuantity = animal.quantity;
            }
            updateDisplay();
        };
        animalContainer.appendChild(addButton);
        
        // "-" button
        const subtractButton = document.createElement('button');
        subtractButton.innerHTML = '-';
        subtractButton.onclick = () => {
            selectedAnimals[i].selectedQuantity--;
            if (selectedAnimals[i].selectedQuantity < 0) {
                selectedAnimals[i].selectedQuantity = 0;
            }
            updateDisplay();
        };
        animalContainer.appendChild(subtractButton);
        
        animalList.appendChild(animalContainer);
    }
    
    // 3. Update the displayed count
    function updateDisplay() {
        for (let i = 0; i < player.animals.length; i++) {
            const animal = player.animals[i];
            const label = animalList.getElementsByClassName('available-animals-for-hunt-line')[i].getElementsByTagName('span')[0];
            label.innerHTML = `${selectedAnimals[i].selectedQuantity}/${animal.quantity} ${animal.name}`;
        }
    }
    
    const confirmButton = document.getElementById('confirm-selection');
    confirmButton.onclick = () => {
        const totalPower = selectedAnimals.reduce((sum, animal) => sum + animal.power * animal.selectedQuantity, 0);
        hunt.start(totalPower);
        updateOngoingHunts();
        modal.style.display = 'none'; // Close the modal
    }
}


function toggleAnimalForHunt(animal) {
    const index = selectedAnimals.indexOf(animal);
    if (index === -1) {
        if (selectedAnimals.length < 10) {
            selectedAnimals.push(animal);
        } else {
            alert('You can select up to 10 animals only!');
        }
    } else {
        selectedAnimals.splice(index, 1);
    }
}

function updateOngoingHunts() {
    // ... implementation ...
}

function collectHuntRewards(hunt) {
    // ... implementation ...
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const startHuntButton = document.getElementById('start-hunt-button');
    displayAvailableHunts();
    if (startHuntButton) {
        startHuntButton.addEventListener('click', () => showAnimalSelectionModal(someHunt)); // You still need to determine which hunt to start.
    }
    
    // Any other event listeners related to hunting...
});
