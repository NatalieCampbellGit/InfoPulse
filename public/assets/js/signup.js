const signupFormHandler = async (event) => {
  event.preventDefault();
  document.getElementById("sign-up-button").disabled = true;
  // TODO add other form validation here
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    if (password.length < 12 || password.length > 64) {
      // eslint-disable-next-line no-undef
      alertModal(
        "Sign up failed",
        "Password must be between 12 and 64 characters long."
      );
      return;
    }
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // if successful, redirect to the homepage
      document.location.replace("/");
    } else {
      const data = await response.json();
      // eslint-disable-next-line no-undef
      alertModal("Sign up failed", data.message);
    }
  } else {
    // eslint-disable-next-line no-undef
    alertModal("Sign up failed", "Please enter a username and password.");
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
