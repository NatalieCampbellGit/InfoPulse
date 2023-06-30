/* eslint-disable camelcase */
// get elements from the page
const CurrentTemplate = {
  currentlyEditing: true,
  id: null,
  markdown: null,
  title: null,
  description: null,
  category_id: null,
  publicTemplate: true,
  administratorId: null,
  returnPath: null,
};

// save template
async function saveTemplate() {
  // get the template text from the textarea
  const templateText = document.getElementById("template-text").value.trim();
  // get the template title and the template category
  const templateTitle = document.getElementById("template-title").value.trim();
  let category_id = document.getElementById("template-category").value;
  const templateDescription = document
    .getElementById("template-description")
    .value.trim();
  let publicTemplate = document.getElementById("template-public").checked;
  let administrator_id = CurrentTemplate.administrator_id;

  // basic validation
  if (!templateText) {
    alert("Please enter some template text.");
    return;
  }
  if (!templateTitle) {
    alert("Please enter a template title.");
    return;
  }

  if (!category_id || Number.isNaN(parseInt(category_id))) {
    alert("Please select a template category.");
    return;
  }
  category_id = parseInt(category_id);

  if (!templateDescription) {
    alert("Please enter a template description.");
    return;
  }
  if (templateDescription.length > 255) {
    alert(
      "Please enter a template description that is less than 255 characters."
    );
    return;
  }
  if (publicTemplate === undefined) {
    publicTemplate = true;
  }

  if (!administrator_id || Number.isNaN(parseInt(administrator_id))) {
    administrator_id = 1;
  }
  administrator_id = parseInt(administrator_id);

  if (Number.isNaN(CurrentTemplate.id)) {
    CurrentTemplate.id = 0;
  }

  // create the request data
  const requestData = {
    markdown: templateText,
    title: templateTitle,
    category_id,
    administrator_id,
    description: templateDescription,
    publicTemplate,
  };
  if (CurrentTemplate.id === null || CurrentTemplate.id == 0) {
    // send a POST request with the form data as is a new template
    try {
      const response = await fetch("/api/rmtemplate", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });
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
  } else {
    // send a PUT request with the form data as it is updating an existing template
    try {
      const response = await fetch(`/api/rmtemplate/${CurrentTemplate.id}`, {
        method: "PUT",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });
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
  }

  // return to the requested page
  returnToRequestedPath();
}

function returnToRequestedPath() {
  let returnPath = CurrentTemplate.returnPath;
  if (!returnPath || returnPath === "") {
    returnPath = "/admin";
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
  let templateID = optionsElement.dataset.templateId;
  let administratorId = optionsElement.dataset.administratorId;
  const publicCheckbox = document.getElementById("template-public");
  const publicValue = JSON.parse(publicCheckbox.getAttribute("data-public"));
  const returnPath = optionsElement.dataset.returnPath;

  if (Number.isNaN(templateID)) {
    templateID = 0;
  } else {
    templateID = parseInt(templateID);
  }
  if (Number.isNaN(administratorId)) {
    administratorId = 0;
  } else {
    administratorId = parseInt(administratorId);
  }

  CurrentTemplate.id = templateID;
  CurrentTemplate.title = document.getElementById("template-title").value;
  CurrentTemplate.description = document.getElementById(
    "template-description"
  ).value;
  CurrentTemplate.category_id =
    document.getElementById("template-category").value;
  CurrentTemplate.publicTemplate = publicValue;
  CurrentTemplate.administrator_id = administratorId;
  CurrentTemplate.returnPath = returnPath;

  // get the current template from the api as markdown adds extraneous characters
  if (templateID > 0) {
    try {
      const templateData = await fetch(`/api/rmtemplate/${templateID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!templateData.ok) {
        alert("error! " + templateData.message);
        return;
      }
      const template = await templateData.json();
      CurrentTemplate.markdown = template.markdown;
      CurrentTemplate.html = template.html;
      // add the markdown to the textarea
      document.getElementById("template-text").value = CurrentTemplate.markdown;
    } catch (error) {
      alert("error! " + error.message);
    }
  }
}
// =======================================================================
// detect page load
window.addEventListener("load", async function () {
  // get the data-initial from the category select
  const categorySelect = document.getElementById("template-category");
  const categoryID = categorySelect.getAttribute("data-initial");
  // set the value of the select to the data-initial
  categorySelect.value = categoryID;
  collateInitialInformation();
  CurrentTemplate.currentlyEditing = true;
  // showCorrectEditMenu(EditorView.EDITING);
  // await loadImages();
});

// Add an event listener for the custom events triggered by the editor
window.addEventListener("customEventSave", async function (e) {
  console.log("customEventSave was fired!");
  await saveTemplate();
});

window.addEventListener("customEventCancel", function (e) {
  console.log("customEventCancel was fired!");
  cancelEditingTemplate();
});

// cancel editing
function cancelEditingTemplate() {
  CurrentTemplate.currentlyEditing = false;
  CurrentTemplate.id = null;

  // go back to the requested page
  returnToRequestedPath();
}
