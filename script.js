// Array of words for the random sentence
const firstWords = [
    'Lil', 'Big Booty', 'Yo Mama', 'Fucking', 'Confused', 'Brother', 
    'Hemorrhoid', 'Bad Posture', 'Chill', 'Small Face', 'Little Boy',
    'Slightly Racist', 
];
const secondWords = ['Connor', 'Sean', 'Rachel', 'Madeline', 'Nathan', 'Kate', 'Ting'];

// Function to get a random word from an array
function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
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

// Function to check if the current time is between 5:00 AM and 5:05 AM PST
function goTime() {
    const now = new Date();
    const hours = now.getHours(); // Get the current hour
    const minutes = now.getMinutes(); // Get the current minute
    
    // Convert current time to PST time zone
    const pstTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    const pstHours = pstTime.getHours();
    const pstMinutes = pstTime.getMinutes();
    
    // Check if the current time is exactly 5:06 AM PST
    // return hours === 5 && minutes === 7;

    return true;
}


// Call the appropriate function based on the time
window.onload = () => {
    if (goTime()) {
        displayRandomPokemon();
        displayRandomLevel();
    } else {
        document.body.innerHTML = '<p>Come back later</p>';
    }
};
