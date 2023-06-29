// This module is to link the factsheet template to the user
// it uses data stored by the handlebars components in the webpage
// to link the factsheet template to the user
// would use local storage, but can't trust it is up to date
// so using the data-store div instead
//

function linkFactsheetToUser() {
  // get the data-store div
  const dataStore = document.getElementById("data-store");
  if (!dataStore) {
    return;
  }
  // get the factsheet id from the data-store div
  const factsheetId = dataStore.dataset.templateId;
  if (!factsheetId) {
    return;
  }
  // get the user id from the data-store div
  const userId = dataStore.dataset.userId;
  if (!userId) {
    return;
  }

  console.log("factsheetId: " + factsheetId + " userId: " + userId);
  // load a modal to show the user that the factsheet is being linked
  // and to get custom_markdown
}
