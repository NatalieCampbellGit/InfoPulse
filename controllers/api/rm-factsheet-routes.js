/* eslint-disable camelcase */
const Factsheet = require("../../models/Factsheet");
const { withAuth, withAdminAuth } = require("../../utils/auth");
const router = require("express").Router();
const { getUserFactsheets } = require("../../utils/model-utils");
const { formatFactsheetListItems } = require("../../utils/html-utils");
const { error } = require("console");

router.get("/", withAuth, async (req, res) => {
  // post to use body for info
  let { id, format } = req.query;
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
    id = Number.parseInt(id);
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
        .send('<p class="text-pulse-green-500">No factsheets found</p>');
      return;
    }
    // html format
    const htmlFormat = formatFactsheetListItems(factsheets);
    res.status(200).send(htmlFormat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/link/", withAdminAuth, async (req, res) => {
  // post to use body for info
  let { templateId, userId } = req.body;
  // validate
  if (!templateId || Number.parseInt(templateId) < 1) {
    res.status(400).json({ error: "Invalid factsheet id" });
    return;
  }
  if (!userId || Number.parseInt(userId) < 1) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }
  templateId = Number.parseInt(templateId);
  userId = Number.parseInt(userId);

  // now make sure it doesn't already exist
  const existingFactSheets = await getUserFactsheets(userId);

  if (existingFactSheets) {
    for (let i = 0; i < existingFactSheets.length; i++) {
      if (existingFactSheets[i].template_id === templateId) {
        // return the list of factsheets for the user, formatted as html
        const htmlFormat = formatFactsheetListItems(existingFactSheets);
        res.status(200).send(htmlFormat);
        return;
      }
    }
  }

  // now create the link
  let administrator_id = req.session.user_id;
  administrator_id = Number.parseInt(administrator_id);
  try {
    const newLink = await Factsheet.create({
      user_id: userId,
      template_id: templateId,
      administrator_id,
    });
    if (!newLink) {
      res.status(500).json({ error: "Failed to create link" });
      return;
    }
    // return the list of factsheets for the user, formatted as html
    const factsheets = await getUserFactsheets(userId);
    const htmlFormat = formatFactsheetListItems(factsheets);
    res.status(200).send(htmlFormat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a factsheet
router.delete("/admin/:id", withAdminAuth, (req, res) => {
  const factsheet_id = req.body.id;

  try {
    const deletedFactsheet = Factsheet.destroy({
      where: { id: factsheet_id },
    });

    if (deletedFactsheet === 0) {
      return res.status(404).json({ error: "Factsheet not found" });
    }

    return res.json({ message: "Factsheet deleted" });
  } catch (err) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occured while deleting the factsheet" });
  }
});

// delete a comment from a factsheet
// ! TODO
router.delete("/admin/:id", withAdminAuth, (req, res) => {
  const factsheet_id = req.body.id;

  try {
    const deletedFactsheet = Factsheet.destroy({
      where: { id: factsheet_id },
    });

    if (deletedFactsheet === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "Factsheet deleted" });
  } catch (err) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occured while deleting the factsheet" });
  }
});

// ! really important to export the router
module.exports = router;
