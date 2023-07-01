// Functions for the template-select.js file
const viewButton = document.getElementById("view-template");
const editButton = document.getElementById("edit-template");
const newButton = document.getElementById("new-template");
const deleteButton = document.getElementById("delete-template");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("template-search-results");
let templateList = document.getElementsByClassName("template-list-item");
const viewHTMLModal = document.getElementById("view-html-modal");
const adminCategoriesButton = document.getElementById("category-admin");

let selectedTemplateId = 0;

// handle admin categories button click
adminCategoriesButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "/categories";
});

// add event handlers to template-list-item
function addEventHandlersToTemplateList() {
  // add event handlers to the template list items
  templateList = document.getElementsByClassName("template-list-item");
  Array.from(templateList).forEach((item) => {
    item.addEventListener("click", markTemplateAsSelected);
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
      addTemplateIDToDataStore(templateId);
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
  await searchForTemplates();
});

async function searchForTemplates() {
  const categoryID = document.getElementById("search-category").value;
  const searchText = document.getElementById("search-title-text").value;
  const searchMarkdown = document.getElementById("search-markdown-text").value;
  const returnFormat = "html"; // ask for html format

  if (categoryID >= 0 || searchText.length > 2 || searchMarkdown.length > 2) {
    searchResults.innerHTML = "";
    addTemplateIDToDataStore("");

    let response;
    try {
      // if there is a category selected or a search term, send the request to the server
      response = await fetch("/api/templates/search", {
        method: "POST",
        body: JSON.stringify({
          id: categoryID,
          searchTerm: searchText,
          searchMarkdown,
          returnFormat,
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
      addEventHandlersToTemplateList();
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
    addEventHandlersToTemplateList();
  }
}

// when the user clicks the View button, show modal with the template's html (with inline css)
viewButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (selectedTemplateId > 0) {
    // get formatted html from the server for the template
    let response;
    try {
      response = await fetch(`/api/templates/formatted/${selectedTemplateId}`);
      if (!response.ok) {
        alert("Error getting formatted template");
        return;
      }
      const htmlFormat = await response.text();
      // show the modal with the formatted html
      document.getElementById("view-html").innerHTML = htmlFormat;
      document.getElementById("view-html-modal").classList.remove("hidden");
    } catch (error) {
      console.log(error);
    }
  }
});

const closeViewHTMLButton = document.getElementById("close-view-html");
closeViewHTMLButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeViewHTMLModal();
});
// Close the modal

function closeViewHTMLModal() {
  viewHTMLModal.classList.add("hidden");
}

// when the user clicks the Edit button, send them to the template's edit page
editButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (selectedTemplateId > 0) {
    // send the user to the edit page for the selected template
    window.location.href = `/api/templates/edit?id=${selectedTemplateId}&path=admin`;
  }
});

// when the user clicks the New button, send them to the template's edit page
newButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "/api/templates/new";
});

// when the user clicks the Delete button, confirm that they want to delete the template
deleteButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (selectedTemplateId > 0) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this template?"
    );
    if (confirmDelete) {
      // send a delete request to the server. If successful, reload the page
      let response;
      try {
        response = await fetch(`/api/templates/delete/${selectedTemplateId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          searchForTemplates();
        }
      } catch (error) {
        console.log(error);
        alert("Error deleting template");
      }
    }
  }
});

function addTemplateIDToDataStore(id) {
  const dataStore = document.getElementById("data-store");
  if (!dataStore) {
    return;
  }
  dataStore.dataset.templateId = id;
}

// add event handlers to the template list items
addEventHandlersToTemplateList();

window.addEventListener("click", function (event) {
  const backdrop = document.querySelector(".backdrop"); // Adjust this selector to target your modal's backdrop
  if (event.target == backdrop) {
    closeViewHTMLModal();
  }
});
