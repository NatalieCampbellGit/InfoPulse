// handles the log-in for admins
const { Op } = require("sequelize");
const router = require("express").Router();
const Administrator = require("../../models/Administrator");
const User = require("../../models/User");
const { withAdminAuth } = require("../../utils/auth");
const generatePassphrase = require("../../utils/codes-utils");

// Login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.username.toLowerCase().trim();
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    if (req.session.loggedIn && req.session.userRole == "user") {
      res
        .status(200)
        .send({
          message: "Logged in as user, please log out and back in as admin",
        })
        .redirect("/userdashboard");
      return;
    }

    const userData = await Administrator.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }
    const validPassword = await userData.checkPassword(password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }
    // save session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.userRole = "admin";
      res.status(200).json({ message: "Successfully logged in" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error logging in" });
  }
});

// Log the admin user out
router.get("/logout", (req, res) => {
  // if the user is logged in, destroy the session and redirect to the homepage
  if (req.session.loggedIn) {
    try {
      req.session.destroy(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: "Error logging out" });
    }
  } else {
    // otherwise, redirect to the homepage
    res.redirect("/");
  }
});

// Allows the admin to create a new user
router.post("/enrol", withAdminAuth, async (req, res) => {
  try {
    const first_name = req.body.first_name.trim();
    const last_name = req.body.last_name.trim();
    const date_of_birth = req.body.date_of_birth.trim();
    const email = req.body.email.toLowerCase().trim();
    const mobile_phone = req.body.mobile_phone.trim();
    const crm_id = req.body.crm_id.trim();
    const authentication_code = req.body.authentication_code.trim();

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      date_of_birth,
      authentication_code,
      mobile_phone,
      crm_id,
      username: "",
      password: "",
      administrator_id: Number.parseInt(req.session.user_id),
    });

    // console.log(newUser);

    if (newUser[0] === 0) {
      res.status(400).json({ message: "Error creating new user" });
    } else res.status(200).json({ message: "Successfully created new user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error creating new user" });
  }
});

// get route for generate passphrase
router.get("/authcode", async (req, res) => {
  try {
    const authcode = generatePassphrase();
    // console.log(typeof authcode);

    if (authcode === "" || authcode === null || authcode === undefined) {
      res.status(400).json({ message: "Error generating authentication code" });
      return;
    }

    if (authcode.length < 5) {
      res.status(400).json({ message: "Error generating authentication code" });
      return;
    }

    if (req.session.loggedIn && req.session.role === "user") {
      res.status(400).json({
        message:
          "You must have admin privileges to generate an authentication code",
      });
      res.redirect("/userdashboard");
    }

    if (req.session.loggedIn) {
      res.status(200).json({
        authcode,
        message: "Successfully generated authentication code",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: "Error generating authentication code" });
  }
});

module.exports = router;
