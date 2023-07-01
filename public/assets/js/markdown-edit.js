// Used to edit markdown
const imageSelect = document.getElementById("modal-image-select");
const buttons = document.querySelectorAll(".btn-style");

// event for when the Save button is clicked
const eventSave = new CustomEvent("customEventSave");
const eventCancel = new CustomEvent("customEventCancel");

buttons.forEach((button) => {
  button.addEventListener("click", handleEditMenuClick);
});

const EditorView = {
  VIEWING: "viewing",
  EDITING: "editing",
};

const CurrentItem = {
  currentlyEditing: false,
  returnPath: "",
};

// =======================================================================
// ** INSERT AN IMAGE LINK INTO TEMPLATE **
// =======================================================================
// Open the modal button
function openInsertImageLinkModal() {
  document.getElementById("insert-image-link-modal").style.display = "block";
}

// Upload New Image button (modal over this modal)
document
  .getElementById("upload-new-image")
  .addEventListener("click", function () {
    // empty out the ui
    document.getElementById("image-title").value = "";
    document.getElementById("image-description").value = "";

    document.getElementById("upload-image-modal").style.display = "block";

    // set focus to the button
    document.getElementById("file-upload-label").focus();
  });

// preview the file in the img when the user selects a file from the select
imageSelect.addEventListener("change", function () {
  const imageId = imageSelect.options[imageSelect.selectedIndex].value;
  const imageDescription =
    imageSelect.options[imageSelect.selectedIndex].dataset.description;
  showImagePreview(imageId, imageDescription);
});

// display the image preview
function showImagePreview(imageId, description) {
  const imagePreview = document.getElementById("modal-selected-image");
  // some weird quirk with getting the value from select option where
  // imageId is undefined, but not treated as undefined (could be an object)
  imagePreview.classList.add("hidden");
  imagePreview.src = "";
  imagePreview.alt = "";

  // so test for NaN instead after parseInt
  if (!imageId) {
    return;
  }

  if (Number.isNaN(parseInt(imageId))) {
    return;
  }

  if (imageId < 1) {
    return;
  }

  if (!description) {
    description = "template image";
  }
  imagePreview.src = `/api/images/${imageId}`;
  imagePreview.alt = description;
  imagePreview.classList.remove("hidden");
}

// Insert the image link into the template button
document
  .getElementById("insert-image-link")
  .addEventListener("click", function () {
    // get the image from the select
    const imageId = imageSelect.options[imageSelect.selectedIndex].value;
    const imageDescription =
      imageSelect.options[imageSelect.selectedIndex].dataset.description;
    // get the class from the select
    const classSelect = document.getElementById("modal-class-select");
    const selectedOption = classSelect.options[classSelect.selectedIndex];
    const classCSSName = selectedOption.value.trim();

    // get the default width from the select
    let defaultWidthSelect = selectedOption.getAttribute("data-defaultwidth");
    if (defaultWidthSelect === undefined) {
      defaultWidthSelect = "1200";
    }
    // validate
    if (!imageId || Number.isNaN(parseInt(imageId)) || !classCSSName) {
      alert("Please select an image and a style css class for the image.");
      return;
    }
    // construct proper html img tag to allow use of css class
    let imgTag = `<img src="/api/images/${imageId}" alt="${imageDescription}" class="${classCSSName}" width="${defaultWidthSelect}">`;

    // add trailing new lines
    imgTag = imgTag + "\n" + "\n";
    // insert the img tag at the cursor
    // this function adds 2 leading \n
    insertOnSeparateLine(document.getElementById("template-text"), imgTag);
    // close the modal
    document.getElementById("insert-image-link-modal").style.display = "none";
  });

// Close the modal button
document
  .getElementById("cancel-insert-image-link")
  .addEventListener("click", function () {
    document.getElementById("insert-image-link-modal").style.display = "none";
  });
// =======================================================================
// ** UPLOAD AN IMAGE INTO DATABASE **
// =======================================================================
document
  .getElementById("upload-file")
  .addEventListener("click", async function (event) {
    // prevent the form from submitting normally
    event.preventDefault();

    // get the file, title, and description
    const fileInput = document.querySelector("#file-upload");
    const titleInput = document.querySelector("#image-title");
    const descriptionInput = document.querySelector("#image-description");

    const file = fileInput.files[0];
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    // basic validation
    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (!title) {
      alert("Please enter a title.");
      return;
    }

    if (!description) {
      alert("Please enter a description.");
      return;
    }

    // create a new FormData object
    const formData = new FormData();

    // append the file, title, and description to the form data
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    try {
      // send a POST request with the form data
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      const returnedData = await response.json();
      // check if the request was successful
      if (!response.ok) {
        // get the response body
        alert("error! " + returnedData.message);
        return;
      }

      const imageId = returnedData.id;
      if (!imageId || Number.isNaN(parseInt(imageId))) {
        alert("error! " + returnedData.message);
        return;
      }
      // reload the images into the select
      await loadImages();

      // select the image in the select
      imageSelect.value = imageId;
      // show the image preview
      showImagePreview(imageId, returnedData.description);

      // hide this modal
      document.getElementById("upload-image-modal").style.display = "none";
    } catch (error) {
      console.error("An error occurred while uploading the image:", error);
      alert(error.message);
    }
  });

// detect when a file is selected and update the file name
document.getElementById("file-upload").addEventListener("change", function () {
  updateFileName();
});

// update the file name when a file is selected
function updateFileName() {
  const input = document.getElementById("file-upload");
  const fileName = document.getElementById("upload-file-name");
  if (input.files && input.files.length > 0) {
    fileName.textContent = input.files[0].name;
  }
}

document.getElementById("upload-cancel").addEventListener("click", function () {
  document.getElementById("upload-image-modal").style.display = "none";
});
// =======================================================================
// ** SHOW MODAL FOR INSERTING A HYPERLINK **
// =======================================================================
// show the modal
function openInsertURLModal() {
  // set to empty
  document.getElementById("url-title").value = "";
  document.getElementById("url-hyperlink").value = "";

  // show the modal
  document.getElementById("insert-url-modal").style.display = "block";
  // set the focus to the url input
  document.getElementById("url-title").focus();
}

document
  .getElementById("insert-url")
  .addEventListener("click", function (event) {
    event.preventDefault();
    // get the values from the form
    const title = document.getElementById("url-title").value.trim();
    const url = document.getElementById("url-hyperlink").value.trim();
    // validate data
    if (!title || !url) {
      alert("Please enter a title and a url.");
      return;
    }
    // construct the markdown
    const markdown = `[${title}](${url})`;
    // insert the markdown at the cursor
    insertAtCursor(document.getElementById("template-text"), markdown, true);
    // close the modal
    document.getElementById("insert-url-modal").style.display = "none";
  });

// Close the modal button with cancel
document
  .getElementById("cancel-insert-url")
  .addEventListener("click", function () {
    document.getElementById("insert-url-modal").style.display = "none";
  });

// =======================================================================
// ** Handle click events for the edit menu
// =======================================================================
async function handleEditMenuClick(event) {
  event.preventDefault();

  // see if it is a button that was clicked
  if (
    event.currentTarget.tagName === "BUTTON" ||
    event.currentTarget.tagName === "I"
  ) {
    const textEntryControl = document.getElementById("template-text");
    // get the value of data-tag
    const tag = event.currentTarget.dataset.tag;
    switch (tag) {
      case "**":
        surroundAtCursor(textEntryControl, tag);
        break;
      case "*":
        surroundAtCursor(textEntryControl, tag);
        break;
      case "***":
        surroundAtCursor(textEntryControl, tag);
        break;
      case "~~":
        surroundAtCursor(textEntryControl, tag);
        break;
      case "---":
        insertOnSeparateLine(textEntryControl, tag);
        break;
      case "#":
        addMarkdownHeadingTag(textEntryControl, tag);
        break;
      case "##":
        addMarkdownHeadingTag(textEntryControl, tag);
        break;
      case "###":
        addMarkdownHeadingTag(textEntryControl, tag);
        break;
      case "####":
        addMarkdownHeadingTag(textEntryControl, tag);
        break;
      case "image":
        openInsertImageLinkModal();
        break;
      case "html":
        await showPreview();
        break;
      case "link":
        openInsertURLModal();
        break;
      case "md":
        hidePreview();
        break;
      case "save":
        window.dispatchEvent(eventSave);
        break;
      case "cancel":
        window.dispatchEvent(eventCancel);
        break;
      default:
        break;
    }
  }
}

// =======================================================================
// hide the HTML preview of the markdown, switch to editing
function hidePreview() {
  const preview = document.getElementById("preview-html");
  preview.classList.add("hidden");
  preview.innerHTML = "";
  CurrentItem.currentlyEditing = true;
  showCorrectEditMenu(EditorView.EDITING);
}

async function showPreview() {
  const textEntryControl = document.getElementById("template-text");
  const preview = document.getElementById("preview-html");
  const markdown = textEntryControl.value.trim();

  if (markdown === "") {
    preview.innerHTML = "";
  } else {
    // call the API to convert markdown to HTML
    try {
      const response = await fetch("/api/markdown/html", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown, addInlineCSSTags: true }),
      });
      const returnedData = await response.json();
      // check if the request was successful
      if (!response.ok) {
        // get the response body
        alert("error! " + returnedData.message);
        return;
      }

      // display the HTML
      preview.innerHTML = returnedData.html;
      // update the UI
      CurrentItem.currentlyEditing = false;

      showCorrectEditMenu(EditorView.VIEWING);
    } catch (error) {
      console.error(
        "An error occurred while converting markdown to HTML:",
        error
      );
      alert(error.message);
    }
  }
}
function showCorrectEditMenu(currentView) {
  const editMenu = document.getElementById("edit-menu");
  const preview = document.getElementById("preview-html");
  const textEntryControl = document.getElementById("template-text");
  switch (currentView) {
    case EditorView.EDITING: // editing markdown
      console.log("editing");
      hideMenu(editMenu, false);
      // hide the markdown button
      hideButton(editMenu, "md", true);
      hideButton(editMenu, "html", false);
      // hide the html preview and show the text entry control
      textEntryControl.classList.remove("hidden");
      hideTemplateOptions(false);
      preview.classList.add("hidden");
      hideEditingSection(false);
      textEntryControl.readOnly = false;
      break;

    case EditorView.VIEWING: // view HTML version
      hideTemplateOptions(true);
      hideMenu(editMenu, true);
      // show the preview button
      hideButton(editMenu, "html", true);
      hideButton(editMenu, "md", false);
      // show the text entry control and hide the html preview
      preview.classList.remove("hidden");
      textEntryControl.classList.add("hidden");
      hideEditingSection(false);
      textEntryControl.readOnly = true;
      break;
    default:
      console.error("Unknown view:", currentView);
      break;
  }
}
function hideEditingSection(hide) {
  const editingSection = document.getElementById("editing-section");
  if (hide) {
    editingSection.classList.add("hidden");
  } else {
    editingSection.classList.remove("hidden");
  }
}

function hideTemplateOptions(hide) {
  const templateOptions = document.getElementById("markdown-edit-options");
  if (hide) {
    templateOptions.classList.add("hidden");
  } else {
    templateOptions.classList.remove("hidden");
  }
}

// hideMenu makes all the buttons in the edit menu hidden
function hideMenu(element, hide) {
  // go through each child element that is a button
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    if (child.tagName === "BUTTON") {
      if (hide) {
        child.classList.add("hidden");
      } else {
        child.classList.remove("hidden");
      }
    } else {
      // recurse
      hideMenu(child, hide);
    }
  }
}

function hideButton(element, tag, hide) {
  // go through each child element that is a button
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    if (child.tagName === "BUTTON") {
      if (child.dataset.tag === tag) {
        if (hide) {
          child.classList.add("hidden");
        } else {
          child.classList.remove("hidden");
        }
      }
    } else {
      // recurse
      hideButton(child, tag, hide);
    }
  }
}

// =======================================================================

// =======================================================================
// ** INSERTING TEXT INTO MARKDOWN FUNCTIONS
// add text to the text area where the cursor is
function insertAtCursor(myField, myValue, ensureSpaces = false) {
  if (myField.selectionStart || myField.selectionStart === 0) {
    // check for spaces before and after the cursor
    const startPos = myField.selectionStart;
    if (ensureSpaces) {
      const endPos = myField.selectionEnd;
      const text = myField.value;
      const before = text.substring(startPos - 1, startPos);
      const after = text.substring(endPos, endPos + 1);
      if (before !== " " && before !== "\n") {
        // if there is no space at the start of myValue then add one
        if (myValue[0] !== " ") {
          myValue = " " + myValue;
        }
      }
      if (after !== " " && after !== "\n") {
        // if there is no space at the end of myValue then add one
        if (myValue[myValue.length - 1] !== " ") {
          myValue += " ";
        }
      }
    }
    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(startPos, myField.value.length);
  } else {
    myField.value += myValue;
  }
}

function surroundAtCursor(myField, myValue) {
  if (myField.selectionStart || myField.selectionStart === 0) {
    const startPos = myField.selectionStart;
    const endPos = myField.selectionEnd;
    if (startPos === endPos) {
      // no text selected, do nothing
      return;
    }
    // surround the selected text with the value
    // first, get the selected text
    let selectedText = myField.value.substring(startPos, endPos);
    if (!selectedText) {
      // no text selected, do nothing
      return;
    }
    // remove existing markdown tags
    selectedText = removeMarkdownTags(selectedText);
    // look for beginning and ending spaces
    const startsWithSpace = selectedText.startsWith(" ");
    const endsWithSpace = selectedText.endsWith(" ");
    selectedText = selectedText.trim();
    // add the markdown tags
    // surround the selected text with the value
    myField.value =
      myField.value.substring(0, startPos) +
      (startsWithSpace ? " " : "") +
      myValue +
      selectedText +
      myValue +
      (endsWithSpace ? " " : "") +
      myField.value.substring(endPos, myField.value.length);
  }
}
function removeMarkdownTags(text) {
  // remove existing markdown tags
  const markdownTags = ["***", "**", "*", "~~", "__", "_"];
  markdownTags.forEach((tag) => {
    const startsWithSpace = text.startsWith(" ");
    const endsWithSpace = text.endsWith(" ");
    tag = tag.trim();
    // if starts and ends with the tag, remove it
    if (text.startsWith(tag) && text.endsWith(tag)) {
      text = text.substring(tag.length, text.length - tag.length);
      text = text.trim();
      if (startsWithSpace) {
        text = " " + text;
      }
      if (endsWithSpace) {
        text = text + " ";
      }
      return text;
    }
  });
  return text;
}
function addMarkdownHeadingTag(myField, myValue) {
  if (myField.selectionStart || myField.selectionStart === 0) {
    const startPos = myField.selectionStart;
    let headerTag = myValue;
    // ensure there is a line break before the heading
    if (startPos > 0) {
      if (myField.value[startPos - 1] !== "\n") {
        headerTag = "\n" + headerTag;
      }
    }
    headerTag = headerTag + " ";
    // add the heading tag at the cursor
    insertAtCursor(myField, headerTag);
  }
}
function insertOnSeparateLine(myField, myValue) {
  if (myField.selectionStart || myField.selectionStart === 0) {
    const startPos = myField.selectionStart;
    let headerTag = myValue;
    // see if there are any line breaks before the current position
    if (startPos > 0) {
      if (myField.value[startPos - 1] !== "\n") {
        headerTag = "\n" + headerTag;
      }
    }
    if (startPos > 1) {
      if (myField.value[startPos - 2] !== "\n") {
        headerTag = "\n" + headerTag;
      }
    }
    // ensure there is a line break after current position
    if (startPos < myField.value.length) {
      if (myField.value[startPos] !== "\n") {
        headerTag = headerTag + "\n";
      }
    }
    // add the item plus the line breaks at the cursor
    insertAtCursor(myField, headerTag);
  }
}

// =======================================================================
// Query the API for the list of images (does not return the images themselves)
// =======================================================================
async function getImages() {
  let returnedData;
  // send a GET request with the form data
  try {
    const response = await fetch("/api/images", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    returnedData = await response.json();
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
  return returnedData;
}

// call getImages and load them into the select
async function loadImages() {
  const images = await getImages();
  imageSelect.innerHTML = "";
  // add blank option
  const option = document.createElement("option");
  option.value = 0;
  option.dataset.description = "no image";
  option.textContent = "No image selected";
  imageSelect.appendChild(option);
  // add the images to the select
  if (!images) {
    return;
  }
  images.forEach((image) => {
    const option = document.createElement("option");
    option.value = image.id;
    option.dataset.description = image.description;
    option.textContent = image.title;
    imageSelect.appendChild(option);
  });
}

// detect page load
window.addEventListener("load", async function () {
  //   collateInitialInformation();
  showCorrectEditMenu(EditorView.EDITING);
  await loadImages();
});
