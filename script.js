// Array of words for the random sentence
const firstWords = [
    'Lil', 'Big Booty', 'Yo Mama', 'Fucking', 'Confused', 'Brother', 
    'Hemorrhoid', 'Bad Posture', 'Small Face', 'Little Boy',
    'Slightly Racist', 'Zesty', 'Stressed Out', 'Smol', 'Thick Dick',
    'Homophobic But Gay', 'Cant Read'
];
const secondWords = ['Connor', 'Sean', 'Rachel', 'Madeline', 'Nathan', 'Kate', 'Ting'];
const type = ['Milf', 'Dilf'];

// Function to get a random word from an array
function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

// Function to display the random type
function displayRandomType() {
    const randomType = getRandomWord(type);
    const typeElement = document.createElement('p');
    typeElement.textContent = `Type: ${randomType}`;
    typeElement.id = 'type';
    document.body.appendChild(typeElement); // Append the type element below the level paragraph
}


// Function to generate a random sentence
function generateRandomSentence() {
    const firstWord = getRandomWord(firstWords);

    let secondWord = getRandomWord(secondWords);
    if (firstWord === 'Big Booty' && (secondWord === 'Rachel' || secondWord === 'Madeline' || secondWord === 'Kate')) {
        // If the first word is 'Big Booty', reselect the second word if it's 'Rachel', 'Madeline', or 'Kate'
        do {
            secondWord = getRandomWord(secondWords);
        } while (secondWord === 'Rachel' || secondWord === 'Madeline' || secondWord === 'Kate');
    }
    const sentence = `${firstWord} ${secondWord}`;
    return sentence;
}

// Function to generate a random level from 1 to 100
function generateRandomLevel() {
    return Math.floor(Math.random() * 100) + 1; // Generates a random integer from 1 to 100
}

// Function to fetch a random Pokemon from the PokéAPI
async function getRandomPokemon() {
    try {
        // Fetch the list of all Pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        // Generate a random index to select a random Pokemon
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemon = data.results[randomIndex];
        
        // Fetch the details of the random Pokemon
        const pokemonResponse = await fetch(randomPokemon.url);
        const pokemonData = await pokemonResponse.json();
        
        // Extract the sprite URL of the random Pokemon
        const spriteUrl = pokemonData.sprites.other['official-artwork'].front_default;
        
        return spriteUrl;
    } catch (error) {
        console.error('Error fetching random Pokemon:', error);
        return null;
    }
}

// Function to display the random Pokemon sprite and sentence
async function displayRandomPokemon() {
    try {
        // Display random Pokemon sprite
        const spriteUrl = await getRandomPokemon();
        if (spriteUrl) {
            const pokemonImage = document.createElement('img');
            pokemonImage.src = spriteUrl;
            pokemonImage.alt = 'Random Pokemon';
            const pokemonContainer = document.getElementById('pokemonContainer');
            pokemonContainer.appendChild(pokemonImage);
        } else {
            console.error('Failed to get random Pokemon sprite.');
        }

        // Display random sentence
        const randomSentence = generateRandomSentence();
        const randomSentenceElement = document.getElementById('randomSentence');
        randomSentenceElement.textContent = randomSentence;

    } catch (error) {
        console.error('Error displaying random Pokemon and sentence:', error);
    }
}

// Function to display the random level
function displayRandomLevel() {
    const randomLevel = generateRandomLevel();
    const levelElement = document.createElement('p');
    levelElement.textContent = `Level: ${randomLevel}`;
    levelElement.id = 'level'; // Set the id to 'level'
    document.body.appendChild(levelElement); // Append the level element to the body or another appropriate container
}

// Function to check if the current time is valid
function goTime() {
    const now = new Date();
    const hours = now.getHours(); // Get the current hour
    const minutes = now.getMinutes(); // Get the current minute
    
    // Convert current time to PST time zone
    const pstTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    const pstHours = pstTime.getHours();
    const pstMinutes = pstTime.getMinutes();
    
    // Check if the current time is exactly 12:12 AM or 12:12 PM PST
    return (pstHours === 0 || pstHours === 12) && pstMinutes === 12;
}

// Call the appropriate function based on the time
window.onload = () => {
    if (goTime()) {
        displayRandomPokemon();
        displayRandomLevel();
        displayRandomType();
        // setInterval(toggleFontSize, 200);
    } else {
        document.body.innerHTML = '<p>Come back at 12:12</p>';
    }
};

// Function to toggle the font size of the random sentence
// Function to toggle the font size of the random sentence
function toggleFontSize() {
    const randomSentenceElement = document.getElementById('randomSentence');
    const currentFontSize = randomSentenceElement.style.fontSize;
    randomSentenceElement.style.fontSize = currentFontSize === '5em' ? '4.9em' : '5em';
}

// Function to toggle the max-height of the image
function toggleImageHeight() {
    const pokemonImage = document.querySelector('#pokemonContainer img');
    const currentMaxHeight = pokemonImage.style.maxHeight;
    pokemonImage.style.maxHeight = currentMaxHeight === '350px' ? '345px' : '350px';
}

// Call the toggle functions every second
setInterval(() => {
    // toggleFontSize();
    toggleImageHeight();
}, 200);

