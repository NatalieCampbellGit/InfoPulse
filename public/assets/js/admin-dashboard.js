// Functions for the admin dashboard admin-dashboard.handlebars

// detect page load
window.addEventListener("load", async function () {
  // get the user id from the data-store element
  const dataStoreElement = document.getElementById("data-store");
  let userId = dataStoreElement.dataset.userId;
  if (!Number.isNaN(userId)) {
    userId = parseInt(userId);
  } else {
    userId = 0;
  }
  if (userId > 0) {
    // search for the user on the user-select handlebars by dispatching a custom event
    const searchEvent = new CustomEvent("searchForUser", {
      detail: {
        search: userId,
      },
    });
    window.dispatchEvent(searchEvent);
  }
});

// handles the form submission to enrol a new user
const enrolFormHandler = async (event) => {
  event.preventDefault();
  // avoid double click
  // document.getElementById("enrol").disabled = true;

  const first_name = document.querySelector("#firstname").value.trim();
  const last_name = document.querySelector("#lastname").value.trim();
  const date_of_birth = document.querySelector("#dob").value.trim();
  const email = document.querySelector("#email").value.trim();
  const mobile_phone = document.querySelector("#mobile-num").value.trim();
  const crm_id = document.querySelector("#crm").value.trim();
  const authentication_code = document
    .getElementById("authcode")
    .textContent.trim();

  // try {
  //   const authcodeResponse = await fetch("/api/admin/authcode/", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   if (!authcodeResponse.ok) {
  //     const authcodeResponseJson = await authcodeResponse.json();
  //     alert("Error getting authcode " + authcodeResponseJson.message);
  //     return;
  //   }
  //   if (authcodeResponse.ok) {
  //     console.log(typeof authcodeResponse);

  //     const authcode = await authcodeResponse.json();
  //     console.log(authcode);
  //     const convertAuthCode = authcode.authcode;
  //     // alert("Authcode is " + convertAuthCode);
  //     document.getElementById("authcode").value = convertAuthCode;

  //     // const convertAuthCode = JSON.stringify(authcode.authcode);
  //     console.log(typeof convertAuthCode);
  //     console.log(convertAuthCode);
  //   }
  // } catch (error) {
  //   console.error(error);
  //   alert("Error getting authcode " + error);
  // }

  const enrollmentData = {
    first_name,
    last_name,
    date_of_birth,
    email,
    mobile_phone,
    crm_id,
    authentication_code,
  };

  if (enrollmentData) {
    const response = await fetch("/api/admin/enrol", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        date_of_birth,
        email,
        mobile_phone,
        crm_id,
        authentication_code,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (response.ok) {
      document.location.replace("/admin");
      first_name.empty();
      last_name.empty();
      date_of_birth.empty();
      email.empty();
      mobile_phone.empty();
      crm_id.empty();
      authentication_code.empty();
    } else {
      // eslint-disable-next-line no-undef
      alertModal("Login failed", data.message);
    }
  }
};

document.getElementById("enrol").addEventListener("click", enrolFormHandler);

// authcode generation
// document.getElementById("gen-passcode")
//   .addEventListener("click", ());
