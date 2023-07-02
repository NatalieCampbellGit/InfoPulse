// handles the log-in for admins
const { Op } = require("sequelize");
const router = require("express").Router();
const Administrator = require("../../models/Administrator");

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
        .redirect("/user");
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

module.exports = router;
