// Functions for the user dashboard user-dashboard.handlebars
let selectedFactsheetId = 0;
let selectedCommentId = 0;
let currentlyEditing = false;

let factsheetList = document.querySelectorAll(".user-factsheet-listitem");
function addEventHandlersToFactsheetList() {
  factsheetList = document.querySelectorAll(".user-factsheet-listitem");
  factsheetList.forEach((factsheet) => {
    factsheet.addEventListener("click", markFactsheetAsSelected);
  });
}

let commentList = document.querySelectorAll(".user-comment");
function addEventHandlersToCommentList() {
  commentList = document.querySelectorAll(".user-comment");
  commentList.forEach((comment) => {
    comment.addEventListener("click", markCommentAsSelected);
  });
}

// get comment CRUD buttons
const commentEditButton = document.getElementById("comment-edit-button");
const commentDeleteButton = document.getElementById("comment-delete-button");
const commentAddButton = document.getElementById("comment-add-button");
const commentSaveButton = document.getElementById("comment-save-button");
const commentCancelButton = document.getElementById("comment-cancel-button");

// add event listeners to the comment CRUD buttons
commentEditButton.addEventListener("click", editComment);
commentDeleteButton.addEventListener("click", deleteComment);
commentAddButton.addEventListener("click", newComment);
commentSaveButton.addEventListener("click", saveComment);
commentCancelButton.addEventListener("click", cancelComment);

async function editComment(event) {
  event.preventDefault();

  if (selectedCommentId > 0) {
    currentlyEditing = true;
    // make the editing area visible
    document.getElementById("comment-editing").classList.remove("hidden");
    // make the editing buttons invisible
    commentAddButton.classList.add("hidden");
    commentDeleteButton.classList.add("hidden");
    commentEditButton.classList.add("hidden");
    // make the save and cancel buttons visible
    commentSaveButton.classList.remove("hidden");
    commentCancelButton.classList.remove("hidden");
    // get the comment text (call the api)

    try {
      const response = await fetch(`/api/comments/${selectedCommentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const comment = data.content;
        // put the comment text in the editing area
        document.getElementById("user-comment-entry").value = comment;
      } else {
        // eslint-disable-next-line no-undef
        alertModal("Something went wrong while retrieving a comment");
      }
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-undef
      alertModal("An error occurred while retrieving a comment");
    }
  }
}

function newComment(event) {
  event.preventDefault();
  selectedCommentId = 0;
  currentlyEditing = true;
  // make the editing area visible
  document.getElementById("comment-editing").classList.remove("hidden");
  // make the editing buttons invisible
  commentAddButton.classList.add("hidden");
  commentDeleteButton.classList.add("hidden");
  commentEditButton.classList.add("hidden");
  // make the save and cancel buttons visible
  commentSaveButton.classList.remove("hidden");
  commentCancelButton.classList.remove("hidden");
  // put the comment text in the editing area
  document.getElementById("user-comment-entry").value = "";
}

async function deleteComment(event) {
  if (selectedCommentId === 0) {
    // eslint-disable-next-line no-undef
    alertModal("Please select a comment to delete");
    return;
  }

  event.preventDefault();
  currentlyEditing = false;
  // make the editing area invisible
  document.getElementById("comment-editing").classList.add("hidden");
  // make the editing buttons visible
  commentAddButton.classList.remove("hidden");
  commentDeleteButton.classList.remove("hidden");
  commentEditButton.classList.remove("hidden");
  // make the save and cancel buttons invisible
  commentSaveButton.classList.add("hidden");
  commentCancelButton.classList.add("hidden");
  // delete the comment (call the api)
  if (
    // eslint-disable-next-line no-undef
    await confirmModal(
      "Delete Comment?",
      "Are you sure you want to delete this comment?"
    )
  ) {
    try {
      const response = await fetch(`/api/comments/${selectedCommentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // reload the page
        window.location.replace("/userdashboard");
      } else {
        // eslint-disable-next-line no-undef
        alertModal("Something went wrong while deleting a comment");
      }
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-undef
      alertModal("An error occurred while deleting a comment");
    }
  }
  selectedCommentId = 0;
}

async function saveComment(event) {
  event.preventDefault();
  if (!selectedFactsheetId > 0) {
    // eslint-disable-next-line no-undef
    alertModal("Please select a factsheet");
    return;
  }
  if (currentlyEditing) {
    // make the editing area invisible
    document.getElementById("comment-editing").classList.add("hidden");
    // make the editing buttons visible
    commentAddButton.classList.remove("hidden");
    commentDeleteButton.classList.remove("hidden");
    commentEditButton.classList.remove("hidden");
    // make the save and cancel buttons invisible
    commentSaveButton.classList.add("hidden");
    commentCancelButton.classList.add("hidden");
    // save the comment (call the api)
    const comment = document.getElementById("user-comment-entry").value.trim();
    if (!comment.length > 0) {
      // eslint-disable-next-line no-undef
      alertModal("Please enter a comment");
      return;
    }
    currentlyEditing = false;

    if (selectedCommentId > 0) {
      // update the comment
      try {
        const response = await fetch(`/api/comments/${selectedCommentId}`, {
          method: "PUT",
          body: JSON.stringify({
            content: comment,
            factsheet_id: selectedFactsheetId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          // reload the page
          window.location.replace("/userdashboard");
        } else {
          // eslint-disable-next-line no-undef
          alertModal("Something went wrong while updating a comment");
        }
      } catch (error) {
        console.error(error);
        // eslint-disable-next-line no-undef
        alertModal("An error occurred while updating a comment");
      }
    } else {
      // create a new comment
      try {
        const response = await fetch(`/api/comments`, {
          method: "POST",
          body: JSON.stringify({
            content: comment,
            factsheet_id: selectedFactsheetId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          // reload the page
          window.location.replace("/userdashboard");
        } else {
          // eslint-disable-next-line no-undef
          alertModal("An error occurred while creating a comment");
        }
      } catch (error) {
        console.error(error);
        // eslint-disable-next-line no-undef
        alertModal("An error occurred while creating a comment");
      }
    }
  }
}

function cancelComment(event) {
  event.preventDefault();
  // make the editing area invisible
  document.getElementById("comment-editing").classList.add("hidden");
  // make the editing buttons visible
  commentAddButton.classList.remove("hidden");
  commentDeleteButton.classList.remove("hidden");
  commentEditButton.classList.remove("hidden");
  // make the save and cancel buttons invisible
  commentSaveButton.classList.add("hidden");
  commentCancelButton.classList.add("hidden");
  currentlyEditing = false;
}

function markFactsheetAsSelected(event) {
  const clicked = event.currentTarget;
  const factsheetId = clicked.dataset.id;
  for (let i = 0; i < factsheetList.length; i++) {
    const id = factsheetList[i].dataset.id;
    if (id === factsheetId) {
      factsheetList[i].classList.add("bg-pulse-bluegrey-200");
      factsheetList[i].classList.remove("bg-white");
      // set the module variable to the selected template's id
      selectedFactsheetId = factsheetId;
    } else {
      factsheetList[i].classList.add("bg-white");
      factsheetList[i].classList.remove("bg-pulse-bluegrey-200");
    }
  }
  showSelectedInformation();
}

function showSelectedInformation() {
  commentDeleteButton.classList.add("hidden");
  commentEditButton.classList.add("hidden");

  // find all the factsheet divs
  const factsheetDivs = document.querySelectorAll(".factsheet-html");
  // loop through the divs
  for (let i = 0; i < factsheetDivs.length; i++) {
    // get the id of the div
    const id = factsheetDivs[i].dataset.id;
    // if the id matches the selected template id
    if (id === selectedFactsheetId) {
      // show the div
      factsheetDivs[i].classList.remove("hidden");
    } else {
      // otherwise, hide the div
      factsheetDivs[i].classList.add("hidden");
    }
  }
  // now find all the user comments
  const userComments = document.querySelectorAll(".user-comment");
  // loop through the comments
  for (let i = 0; i < userComments.length; i++) {
    // get the id of the comment
    const id = userComments[i].dataset.factsheetId;
    // if the id matches the selected template id
    if (id === selectedFactsheetId) {
      // show the comment
      userComments[i].classList.remove("hidden");
    } else {
      // otherwise, hide the comment
      userComments[i].classList.add("hidden");
    }
  }
}

function markCommentAsSelected(event) {
  const clicked = event.currentTarget;
  const commentId = clicked.dataset.id;
  for (let i = 0; i < commentList.length; i++) {
    const id = commentList[i].dataset.id;
    if (id === commentId) {
      commentList[i].classList.add("bg-pulse-bluegrey-200");
      commentList[i].classList.remove("bg-white");
      // set the module variable to the selected template's id
      selectedCommentId = commentId;
    } else {
      commentList[i].classList.add("bg-white");
      commentList[i].classList.remove("bg-pulse-bluegrey-200");
    }
  }
  // if a comment is clicked then show the buttons
  if (!currentlyEditing) {
    commentAddButton.classList.remove("hidden");
    commentDeleteButton.classList.remove("hidden");
    commentEditButton.classList.remove("hidden");
  }
}

function displayHTMLInNewTab() {
  try {
    // get the factsheet html
    const factSheets = document.querySelectorAll(".factsheet-html");
    let htmlString = "";
    for (let i = 0; i < factSheets.length; i++) {
      const id = factSheets[i].dataset.id;
      if (id === selectedFactsheetId) {
        htmlString = factSheets[i].innerHTML.trim();
      }
    }
    if (htmlString === "") {
      return;
    }
    htmlString = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" 
    content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Factsheet</title> </head> <body style="font-family: sans-serif;"> ${htmlString} </body> </html>`;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(htmlString);
    newWindow.document.close();
  } catch (error) {}
}

function addEventHandlersToBrowseButtons() {
  // get the browse buttons
  const browseButtons = document.querySelectorAll(".fa-browsers");
  // loop through the buttons
  for (let i = 0; i < browseButtons.length; i++) {
    // add an event listener to each button
    browseButtons[i].addEventListener("click", displayHTMLInNewTab);
  }
}

// detect page load
window.addEventListener("load", async function () {
  // add event listeners to the factsheet list items
  selectedFactsheetId = 0;
  addEventHandlersToFactsheetList();
  addEventHandlersToCommentList();
  addEventHandlersToBrowseButtons();
});
