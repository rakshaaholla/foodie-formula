// Function to fetch recipes from the Edamam API
function fetchRecipes(ingredients) {
    const apiKey = 'c3554171e84942746adc8c100d928cbd';
    const apiUrl = `https://api.edamam.com/search?q=${ingredients}&app_id=4f888611&app_key=${apiKey}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.hits)
        .catch(error => {
            console.error('Error fetching data:', error);
            return [];
        });
}

// Function to display the fetched recipes on the webpage
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const { label, image, url } = recipe.recipe;

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.alt = label;

        const titleElement = document.createElement('h3');
        titleElement.textContent = label;

        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.textContent = 'Get Recipe';

        recipeCard.appendChild(imageElement);
        recipeCard.appendChild(titleElement);
        recipeCard.appendChild(linkElement);

        recipeContainer.appendChild(recipeCard);
    });
}

// Function to handle search on click or Enter key press
function performSearch() {
    const ingredientsInput = document.getElementById('ingredientsInput').value;
    fetchRecipes(ingredientsInput)
        .then(recipes => displayRecipes(recipes));
}

// Add event listener for the search button click
document.getElementById('searchBtn').addEventListener('click', performSearch);

// Add event listener for Enter key press in the input field
document.getElementById('ingredientsInput').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        performSearch();
    }
});
function displayDefaultMessage() {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '<h2>Search your favourite recipes</h2>';
}

// Function to handle the home button click
function handleHomeButtonClick() {
    displayDefaultMessage();
    // Any other actions you want to perform when the home button is clicked.
}

// Add event listener for the home button click
document.getElementById('homeButton').addEventListener('click', handleHomeButtonClick);


// Function to toggle between light and dark mode
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        // If dark mode is enabled, store the preference in local storage
        localStorage.setItem('theme', 'dark');
    } else {
        // If light mode is enabled, store the preference in local storage
        localStorage.setItem('theme', 'light');
    }
}

// Function to check the user's preferred theme and apply it
function checkPreferredTheme() {
    const preferredTheme = localStorage.getItem('theme');
    const body = document.body;
    if (preferredTheme === 'dark') {
        body.classList.add('dark-mode');
        // Check the toggle switch when in dark mode
        document.getElementById('themeToggle').checked = true;
    } else {
        body.classList.remove('dark-mode');
        // Uncheck the toggle switch when in light mode
        document.getElementById('themeToggle').checked = false;
    }
}

// Add event listener for the theme toggle switch change
document.getElementById('themeToggle').addEventListener('change', toggleTheme);

// Check the user's preferred theme and apply it on page load
checkPreferredTheme();