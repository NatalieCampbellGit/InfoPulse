// Contains the main script for the application
const confirmationModalElement = document.getElementById("confirmation-modal");
const alertModalElement = document.getElementById("feedback-modal");

confirmationModalElement.classList.add("hidden");
alertModalElement.classList.add("hidden");

// eslint-disable-next-line no-unused-vars
function alertModal(title, message) {
  document.getElementById("feedback-modal-title").textContent = title;
  document.getElementById("feedback-modal-message").textContent = message;
  alertModalElement.classList.remove("hidden");
}

function closeFeedbackModal() {
  alertModalElement.classList.add("hidden");
}

document
  .getElementById("feedback-close-modal")
  .addEventListener("click", closeFeedbackModal);

// confirmation modal
// returns a promise
// eslint-disable-next-line no-unused-vars
function confirmModal(title, message) {
  return new Promise((resolve, reject) => {
    const yesButton = document.getElementById("confirmation-yes-button");
    const noButton = document.getElementById("confirmation-no-button");
    document.getElementById("confirmation-modal-title").textContent = title;
    document.getElementById("confirmation-modal-message").textContent = message;

    yesButton.onclick = () => {
      resolve(true);
      confirmationModalElement.classList.add("hidden");
    };

    noButton.onclick = () => {
      resolve(false);
      confirmationModalElement.classList.add("hidden");
    };

    confirmationModalElement.classList.remove("hidden");
  });
}

// // get all navbar links
// const navLinks = document.querySelectorAll(".nav-link");
// // add eventlistener to each link
// navLinks.forEach((link) => {
//   link.addEventListener("click", (event) => {
//     event.preventDefault();
//     // get the id of the link
//     const id = link.getAttribute("id");
//     switch (id) {
//       case "home-link":
//         window.location.replace("/");
//         break;
//       case "logout-link":
//         window.location.replace("/logout");
//         break;
//       case "login-link":
//         window.location.replace("/login");
//         break;
//       case "signup-link":
//         window.location.replace("/signup");
//         break;
//       // TODO Add other link handling here
//       default:
//     }
//   });
// });
