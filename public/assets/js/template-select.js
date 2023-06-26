// Functions for the template-select.js file
const viewButton = document.getElementById("view-template");
const editButton = document.getElementById("edit-template");
const newButton = document.getElementById("new-template");
const deleteButton = document.getElementById("delete-template");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("template-search-results");
let templateList = document.getElementsByClassName("template-list-item");

let selectedTemplateId = 0;

// add event handlers to template-list-item
function addEventHandlers() {
  // add event handlers to the template list items
  templateList = document.getElementsByClassName("template-list-item");
  Array.from(templateList).forEach((item) => {
    item.addEventListener("click", (event) => {
      markTemplateAsSelected(event);
    });
  });
}

function markTemplateAsSelected(event) {
  // get the template list item with the matching id
  const clicked = event.currentTarget;
  // get the data-id attribute from the clicked element
  const templateId = clicked.dataset.id;
  for (let i = 0; i < templateList.length; i++) {
    const id = templateList[i].dataset.id;
    if (id === templateId) {
      templateList[i].classList.add("bg-pulse-lt-blue-400");
      templateList[i].classList.add("text-white");
      templateList[i].classList.remove("bg-pulse-lt-blue-100");
      templateList[i].classList.remove("text-pulse-blue-700");
      // set the module variable to the selected template's id
      selectedTemplateId = templateId;
      console.log(`clicked selectedTemplateId = ${selectedTemplateId}`);
    } else {
      templateList[i].classList.add("bg-pulse-lt-blue-100");
      templateList[i].classList.add("text-pulse-blue-700");
      templateList[i].classList.remove("bg-pulse-lt-blue-400");
      templateList[i].classList.remove("text-white");
    }
  }
}

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const categoryID = document.getElementById("search-category").value;
  const searchText = document.getElementById("search-title-text").value;
  const searchMarkdown = document.getElementById("search-markdown-text").value;
  const returnFormat = "html"; // ask for html format

  if (categoryID >= 0 || searchText.length > 2 || searchMarkdown.length > 2) {
    searchResults.innerHTML = "";
    try {
      // if there is a category selected or a search term, send the request to the server
      const response = await fetch("/api/rmtemplate/search", {
        method: "POST",
        body: JSON.stringify({
          id: categoryID,
          searchTerm: searchText,
          searchMarkdown: searchMarkdown,
          returnFormat: returnFormat,
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
      searchResults.innerHTML = htmlFormat;
    } else {
      searchResults.innerHTML = "";
      alert("Error searching for templates");
    }
    // add back the event handlers to the template list items
    addEventHandlers();
  }
});

// when the user clicks the View button, send them to the template's factsheet
viewButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (selectedTemplateId > 0) {
    window.location.href = `/api/template/view/${selectedTemplateId}`;
  }
});

// when the user clicks the Edit button, send them to the template's edit page
editButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (selectedTemplateId > 0) {
    // send the user to the edit page for the selected template
    window.location.href = `/api/rmtemplate/edit/${selectedTemplateId}`;
    if (response.ok) {
      // if the response is ok, send the user will be sent to the edit page
    } else {
      alert("Error getting template");
    }
  }
});

// when the user clicks the New button, send them to the template's edit page
newButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = `/api/template/new`;
});

// when the user clicks the Delete button, confirm that they want to delete the template
deleteButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (selectedTemplateId > 0) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this template?"
    );
    if (confirmDelete) {
      // send a delete request to the server
    }
  }
});

// add event handlers to the template list items
addEventHandlers();
