// user-dashboard.js
/* eslint-disable no-undef */
// Function to fetch the content for a specific factsheet
async function fetchFactsheetContent(factsheetId) {
  try {
    const response = await fetch(`/api/factsheets/${factsheetId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch factsheet content");
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.log(error);
    // Handle error case here
  }
}

// Function to handle the click event on factsheet titles
function handleClick(factsheetId) {
  fetchFactsheetContent(factsheetId)
    .then((content) => {
      // Render the content on the page
      document.getElementById("factsheet-content").innerHTML = content;
    })
    .catch((error) => {
      console.log(error);
      // Handle error case here
    });
}

// Function to initialize the user dashboard
function initializeDashboard() {
  const factsheetTitles = document.getElementsByClassName("factsheet-title");

  // Attach click event listeners to factsheet titles
  Array.from(factsheetTitles).forEach((title) => {
    const factsheetId = title.dataset.factsheetId;
    title.addEventListener("click", () => handleClick(factsheetId));
  });
}

// Call the initializeDashboard function when the page is loaded
document.addEventListener("DOMContentLoaded", initializeDashboard);
