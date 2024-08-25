// Global variable to select the div with a class of "overview" where the profile information will appear
const overviewDiv = document.querySelector('.overview');

// Store your GitHub username
const username = "ClareMaguire1111";

// Global variable to select the unordered list to display the repos list
const reposList = document.querySelector('.repo-list'); // Assuming the <ul> has a class of "repo-list"

// New global variables
// Select the section with a class of "repos" where all your repo information appears
const reposSection = document.querySelector('.repos');

// Select the section with a class of "repo-data" where the individual repo data will appear
const repoDataSection = document.querySelector('.repo-data');

// Function to display the fetched user information on the page
function displayUserInfo(data) {
    const userInfoDiv = document.createElement('div');
    userInfoDiv.className = 'user-info';

    userInfoDiv.innerHTML = `
      <figure>
        <img alt="user avatar" src="${data.avatar_url}" />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div>
    `;

    overviewDiv.appendChild(userInfoDiv);

    // Call the function to fetch the repositories after displaying the user info
    fetchRepos();
}

// Async function to fetch information from GitHub
async function fetchGitHubProfile() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    
    displayUserInfo(data);
}

// Async function to fetch the repositories
async function fetchRepos() {
    // Fetch the repositories from GitHub, sorted by the most recently updated and limited to 100 per page
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    
    // Resolve the JSON response
    const reposData = await reposResponse.json();
    
    // Log the response to check the data
    console.log(reposData);
    
    // Call the function to display the repos
    displayRepos(reposData);
}

// Function to display information about each repo
function displayRepos(repos) {
    repos.forEach(repo => {
        // Create a list item for each repo
        const repoItem = document.createElement('li');
        repoItem.className = 'repo';
        
        // Create an <h3> element with the repo name
        const repoName = document.createElement('h3');
        repoName.textContent = repo.name;
        
        // Append the <h3> to the list item
        repoItem.appendChild(repoName);
        
        // Append the list item to the unordered list (reposList)
        reposList.appendChild(repoItem);
    });
}

// Async function to get specific repo information
async function fetchRepoInfo(repoName) {
    // Fetch specific repository information
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    
    // Resolve and save the JSON response
    const repoInfo = await response.json();
    
    // Log the repo information to the console
    console.log(repoInfo);

    // Fetch data from the language_url property of repoInfo
    const fetchLanguages = await fetch(repoInfo.languages_url);
    
    // Resolve and save the JSON response
    const languageData = await fetchLanguages.json();
    
    // Log the language data to the console
    console.log(languageData);
    
    // Create an array to store the languages
    const languages = [];
    
    // Loop through the languageData object and add each language to the array
    for (const language in languageData) {
        languages.push(language);
    }
    
    // Log the languages array to the console
    console.log(languages);
    
    // Call the function to display the specific repo information
    displayRepoInfo(repoInfo, languages);
}

// Function to display specific repo information
function displayRepoInfo(repoInfo, languages) {
    // Empty the HTML of the section with a class of "repo-data"
    repoDataSection.innerHTML = '';
    
    // Create a new div element to hold the repo information
    const repoDiv = document.createElement('div');
    
    // Add the repo information to the div
    repoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description || 'No description available'}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(', ')}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    
    // Append the new div element to the section with a class of "repo-data"
    repoDataSection.appendChild(repoDiv);
    
    // Unhide (show) the "repo-data" element and hide the "repos" element
    repoDataSection.classList.remove('hide');
    reposSection.classList.add('hide');
}

// Event listener for the click event on the repo list
reposList.addEventListener('click', (e) => {
    // Check if the clicked element is an <h3> element
    if (e.target.matches('h3')) {
        // Create a variable to store the name of the clicked repo
        const repoName = e.target.innerText;
        // Call the function to fetch specific repo information
        fetchRepoInfo(repoName);
    }
});

// Call the function to fetch and display the GitHub profile information
fetchGitHubProfile();

