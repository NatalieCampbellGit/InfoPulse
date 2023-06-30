const { Administrator } = require("../models");

async function seedAdministrators() {
  const admin = {
    first_name: "Jack",
    last_name: "Kelly",
    email: "jack.kelly@example.com",
    authentication_code: "pass1234",
    username: "jack.kelly",
    password: "jackspassword",
    permissions: 1, // 1 = super admin, 2 = admin, 3 = user
  };

  try {
    console.log("Creating administrator... " + JSON.stringify(admin));
    await Administrator.create(admin);
    console.log("Administrator created.");
  } catch (error) {
    console.error("Administrator could not be created.");
    console.error(error);
  }
}

module.exports = seedAdministrators;
