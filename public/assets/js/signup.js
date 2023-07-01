const signupFormHandler = async (event) => {
  event.preventDefault();
  document.getElementById("sign-up-button").disabled = true;

  // TODO: Add other form validation here
  const username = document.querySelector("#signup-username").value.trim();
  const password = document.querySelector("#signup-password").value.trim();
  const confirmPassword = document
    .querySelector("#confirm-password")
    .value.trim();

  if (username && password && confirmPassword) {
    if (password.length < 12 || password.length > 64) {
      alert("Password must be between 12 and 64 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect to the homepage
      document.location.replace("/");
    } else {
      const data = await response.json();
      alert("Sign up failed: " + data.message);
    }
  } else {
    alert("Please enter a username, password, and confirm password.");
  }

  document.getElementById("sign-up-button").disabled = false;
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
