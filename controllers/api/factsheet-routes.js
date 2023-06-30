/* eslint-disable camelcase */
const Factsheet = require("../../models/Factsheet");
const { withAuth, withAdminAuth } = require("../../utils/auth");
const { getUserFactsheets } = require("../../utils/model-utils");
const { formatFactsheetListItems } = require("../../utils/html-utils");
const { error } = require("console");
const { UserComment } = require("../../models");
const router = require("express").Router();

// get all factsheets for a user with all relevant data
router.get("/user", withAuth, async (req, res) => {
  // post to use body for info
  let { id, format } = req.query;
  // get all the factsheets for a user
  // and the comments for each factsheet
  // and the administrator who edited it
  // and the template it is based on
  // and the category of the template
  if (!id || Number.parseInt(id) < 1) {
    res.status(400).json({ error, message: "Invalid user id" });
    return;
  }
  try {
    id = Number.parseInt(id);
    const factsheets = await getUserFactsheets(id);
    if (!factsheets) {
      res.status(404).json({ error, message: "No factsheets found for user" });
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

    // add a boolean for handlebars use if the factsheet has custom_markdown
    for (let i = 0; i < factsheets.length; i++) {
      console.log(factsheets[i]);
      if (factsheets[i].custom_markdown) {
        factsheets[i].has_custom_markdown = true;
      } else {
        factsheets[i].has_custom_markdown = false;
      }
      if (
        !factsheets[i].usercomments ||
        factsheets[i].usercomments.length === 0
      ) {
        factsheets[i].has_usercomments = false;
      } else {
        factsheets[i].has_usercomments = true;
      }
    }

    // html format
    const htmlFormat = formatFactsheetListItems(factsheets);
    res.status(200).send(htmlFormat);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "An error occurred while retrieving the factsheets",
    });
  }
});

// show the personalise factsheet page for editing custom markdown
router.get("/personalise/:id", withAdminAuth, async (req, res) => {
  // get the factsheet id from the url
  let { id } = req.params;
  // validate
  if (!id || Number.parseInt(id) < 1) {
    res.status(400).json({ error, message: "Invalid factsheet id" });
    return;
  }
  id = Number.parseInt(id);
  // get the factsheet
  let factsheet = await Factsheet.findByPk(id);
  if (!factsheet) {
    res.status(404).json({ error, message: "Factsheet not found" });
    return;
  }
  factsheet = factsheet.get({ plain: true });

  console.log(factsheet);
  // display the personalise page
  res.render("factsheet-personalise", {
    factsheet,
    pageTitle: "Personalise Factsheet",
    administrator_id: req.session.user_id,
    returnPath: "/admin",
  });
});

// link a template to a user via creating a factsheet
router.post("/link/", withAdminAuth, async (req, res) => {
  // post to use body for info
  let { templateId, userId } = req.body;
  // validate
  if (!templateId || Number.parseInt(templateId) < 1) {
    res.status(400).json({ error, message: "Invalid factsheet id" });
    return;
  }
  if (!userId || Number.parseInt(userId) < 1) {
    res.status(400).json({ message: "Invalid user id" });
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
      res.status(500).json({ error, message: "Failed to create link" });
      return;
    }
    // return the list of factsheets for the user, formatted as html
    const factsheets = await getUserFactsheets(userId);
    const htmlFormat = formatFactsheetListItems(factsheets);
    res.status(200).send(htmlFormat);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "An error occurred while creating the factsheet link",
    });
  }
});

// update a factsheet's custom_markdown
router.put("/custom_markdown/:id", withAuth, async (req, res) => {
  let factsheet_id = req.params.id;
  let { markdown, administrator_id } = req.body;
  // validate that the factsheet exists
  if (!factsheet_id || Number.parseInt(factsheet_id) < 1) {
    res.status(400).json({ message: "Invalid factsheet id" });
    return;
  }
  factsheet_id = Number.parseInt(factsheet_id);
  administrator_id = Number.parseInt(administrator_id);

  try {
    const updatedFactsheet = await Factsheet.update(
      { custom_markdown: markdown, administrator_id },
      { where: { id: factsheet_id } }
    );
    if (!updatedFactsheet) {
      res.status(404).json({ message: "Factsheet not found" });
      return;
    }
    res.status(200).json({ message: "Factsheet updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "An error occurred while updating the factsheet",
    });
  }
});

// delete a factsheet
router.delete("/delete/:id", withAdminAuth, (req, res) => {
  const factsheet_id = req.params.id;

  try {
    const deletedFactsheet = Factsheet.destroy({
      where: { id: factsheet_id },
    });

    if (deletedFactsheet === 0) {
      return res.status(404).json({ message: "Factsheet not found" });
    }

    return res.json({ message: "Factsheet deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      message: "An error occurred while deleting the factsheet",
    });
  }
});

// delete a comment from a factsheet
router.delete("/comment/:id", withAuth, (req, res) => {
  const usercomment_id = req.params.id;

  try {
    const deletedUsercomment = UserComment.destroy({
      where: { id: usercomment_id },
    });

    if (deletedUsercomment === 0) {
      return res.status(404).json({ error, message: "User comment not found" });
    }

    return res.json({ message: "Usercomment deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      message: "An error occurred while deleting the user comment",
    });
  }
});

// get a single factsheet by id
router.get("/:id", withAuth, async (req, res) => {
  // get the factsheet by id
  let id = req.params.id;
  if (!id || Number.parseInt(id) < 1) {
    res.status(400).json({ error, message: "Invalid factsheet id" });
    return;
  }
  try {
    id = Number.parseInt(id);
    const factsheet = await Factsheet.findByPk(id, {
      where: { id },
    });
    if (!factsheet) {
      res.status(404).json({ error, message: "No factsheet found" });
      return;
    }
    const factsheetData = factsheet.get({ plain: true });
    res.status(200).json(factsheetData);
  } catch (error) {
    res.status(500).json({ error, message: "Error retrieving factsheet" });
  }
});

module.exports = router;
