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

// get the add button event
factsheetAddButton.addEventListener("click", linkFactsheetToUser);
// get the personalise button event
factsheetPersonaliseButton.addEventListener("click", personaliseFactsheet);

// get the remove button event
factsheetRemoveButton.addEventListener("click", unlinkFactsheetFromUser);

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
  await searchUsers(searchText);
});

async function searchUsers(searchText = "", userId = 0) {
  // clear the UI
  userFactsheets.innerHTML = "";
  userSearchResults.innerHTML = "";
  selectedUserId = userId;
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
    response = await fetch("/api/users/search", {
      method: "POST",
      body: JSON.stringify({
        id: selectedUserId,
        searchTerm: searchText,
        returnFormat: "html",
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return;
  }

  if (response.ok) {
    const htmlFormat = await response.text();
    // clear the search results, replace with new html
    userSearchResults.innerHTML = htmlFormat;
  } else {
    // eslint-disable-next-line no-undef
    alertModal("InfoPulse Alert", "Error searching for users");
  }
  // add back the event handlers to the user list items
  addEventHandlers();
}

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
    return;
  }
  const reloadFactsheets = userId !== selectedUserId;
  for (let i = 0; i < userList.length; i++) {
    const id = userList[i].dataset.id;
    if (id == userId) {
      userList[i].classList.add("bg-pulse-bluegrey-100");
      userList[i].classList.remove("bg-pulse-bluegrey-50");
      // set the module variable to the selected user's id
      selectedUserId = userId;
      addUserIDToDataStore(userId);
      // show the add factsheet button
      factsheetAddButton.classList.remove("hidden");
    } else {
      userList[i].classList.remove("bg-pulse-bluegrey-100");
      userList[i].classList.add("bg-pulse-bluegrey-50");
    }
  }
  // if the user has changed, reload the factsheets
  if (reloadFactsheets) {
    const htmlFormat = await getFactsheets();
    populateFactsheets(htmlFormat);
  }
}

function markFactsheetAsSelected(event) {
  // get the user factsheet list item with the matching id
  // get the data-id attribute from the clicked element
  const clicked = event.currentTarget;
  const factsheetId = clicked.dataset.id;
  if (!factsheetId || factsheetId === 0) {
    return;
  }
  for (let i = 0; i < factsheetList.length; i++) {
    const id = factsheetList[i].dataset.id;
    if (id == factsheetId) {
      factsheetList[i].classList.add("bg-pulse-bluegrey-100");
      factsheetList[i].classList.remove("bg-white");
      // set the module variable to the selected user's id
      selectedFactsheetId = factsheetId;
      addFactsheetIDToDataStore(factsheetId);
      // show the remove and personalise factsheet buttons
      factsheetRemoveButton.classList.remove("hidden");
      factsheetPersonaliseButton.classList.remove("hidden");
    } else {
      factsheetList[i].classList.remove("bg-pulse-bluegrey-100");
      factsheetList[i].classList.add("bg-white");
    }
  }
}

// edit the factsheet's custom_markdown
async function personaliseFactsheet(event) {
  event.preventDefault();
  if (!selectedFactsheetId || selectedFactsheetId === 0) {
    return;
  }
  window.location.href = `/api/factsheets/personalise/${selectedFactsheetId}`;
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
      `/api/factsheets/user?id=${selectedUserId}&format=html`,
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
  } catch (error) {
    console.log(error);
    return '<p class="bg-pulse-green-500 italic">Error searching for factsheets for the user</p>';
  }
}

// ======================================================================
// This section is to link the factsheet template to the user
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
  let templateId = dataStore.dataset.templateId;
  if (!templateId) {
    return;
  }
  // get the user id from the data-store div
  let userId = dataStore.dataset.userId;
  if (!userId) {
    return;
  }

  templateId = parseInt(templateId);
  userId = parseInt(userId);

  if (templateId === 0 || userId === 0) {
    return;
  }

  // call the API to link the factsheet to the user
  let response;
  try {
    response = await fetch("/api/factsheets/link", {
      method: "POST",
      body: JSON.stringify({
        templateId,
        userId,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    populateFactsheets(
      '<p class="bg-pulse-green-500 italic">Error searching for factsheets for the user</p>'
    );
  }
  // if the response is ok, reload the factsheets
  if (response.ok) {
    const htmlFormat = await getFactsheets();
    populateFactsheets(htmlFormat);
  } else {
    populateFactsheets(
      '<p class="bg-pulse-green-500 italic">Error searching for factsheets for the user</p>'
    );
  }
}

// unlink the factsheet from the user
async function unlinkFactsheetFromUser(event) {
  event.preventDefault();
  if (!selectedFactsheetId || selectedFactsheetId === 0) {
    return;
  }

  // call the API to unlink the factsheet from the user
  let response;
  try {
    response = await fetch(`/api/factsheets/${selectedFactsheetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const htmlFormat = await getFactsheets();
      populateFactsheets(htmlFormat);
    }
  } catch (error) {
    console.log(error);
    populateFactsheets(
      '<p class="bg-pulse-green-500 italic">Error unlinking the factsheet for the user</p>'
    );
  }
}
// ======================================================================

// add event handlers to the user list items
addEventHandlers();

// ======================================================================
// get the event broadcast from the admin-dashboard.js file to search for a particular user

// get the event broadcast from the admin-dashboard.js file to search for a particular user
window.addEventListener("searchForUser", async (event) => {
  // get userId from search detail
  let userId = event.detail.search;
  if (!userId) {
    return;
  }
  if (Number.isNaN(userId)) {
    return;
  }
  userId = parseInt(userId);
  addUserIDToDataStore(userId);

  if (userId !== 0) {
    // search for the user
    await searchUsers("", userId);
  }
});
