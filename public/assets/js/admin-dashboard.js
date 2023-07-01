// Functions for the admin dashboard admin-dashboard.handlebars
// detect page load
window.addEventListener("load", async function () {
  // get the user id from the data-store element
  const dataStoreElement = document.getElementById("data-store");
  let userId = dataStoreElement.dataset.userId;
  if (!Number.isNaN(userId)) {
    userId = parseInt(userId);
  } else {
    userId = 0;
  }
  if (userId > 0) {
    // search for the user on the user-select handlebars by dispatching a custom event
    const searchEvent = new CustomEvent("searchForUser", {
      detail: {
        search: userId,
      },
    });
    window.dispatchEvent(searchEvent);
  }
});
