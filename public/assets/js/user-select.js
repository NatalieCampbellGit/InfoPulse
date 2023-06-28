const searchUser = document.getElementById("user-search-button");
const userSearchText = document.getElementById("user-search-text");
const userSearchResults = document.getElementById("user-search-results");
const userFactsheets = document.getElementById("user-factsheets");
const factsheetAddButton = document.getElementById("factsheet-add");
const factsheetRemoveButton = document.getElementById("factsheet-remove");
const factsheetPersonaliseButton = document.getElementById(
  "factsheet-personalise"
);

let factsheetList = document.getElementsByClassName("user-factsheet-listitem");
let userList = document.getElementsByClassName("user-list-item");

//get the add button event
factsheetAddButton.addEventListener("click", linkFactsheetToUser);

let selectedUserId = 0;
let selectedFactsheetId = 0;

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
  userFactsheets.innerHTML = "";
  userSearchResults.innerHTML = "";
  selectedUserId = 0;
  selectedFactsheetId = 0;
  addUserIDToDataStore("");
  addFactsheetIDToDataStore("");
  factsheetAddButton.classList.add("hidden");
  factsheetRemoveButton.classList.add("hidden");
  factsheetPersonaliseButton.classList.add("hidden");

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
    item.addEventListener("click", markUserAsSelected);
  });
  factsheetList = document.getElementsByClassName("user-factsheet-listitem");
  Array.from(factsheetList).forEach((item) => {
    item.addEventListener("click", markFactsheetAsSelected);
  });
}

async function markUserAsSelected(event) {
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
      addUserIDToDataStore(userId);
      // show the add factsheet button
      factsheetAddButton.classList.remove("hidden");
    } else {
      console.log;
      userList[i].classList.remove("bg-pulse-green-300");
      userList[i].classList.add("bg-pulse-green-100");
    }
  }
  // if the user has changed, reload the factsheets
  if (reloadFactsheets) {
    htmlFormat=await getFactsheets()
    populateFactsheets(htmlFormat);
  }
}

function markFactsheetAsSelected(event) {
  // get the user factsheet list item with the matching id
  // get the data-id attribute from the clicked element
  const clicked = event.currentTarget;
  const factsheetId = clicked.dataset.id;
  if (!factsheetId || factsheetId === 0) {
    console.log("No factsheet id found");
    return;
  }
  for (let i = 0; i < factsheetList.length; i++) {
    const id = factsheetList[i].dataset.id;
    console.log(`id = ${id}`);
    if (id == factsheetId) {
      factsheetList[i].classList.add("bg-pulse-green-300");
      factsheetList[i].classList.remove("bg-white");
      // set the module variable to the selected user's id
      selectedFactsheetId = factsheetId;
      addFactsheetIDToDataStore(factsheetId);
      // show the remove and personalise factsheet buttons
      factsheetRemoveButton.classList.remove("hidden");
      factsheetPersonaliseButton.classList.remove("hidden");
    } else {
      console.log;
      factsheetList[i].classList.remove("bg-pulse-green-300");
      factsheetList[i].classList.add("bg-white");
    }
  }
}

// add the user id to the data-store div
function addUserIDToDataStore(id) {
  const dataStore = document.getElementById("data-store");
  if (!dataStore) {
    return;
  }
  dataStore.dataset.userId = id;
} // add the factsheet id to the data-store div
function addFactsheetIDToDataStore(id) {
  const dataStore = document.getElementById("data-store");
  if (!dataStore) {
    return;
  }
  dataStore.dataset.factsheetId = id;
}

// show the user's factsheets
async function populateFactsheets(htmlFormat = "") {
  factsheetRemoveButton.classList.add("hidden");
  factsheetPersonaliseButton.classList.add("hidden");
  userFactsheets.innerHTML = htmlFormat;
  addEventHandlers();
}

// get the user's factsheets, return HTML
async function getFactsheets() {
  // if no user is selected, return empty string
  if (!selectedUserId || selectedUserId === 0) {
    userSearchText.focus();
    return '<p class="bg-pulse-green-500 italic">No user selected.</p>';
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
    if (response.ok) {
      return await response.text();
    } else {
      return '<p class="bg-pulse-green-500 italic">Error searching for factsheets for the user</p>';
    }
  } catch (err) {
    console.log(err);
    return '<p class="bg-pulse-green-500 italic">Error searching for factsheets for the user</p>';
  }
}

// ======================================================================
//This section is to link the factsheet template to the user
// it uses data stored by the handlebars components in the webpage
// to link the factsheet template to the user
// would use local storage, but can't trust it is up to date
// so using the data-store div instead
async function linkFactsheetToUser() {
  // get the data-store div
  const dataStore = document.getElementById("data-store");
  if (!dataStore) {
    return;
  }
  // get the factsheet id from the data-store div
  const templateId = dataStore.dataset.templateId;
  if (!templateId) {
    return;
  }
  // get the user id from the data-store div
  const userId = dataStore.dataset.userId;
  if (!userId) {
    return;
  }

  // call the API to link the factsheet to the user
  let response;
  try {
    response = await fetch(`/api/rmfactsheets/link`, {
      method: "POST",
      body: JSON.stringify({
        templateId: templateId,
        userId: userId,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    populateFactsheets( '<p class="bg-pulse-green-500 italic">Error searching for factsheets for the user</p>')
  }
  // if the response is ok, reload the factsheets
  if (response.ok) {
    populateFactsheets(await response.text());
  } else {
    populateFactsheets('<p class="bg-pulse-green-500 italic">Error searching for factsheets for the user</p>');
  }
}

// ======================================================================

// add event handlers to the user list items
addEventHandlers();
