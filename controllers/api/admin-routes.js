// handles the admin login page
const { Op } = require("sequelize");
// const { withAuth, withAdminAuth } = require('../../utils/auth')
const router = require("express").Router();
const Administrator = require("../../models/Administrator");

// Login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.username.toLowerCase().trim();
    const username = req.body.username.trim();
    const password = req.body.password.trim();

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
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Error logging in" });
  }
});

// Log the admin user out
router.get("/logout", (req, res) => {
  // if the user is logged in, destroy the session and redirect to the homepage
  if (req.session.loggedIn) {
    try {
      req.session.destroy(() => {
        res.redirect("/", { title: "homepage" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err, message: "Error logging out" });
    }
  } else {
    // otherwise, redirect to the homepage
    res.redirect("/", { title: "homepage" });
  }
});
module.exports = router;
