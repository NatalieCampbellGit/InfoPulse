// Event handlers

// Search for a specific template
// =======================================================================

document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    console.log("Search button clicked");

    // get the value of the category-list select
    let categoryId;
    const categoryList = document.getElementById("category-list");
    if (categoryList) {
      categoryId = categoryList.options[categoryList.selectedIndex].value;
    }
    console.log(categoryId);

    // get the value of the search-text input
    const searchBox = document.getElementById("search-text");
    const searchText = searchBox.value.trim();
    let returnedData;
    console.log(searchText);
    // basic validation
    if (!categoryId && !searchText) {
      alert("Please select a category or enter some search text.");
      return;
    }

    // send a GET request with the form data
    try {
      const requestData = { category_id: categoryId, search_text: searchText };
      const response = await fetch("/api/templates", {
        method: "GET",
        body: JSON.stringify(requestData),
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

    // load up the returned data into the template list
    const templateList = document.getElementById("template-list");
    templateList.innerHTML = "";
    returnedData.forEach((template) => {
      const templateListItem = document.createElement("li");
      templateListItem.textContent = template.name;
      // Store the template id in the data-id attribute
      templateListItem.dataset.id = template.id;
      templateList.appendChild(templateListItem);
    });
  });

// =======================================================================

document.getElementById("openModal").addEventListener("click", function () {
  console.log("Open Modal button clicked");
  document.getElementById("myModal").style.display = "block";
});

document
  .getElementById("save")
  .addEventListener("click", async function (event) {
    console.log("Save button clicked");

    // prevent the form from submitting normally
    event.preventDefault();

    // get the file, title, and description
    const fileInput = document.querySelector("#file-upload");
    const titleInput = document.querySelector("#file-title");
    const descriptionInput = document.querySelector("#file-description");

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

    // hide the modal
    document.getElementById("myModal").style.display = "none";
    // create a new FormData object
    const formData = new FormData();

    // append the file, title, and description to the form data
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    console.log(...formData);
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

      // do something with the response (e.g. display a success message)
      alert(returnedData.message);
      const imageId = returnedData.id;
      if (!imageId) {
        alert("error! " + returnedData.message);
        return;
      }
      const image = await fetch(`/api/images/${imageId}`);
      // show the image in the browser
      const imageBlob = await image.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      const imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      document.body.appendChild(imageElement);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("An error occurred while uploading the image:", error);
      alert(error.message);
    }
  });

document.getElementById("cancel").addEventListener("click", function () {
  console.log("Cancel button clicked");
  document.getElementById("myModal").style.display = "none";
});
// =======================================================================
// ** Handle click events for the edit menu
// =======================================================================
const editMenu = document.getElementById("edit-menu");
editMenu.addEventListener("click", async function (event) {
  event.preventDefault();

  // see if it is a button that was clicked
  if (event.target.tagName === "BUTTON" || event.target.tagName === "I") {
    const textEntryControl = document.getElementById("template-text");
    // get the value of data-tag
    const tag = event.target.dataset.tag;
    switch (tag) {
      case "**":
        console.log("Bold button clicked");
        surroundAtCursor(textEntryControl, tag);
        break;
      case "*":
        console.log("Italic button clicked");
        surroundAtCursor(textEntryControl, tag);
        break;
      case "***":
        console.log("Bold and Italic button clicked");
        surroundAtCursor(textEntryControl, tag);
        break;
      case "~~":
        console.log("Strikethrough button clicked");
        surroundAtCursor(textEntryControl, tag);
        break;
      case "---":
        console.log("Horizontal Rule button clicked");
        addOnSeparateLine(textEntryControl, tag);
        break;
      case "#":
        console.log("Heading h1 button clicked");
        addMarkdownHeadingTag(textEntryControl, tag);
        break;
      case "##":
        console.log("Subheading h2 button clicked");
        addMarkdownHeadingTag(textEntryControl, tag);
        break;
      case "###":
        console.log("Subheading h3 button clicked");
        addMarkdownHeadingTag(textEntryControl, tag);
        break;
      case "####":
        console.log("Subheading h4 button clicked");
        addMarkdownHeadingTag(textEntryControl, tag);
        break;
      case "image":
        console.log("Image button clicked");
        break;
      case "html":
        console.log("HTML button clicked");
        await showPreview();
        break;
      case "link":
        console.log("Link button clicked");
        break;
      case "md":
        console.log("Markdown button clicked");
        hidePreview();
        break;
      default:
        console.log("Unknown button clicked");
        break;
    }
  }
});

function hidePreview() {
  const preview = document.getElementById("preview-html");
  preview.classList.add("hidden");
  preview.innerHTML = "";
  hideMenu(document.getElementById("edit-menu"), false);
  document.getElementById("template-text").classList.remove("hidden");
}

async function showPreview() {
  const textEntryControl = document.getElementById("template-text");
  const preview = document.getElementById("preview-html");
  const markdown = textEntryControl.value.trim();

  if (markdown === "") {
    preview.innerHTML = "";
    return;
  }
  // call the API to convert markdown to HTML
  try {
    const response = await fetch("/api/markdown/html", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ markdown, addHTMLTags: true }),
    });
    const returnedData = await response.json();
    // check if the request was successful
    if (!response.ok) {
      // get the response body
      alert("error! " + returnedData.message);
      return;
    }
    console.log("returnedData:", returnedData);

    // display the HTML
    preview.innerHTML = returnedData.html;
    hideMenu(document.getElementById("edit-menu"), true);
    preview.classList.remove("hidden");
    textEntryControl.classList.add("hidden");
  } catch (error) {
    console.error(
      "An error occurred while converting markdown to HTML:",
      error
    );
    alert(error.message);
  }
}

function hideMenu(element, hide) {
  // go through each child element that is a button
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    if (child.tagName === "BUTTON") {
      // show the markdown button if the html button was clicked
      if (child.dataset.tag === "md") {
        if (hide) {
          child.classList.remove("hidden");
        } else {
          child.classList.add("hidden");
        }
      } else {
        // hide all other buttons
        if (hide) {
          child.classList.add("hidden");
        } else {
          child.classList.remove("hidden");
        }
      }
    } else {
      // recurse
      hideMenu(child, hide);
    }
  }
}

// insert the text
document
  .getElementById("insert-text")
  .addEventListener("click", function (event) {
    console.log("Insert text button clicked");
    // get the image from the select
    const imageSelect = document.getElementById("image-select");
    const imageId = imageSelect.options[imageSelect.selectedIndex].value;
    const imageDescription =
      imageSelect.options[imageSelect.selectedIndex].dataset.description;
    // get the class from the select
    const classSelect = document.getElementById("classSelect");
    const classCSSName = classSelect.options[classSelect.selectedIndex].value;
    // get the default width from the select
    let defaultWidthSelect =
      classSelect.options[classSelect.selectedIndex].dataset.defaultWidth;
    if (defaultWidthSelect === undefined) {
      defaultWidthSelect = 1200;
    }
    // validate
    if (!imageId || !classCSSName) {
      alert("Please select an image and a style css class for the image.");

      return;
    }
    // construct proper html img tag to allow use of css class
    let imgTag = `<img src="/api/images/${imageId}" alt="${imageDescription}" class="${classCSSName}" width="${defaultWidthSelect}">`;
    // add trailing and leading new lines
    imgTag = "\n\n" + imgTag + "\n\n";
    // insert the img tag at the cursor
    insertAtCursor(document.getElementById("template-text"), imgTag);
  });

// =======================================================================
// add text to the text area where the cursor is
function insertAtCursor(myField, myValue) {
  if (myField.selectionStart || myField.selectionStart == "0") {
    const startPos = myField.selectionStart;
    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(startPos, myField.value.length);
  } else {
    myField.value += myValue;
  }
}

function surroundAtCursor(myField, myValue) {
  if (myField.selectionStart || myField.selectionStart == "0") {
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
    console.log(selectedText);
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
      console.log("removing tag " + tag);
      text = text.substring(tag.length, text.length - tag.length);
      text = text.trim();
      console.log("final text " + text);
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
  if (myField.selectionStart || myField.selectionStart == "0") {
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
function addOnSeparateLine(myField, myValue) {
  if (myField.selectionStart || myField.selectionStart == "0") {
    const startPos = myField.selectionStart;
    let headerTag = myValue;
    // ensure there is a line break before current position
    if (startPos > 0) {
      if (myField.value[startPos - 1] !== "\n") {
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
// Query the API for the list of images
// =======================================================================
async function getImages() {
  let returnedData;
  // send a GET request with the form data
  try {
    // ! TODO: change the URL to the correct one
    // const debugURL = 'http://localhost:3001/api/images'
    const productionURL = "/api/images";
    const response = await fetch(productionURL, {
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
  const imageSelect = document.getElementById("image-select");
  imageSelect.innerHTML = "";
  images.forEach((image) => {
    const option = document.createElement("option");
    option.value = image.id;
    option.dataset.description = image.description;
    option.textContent = image.title;
    imageSelect.appendChild(option);
  });
}

// =======================================================================
// call loadImages on page load
// detect page load
window.addEventListener("load", function () {
  console.log("Page loaded");
  loadImages();
});
