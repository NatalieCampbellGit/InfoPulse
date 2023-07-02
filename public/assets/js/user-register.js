// eslint-disable-next-line no-unused-vars
async function toggleRegister() {
  const userForm = document.getElementById("register-user-section");
  const registerButton = document.getElementById("registerButton");
  userForm.classList.toggle("hidden");
  registerButton.classList.toggle("hidden");

  try {
    const authcodeResponse = await fetch("/api/admin/authcode/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!authcodeResponse.ok) {
      const authcodeResponseJson = await authcodeResponse.json();
      alert("Error getting authcode " + authcodeResponseJson.message);
      return;
    }
    if (authcodeResponse.ok) {
      const authcode = await authcodeResponse.json();
      console.log(authcode);
      const authCodeString = authcode.authcode;

      document.getElementById("authcode").textContent = authCodeString;
    }
  } catch (error) {
    console.error(error);
    alert("Error getting authcode " + error);
  }
}
