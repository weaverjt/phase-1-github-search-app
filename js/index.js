/*
Deliverables
1.You are going to build a JavaScript application which searches GitHub for users by name and displays the results on the screen. 
Clicking on a specific user will show all the repositories for that user.
The index.html file has a form with a search input. When the form is submitted, 
it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
 */


//The search bar 
const search = document.getElementById('search'); 

//This function handles the form submission
function handleFormSubmit(event) {
    event.preventDefault(); // prevent the default form submission behavior 

    const form = event.target; // get the form element
    const q = form.elements[0].value; // get the value of input1

    fetch(`https://api.github.com/users/`+ q +`/repos`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
      }
    })
      .then((response) => response.json())
      .then((json) => {console.log(json), displayUsers(json, q)})
      .catch((error) => {
        // handle any errors
        console.log(error)
      });
  }
  document.addEventListener("DOMContentLoaded", () => {
    //Container for the search
    const githubForm = document.getElementById('github-form');[0];
    githubForm.addEventListener("submit", handleFormSubmit); 
  });
  
//-----------------
//2.Using the results of the search, display information about the users to the page.
// (You might include showing their username, avatar and a link to their profile.
//this displays the list of users---------------
function displayUsers(users, q) {
  const userList = document.getElementById('user-list');

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add('card');
    userList.appendChild(userCard);

    const loginButton = document.createElement("button");
    const userLogin = user.owner.login;
    const userId = user.id; // Get the user's ID
    loginButton.innerHTML = userLogin;
    loginButton.classList.add(q);
    loginButton.setAttribute('id', userId); // Assign user's ID as the button's ID
    // Add event listener to the loginButton
    loginButton.addEventListener("click", getCurrentTarget);
    userCard.appendChild(loginButton);
  });
}
//---------------------

//function for clicking a button to display a specific user's stuff
//does another fetch to find a specific user id 
function getCurrentTarget (event) {

let userId = event.currentTarget.id;
let q = event.currentTarget.classList.value;
console.log(userId);
//const q = event.currentTarget.classList.value; 

fetch(`https://api.github.com/users/`+ q +`/repos`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
      }
    })
      .then((response) => response.json())
      .then((json) => {console.log(json), displayIt(json)})
      .catch((error) => {
        // handle any errors
        console.log(error)
      });

      function displayIt(user) {
        // For the repositories
        const reposList = document.getElementById('repos-list');
        const searchTerm = parseInt(userId);
      
        const thisCard = document.getElementById(searchTerm);
        console.log(thisCard);
       
        const filteredUsers = user.filter((item) => item.id === searchTerm);
    console.log(filteredUsers);
          // Clear the existing content of thisCard
  thisCard.innerHTML = '';

  filteredUsers.forEach((repo) => {
    // Create a div for each repository
    const repoDiv = document.createElement('div');
    repoDiv.classList.add('repository');
    thisCard.appendChild(repoDiv);

    // Create elements to display owner ID and owner repos
    const ownerId = document.createElement('p');
    ownerId.innerHTML = `Owner ID: ${repo.owner.id}`;
    repoDiv.appendChild(ownerId);

    const ownerRepos = document.createElement('p');
    ownerRepos.innerHTML = `Owner Repos: ${repo.owner.repos_url}`;
    repoDiv.appendChild(ownerRepos);
  });
  }

 
    }