// Contains the main script for the application

// ! Show alert modal
// eslint-disable-next-line no-unused-vars
function alertModal(title, message) {
  // Populate modal title and body
  document.getElementById("feedbackModalLabel").textContent = title;
  document.getElementById("feedbackModalBody").textContent = message;

  // Show modal
  const options = { backdrop: "static", keyboard: true };
  // eslint-disable-next-line no-undef
  const feedbackModal = new bootstrap.Modal(
    document.getElementById("feedbackModal"),
    options
  );
  feedbackModal.show();
}

// get all navbar links
const navLinks = document.querySelectorAll(".nav-link");
// add eventlistener to each link
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    // get the id of the link
    const id = link.getAttribute("id");
    switch (id) {
      case "home-link":
        window.location.replace("/");
        break;
      case "logout-link":
        window.location.replace("/logout");
        break;
      case "login-link":
        window.location.replace("/login");
        break;
      case "signup-link":
        window.location.replace("/signup");
        break;
      // TODO Add other link handling here
      default:
    }
  });
});
