const { sequelize, Op } = require("sequelize");
const User = require("../../models/User");
const Factsheet = require("../../models/Factsheet");
const UserComment = require("../../models/UserComment");
const { withAuth, withAdminAuth } = require("../../utils/auth");
const router = require("express").Router();
const { getUserFactsheets } = require("../../utils/models-utils");
const { formatFactsheetListItems } = require("../../utils/html-utils");

router.get("/", withAuth, async (req, res) => {
  // post to use body for info
  const { id, format } = req.query;
  // get all the factsheets for a user
  // and the comments for each factsheet
  // and the administrator who edited it
  // and the template it is based on
  // and the category of the template
  if (!id || Number.parseInt(id) < 1) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }
  try {
    const factsheets = await getUserFactsheets(id);
    if (!factsheets) {
      res.status(404).json({ error: "No factsheets found for user" });
      return;
    }
    if (format !== "html") {
      res.status(200).json(factsheets);
      return;
    }
    if (factsheets.length === 0) {
      res
        .status(200)
        .send(`<p class="text-pulse-green-500">No results found</p>`);
      return;
    }
    // html format
    const htmlFormat = formatFactsheetListItems(factsheets);
    res.status(200).send(htmlFormat);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ! really important to export the router
module.exports = router;