// Function to handle the click event on factsheet titles
function handleClick(event) {
  const factsheetId = event.target.dataset.factsheetId;
  if (!factsheetId) {
    return;
  }

  // Check if the clicked title contains ID1 or ID2
  if (factsheetId.includes("ID1") || factsheetId.includes("ID2")) {
    const contents = document.querySelectorAll(`[id^="factsheet-"]`);
    contents.forEach((content) => {
      content.style.display = "block";
    });
  } else {
    // Fetch and render the content for the specific factsheet
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
}
