// handles the about page routes
const router = require("express").Router();

router.get("/about", (req, res) => {
  res.render("about", {
    loggedIn: req.session.loggedIn,
    isUser: req.session.userRole === "user",
    pageTitle: "About InfoPulse",
  });
});

module.exports = router;
