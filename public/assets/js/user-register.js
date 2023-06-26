function toggleRegister() {
  const userForm = document.getElementById("register-user-section");
  const registerButton = document.getElementById("registerButton");
  userForm.classList.toggle("hidden");
  registerButton.classList.toggle("hidden");
}
