// Global variable to select the div with a class of "overview" where the profile information will appear
const overviewDiv = document.querySelector('.overview');

// Store your GitHub username
const username = "ClareMaguire1111";

// Global variable to select the unordered list to display the repos list
const reposList = document.querySelector('.repo-list'); // Assuming the <ul> has a class of "repo-list"

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

// Call the function to fetch and display the GitHub profile information
fetchGitHubProfile();

