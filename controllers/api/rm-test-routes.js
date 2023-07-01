const router = require("express").Router();
const Template = require("../../models/Template");
const FactSheet = require("../../models/Factsheet");
const UserComment = require("../../models/UserComment");
const User = require("../../models/User");
const Administrator = require("../../models/Administrator");
const Category = require("../../models/Category");
const { withAuth, withAdminAuth } = require("../../utils/auth");

router.get("/edit", withAdminAuth, async (req, res) => {
  res.render("rm-test-edit-template");
});

router.get("/categories", withAuth, async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      res.status(404).send("No categories found");
      return;
    }
    const categoriesData = categories.map((category) =>
      category.get({ plain: true })
    );
    res.status(200).json(categoriesData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving categories");
  }
});

router.get("/templates/:id", withAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const template = await Template.findByPk(id);
    if (!template) {
      res.status(404).send("A template by that id was not found");
      return;
    }
    const templateData = template.get({ plain: true });
    res.status(200).json(templateData);
  } catch (error) {
    res.status(500).send("An error occurred while retrieving template");
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const factSheet = await FactSheet.findByPk(id, {
      include: [
        { model: Template },
        { model: UserComment },
        { model: User },
        { model: Administrator },
      ],
    });

    if (!factSheet) {
      res.status(404).send("A fact sheet by that id was not found");
      return;
    }

    const factSheetData = factSheet.get({ plain: true });
    // console.log(factSheetData)
    res.render("rm-fact-sheet", factSheetData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving fact sheet");
  }
});

// catch others and send the 404 page
router.get("*", (req, res) => {
  res.render("error-404");
});

module.exports = router;
