// Purpose: user routes
const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user: new users are created by administrators only
// must have:
// administrator_id
// first_name
// last_name
// date_of_birth
// email
// authentication_code
// mobile_phone (optional)
// crm_id (optional)
// the user will use the authentication_code to create their own username and password
router.post("/", async (req, res) => {
  // check that the user does not already exist
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
        // ! etcetera
      },
    });
    if (dbUserData) {
      // already exists. Let the user know
      res.status(400).json({ message: "This username is already taken." });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: "Error checking for existing user" });
  }
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
      // ! etcetera
    });
    // save session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userRole = "user";
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      // ! etcetera
      res.status(200).json(dbUserData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error creating new user" });
  }
});

// Login
// if it is the first time the user is logging in,
// they will use the authentication_code to create their own username and password
// the email address and the authentication_code identifies the user the first time
// the user will use the username and password to log in from then on
// so if the user has already created a username and password, then the authentication_code is unnecessary
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
        // ! etcetera
      },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }
    // save session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userRole = "user";
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      // ! etcetera
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error logging in" });
  }
});

// maybe add a first login route to handle the first login with the authentication_code
// the user will use the authentication_code to create their own username and password

module.exports = router;
