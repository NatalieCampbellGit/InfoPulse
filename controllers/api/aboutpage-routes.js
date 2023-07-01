// handles the about page routes
const router = require("express").Router();

router.get("/about", (req, res) => {
  res.render("home");
});

module.exports = router;
