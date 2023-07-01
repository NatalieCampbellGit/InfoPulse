/* eslint-disable camelcase */
// get elements from the page
const CurrentFactsheet = {
  currentlyEditing: true,
  id: null,
  markdown: null,
  administratorId: null,
  returnPath: null,
  userId: 0,
};

// save template
async function saveFactsheet() {
  // get the template text from the textarea
  const templateText = document.getElementById("template-text").value.trim();
  let administrator_id = CurrentFactsheet.administrator_id;

  // basic validation
  if (!templateText) {
    alert("Please enter some template text.");
    return;
  }

  if (!administrator_id || Number.isNaN(parseInt(administrator_id))) {
    administrator_id = 1;
  }
  administrator_id = parseInt(administrator_id);

  // this must always be >0 as it is never a new factsheet
  if (Number.isNaN(CurrentFactsheet.id)) {
    CurrentFactsheet.id = 0;
    returnToRequestedPath();
  }

  // create the request data
  const requestData = {
    markdown: templateText,
    administrator_id,
  };

  // send a PUT request with the markdown to update an existing factsheet
  try {
    const response = await fetch(
      `/api/factsheets/custom_markdown/${CurrentFactsheet.id}`,
      {
        method: "PUT",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      }
    );
    const returnedData = await response.json();
    // check if the request was successful
    if (!response.ok) {
      // get the response body
      alert("error! " + returnedData.message);
      return;
    }
  } catch (error) {
    alert("error! " + error.message);
    return;
  }

  // return to the requested page
  returnToRequestedPath();
}

function returnToRequestedPath() {
  let returnPath = CurrentFactsheet.returnPath;
  if (!returnPath || returnPath === "") {
    returnPath = `/admin-dashboard/${CurrentFactsheet.userId}`;
  } else {
    if (returnPath.substring(0, 1) !== "/") {
      returnPath = "/" + returnPath;
    }
  }
  window.location.href = returnPath;
}

//= ======================================================================
// grab the initial data from the page
async function collateInitialInformation() {
  const optionsElement = document.getElementById("markdown-edit-options");
  let factsheet_id = optionsElement.dataset.factsheetId;
  let administratorId = optionsElement.dataset.administratorId;
  const returnPath = optionsElement.dataset.returnPath;

  if (Number.isNaN(factsheet_id)) {
    factsheet_id = 0;
  } else {
    factsheet_id = parseInt(factsheet_id);
  }
  if (Number.isNaN(administratorId)) {
    administratorId = 0;
  } else {
    administratorId = parseInt(administratorId);
  }

  CurrentFactsheet.id = factsheet_id;
  CurrentFactsheet.administrator_id = administratorId;
  CurrentFactsheet.returnPath = returnPath;

  // get the current custom_markdown from the api as handlebars adds extraneous characters to the markdown
  if (factsheet_id > 0) {
    try {
      const factsheetData = await fetch(`/api/factsheets/${factsheet_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!factsheetData.ok) {
        alert("error! " + factsheetData.message);
        return;
      }
      const factsheet = await factsheetData.json();
      CurrentFactsheet.markdown = factsheet.custom_markdown;
      CurrentFactsheet.html = factsheet.html;
      CurrentFactsheet.userId = factsheet.user_id;

      // add the markdown to the textarea
      document.getElementById("template-text").value =
        CurrentFactsheet.markdown;
    } catch (error) {
      alert("error! " + error.message);
    }
  }
}
// =======================================================================
// detect page load
window.addEventListener("load", async function () {
  // set the value of the select to the data-initial
  collateInitialInformation();
  CurrentFactsheet.currentlyEditing = true;
});

// Add an event listener for the custom events triggered by the editor
window.addEventListener("customEventSave", async function (e) {
  await saveFactsheet();
});

window.addEventListener("customEventCancel", function (e) {
  cancelEditingTemplate();
});

// cancel editing
function cancelEditingTemplate() {
  CurrentFactsheet.currentlyEditing = false;
  CurrentFactsheet.id = null;

  // go back to the requested page
  returnToRequestedPath();
}
