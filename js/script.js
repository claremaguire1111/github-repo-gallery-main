// Global variable to select the div with a class of "overview" where the profile information will appear
const overviewDiv = document.querySelector('.overview');

// Store your GitHub username
const username = "ClareMaguire1111";

// Function to display the fetched user information on the page
function displayUserInfo(data) {
    // Create a new div and give it a class of "user-info"
    const userInfoDiv = document.createElement('div');
    userInfoDiv.className = 'user-info';

    // Populate the div with the user information using innerHTML
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

    // Append the div to the overview element
    overviewDiv.appendChild(userInfoDiv);
}

// Async function to fetch information from GitHub
async function fetchGitHubProfile() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    
    // Call the displayUserInfo function with the fetched data
    displayUserInfo(data);
}

// Call the function to fetch and display the GitHub profile information
fetchGitHubProfile();



