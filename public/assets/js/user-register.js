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
      const authCodeString = authcode.authcode;

      document.getElementById("authcode").textContent = authCodeString;
    }
  } catch (error) {
    console.error(error);
    alert("Error getting authcode " + error);
  }
}

// copy code to clipboard
document.getElementById("clipboard-code").addEventListener("click", () => {
  const authCodeString = document.getElementById("authcode").textContent;
  navigator.clipboard
    .writeText(authCodeString)
    .then(() => {
      // eslint-disable-next-line no-undef
      alertModal(
        "Copied to Clipboard",
        "The User's authentication code has been copied to the clipboard"
      );
    })
    .catch((error) => {
      console.error("Error occurred while copying text: ", error);
    });
});
