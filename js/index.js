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

const userId = event.currentTarget.id;
console.log(userId);
//const q = event.currentTarget.classList.value; 

fetch(`https://api.github.com/users/${userId}/repos`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
      }
    })
      .then((response) => response.json())
      .then((json) => {console.log(json), displayIt(json, userId)})
      .catch((error) => {
        // handle any errors
        console.log(error)
      });

      function displayIt(user, userId) {
        // For the list of users
        console.log(event.currentTarget);
        // For the repositories
        const reposList = document.getElementById('repos-list');
        const searchTerm = userId;
      
        const thisCard = document.getElementById(searchTerm);
        console.log(thisCard);
      
        const filteredUsers = Object.keys(user).forEach(obj => obj.id === searchTerm);
        console.log(filteredUsers);
        //user login li
        const loginLi = document.createElement("li");
        loginLi.innerHTML = user.login;
        thisCard.appendChild(loginLi);
        //user id li
        const idLi = document.createElement("li");
        idLi.innerHTML = user.id;
        thisCard.appendChild(idLi);
        //user avatar li
        const img = document.createElement('img');
        img.src = user.avatar_url;
        img.classList.add("avatar_url")
        thisCard.appendChild(img);
        //repo repos_url
        const repoLi = document.createElement("li");
        repoLi.innerHTML = user.repos;
        reposList.appendChild(repoLi);
      }
 
 
    }



/*
I didn't understand exactly what the deliverable was so I think I did some extra work...

function findUser(user, q) {
const apiObj = [user];
const searchTerm = q;

 // Filter the array based on the login property
 const filteredUsers = apiObj.filter(obj => obj.login === searchTerm);

 // Output the filtered array
 console.log(filteredUsers);

Object.keys(apiObj).forEach((key) => {
  if (searchTerm == user[key].owner.login) {
    const login = user[key].owner.login;
    const id = user[key].owner.id;
    const avatar = user[key].owner.avatar_url;
    const repos = user[key].owner.repos_url;

    displayIt(login, id, avatar, repos);
  }
  else {
    console.log("User Not Found")
  }
});

}    
*/

//3. Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.



//4.Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
