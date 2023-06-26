const searchUser = document.getElementById("user-search-button");
const userSearchText = document.getElementById("user-search-text");
const userSearchResults = document.getElementById("user-search-results");
const userFactsheets = document.getElementById("user-factsheets");
// const userSelect = document.getElementById("user-select");

let userList = document.getElementsByClassName("user-list-item");
let selectedUserId = 0;

searchUser.addEventListener("click", async (event) => {
  event.preventDefault();
  // get the search text
  const searchText = userSearchText.value.trim();
  // if the search text is <2 characters, do nothing
  if (searchText.length < 2) {
    userSearchText.focus();
    return;
  }
  // clear the UI
  userSearchResults.innerHTML = "";

  // call the search API, expecting HTML back
  // using handlebars to format the database search results
  // use post to use the body to send the search text
  let response;
  try {
    response = await fetch(`/api/rmusers/search`, {
      method: "POST",
      body: JSON.stringify({
        id: 0,
        searchTerm: searchText,
        returnFormat: "html",
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    return;
  }

  if (response.ok) {
    const htmlFormat = await response.text();
    // clear the search results, replace with new html
    userSearchResults.innerHTML = htmlFormat;
  } else {
    alert("Error searching for users");
  }
  // add back the event handlers to the user list items
  addEventHandlers();
});

// add event handlers to user-list-item
function addEventHandlers() {
  // add event handlers to the user list items
  userList = document.getElementsByClassName("user-list-item");
  Array.from(userList).forEach((item) => {
    item.addEventListener("click", (event) => {
      markUserAsSelected(event);
    });
  });
}

function markUserAsSelected(event) {
  // get the user list item with the matching id
  // get the data-id attribute from the clicked element
  const clicked = event.currentTarget;
  const userId = clicked.dataset.id;
  if (!userId || userId === 0) {
    console.log("No user id found");
    return;
  }
  const reloadFactsheets = userId !== selectedUserId;
  for (let i = 0; i < userList.length; i++) {
    const id = userList[i].dataset.id;
    console.log(`id = ${id}`);
    if (id == userId) {
      userList[i].classList.add("bg-pulse-green-300");
      userList[i].classList.remove("bg-pulse-green-100");
      // set the module variable to the selected user's id
      selectedUserId = userId;
      console.log(`clicked selectedUserId = ${selectedUserId}`);
    } else {
      console.log;
      userList[i].classList.remove("bg-pulse-green-300");
      userList[i].classList.add("bg-pulse-green-100");
    }
  }
  // if the user has changed, reload the factsheets
  if (reloadFactsheets) {
    userFactsheets.innerHTML = "";
    populateFactsheets();
  }
}

// show the user's factsheets
async function populateFactsheets() {
  // if no user is selected, do nothing
  if (!selectedUserId || selectedUserId === 0) {
    userSearchText.focus();
    return;
  }
  // call the API to get the user's factsheets
  // call the search API, expecting HTML back
  // using handlebars to format the database search results
  let response;
  try {
    userFactsheets.innerHTML = "";
    response = await fetch(
      `/api/rmfactsheets?id=${selectedUserId}&format=html`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.log(err);
    return;
  }

  if (response.ok) {
    const htmlFormat = await response.text();
    console.log(htmlFormat);
    // clear the search results, replace with new html
    userFactsheets.innerHTML = htmlFormat;
  } else {
    alert("Error searching for factsheets for the user");
  }
}

// add event handlers to the template list items
addEventHandlers();
