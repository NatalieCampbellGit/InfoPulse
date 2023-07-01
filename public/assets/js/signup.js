// const { User } = require("../../../models");
// singup.js handles the first time sign up

const signupFormHandler = async (event) => {
  event.preventDefault();
  document.getElementById("signup-button").disabled = true;

  // TODO add other form validation here
  const username = document.querySelector("#req-username").value.trim();
  const password = document.querySelector("#req-password").value.trim();
  const confirmPassword = document.querySelector("#confirmPassword").value.trim();
  const email = document.querySelector("#email").value.trim();
  const authentication_code = document.querySelector("#otp").value.trim();
  
// ! validate first name, last name email, otp, password(make sure they match)
  if (email && authentication_code) {

    if(username.length > 50 || username.length < 1){
       // eslint-disable-next-line no-undef
        alertModal(
            "Please use a username between 1 and 50 characters long"
        )
        return;
    };

    if(username == "" || username == null){
      // eslint-disable-next-line no-undef
       alertModal(
        "Please enter a username"
       )
       return;
   };

    if (password.length < 12 || password.length > 64) {
      // eslint-disable-next-line no-undef
      alertModal(
        "Sign up failed",
        "Password must be between 12 and 64 characters long."
      );
      return;
    }

    if(!(password === confirmPassword)){
       // eslint-disable-next-line no-undef
      alertModal(
        "Sign up failed",
        "Passwords must match"
      );
      return;
    }


    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ email, authentication_code }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // if successful, redirect to the homepage or userdashboard
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
.getElementById("signup-button")
.addEventListener("click", signupFormHandler);
