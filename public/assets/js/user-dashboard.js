// Functions for the user dashboard user-dashboard.handlebars
let selectedFactsheetId = 0;
let factsheetList = document.querySelectorAll(".user-factsheet-listitem");
function addEventHandlersToFactsheetList() {
  factsheetList = document.querySelectorAll(".user-factsheet-listitem");
  factsheetList.forEach((factsheet) => {
    factsheet.addEventListener("click", markFactsheetAsSelected);
  });
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

function showSelectedInformation() {}

// detect page load
window.addEventListener("load", async function () {
  // add event listeners to the factsheet list items
  selectedFactsheetId = 0;
  addEventHandlersToFactsheetList();
});
