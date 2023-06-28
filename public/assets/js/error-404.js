// Init: Show 404 page
// goes to home page if user presses the home button on the 404 page
document.getElementById("to-home").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.replace("/");
});
