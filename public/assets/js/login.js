// login.js
// Purpose: login.js is used to handle the login form submission
// Initiated by: login.handlebars
const loginFormHandler = async (event) => {
  event.preventDefault();
  // avoid double click
  document.getElementById("login-button").disabled = true;

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const passcode = document.querySelector("#passcode").value.trim();
  const confirmPassword = document
    .querySelector("#confirmPassword")
    .value.trim();

  if (!passcode) {
    // using already registered user
  } else {
    // using first time user
  }

  if (username && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        passcode,
        confirmPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (response.ok) {
      document.location.replace("/");
    } else {
      // eslint-disable-next-line no-undef
      alertModal("Login failed", data.message);
    }
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
