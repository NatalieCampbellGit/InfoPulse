// ! REMOVE THIS FILE FROM PRODUCTION

const manageTemplate = document.getElementById("manage-template");

const uploadForm = document.getElementById("upload-form");
uploadForm.addEventListener("submit", async (event) => {
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
  } catch (error) {
    console.error("An error occurred while uploading the image:", error);
    alert(error.message);
  }
});
