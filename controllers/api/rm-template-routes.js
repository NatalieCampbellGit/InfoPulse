const { sequelize, Op } = require("sequelize");
const Template = require("../../models/Template");
const Category = require("../../models/Category");
const { withAuth, withAdminAuth } = require("../../utils/auth");
const router = require("express").Router();
const { formatTemplateListItems } = require("../../utils/html-utils");
const {
  getAdministratorDashboardData,
  getTemplateById,
} = require("../../utils/models-utils");

// route to edit a template via handlebars
router.get("/edit/:id", withAdminAuth, async (req, res) => {
  try {
    const template_id = req.params.id;
    const adminData = await getAdministratorDashboardData(
      req.session.user_id,
      1,
      template_id
    );
    console.log(adminData);
    res.render("admin-dashboard", adminData);
  } catch (err) {
    console.log(err);
    res.status(404).render("error-404", { message: err });
  }
});

router.get("/:id", withAuth, async (req, res) => {
  const template_id = req.params.id;
  const templateData = await getTemplateById(template_id);
  if (!templateData) {
    res.status(404).render("error-404", { message: "Template not found" });
    return;
  }
  res.status(200).json(templateData);
});

// route a for a search on the templates model using either an id or text search
router.post("/search", withAuth, async (req, res) => {
  console.log(req.body);
  let { id, searchTerm, searchMarkdown, returnFormat } = req.body;

  // validate the search criteria
  let idIsValid = false;
  let searchTermIsValid = false;
  let searchMarkdownIsValid = false;

  if (id) {
    if (!isNaN(id)) {
      id = parseInt(id);
      if (id > 0) {
        idIsValid = true;
      }
    }
  }

  if (searchTerm) {
    if (typeof searchTerm === "string") {
      //add a minimum length for the search text
      if (searchTerm.length > 2) {
        searchTermIsValid = true;
      }
    }
  }

  if (searchMarkdown) {
    if (typeof searchMarkdown === "string") {
      //add a minimum length for the search text
      if (searchMarkdown.length > 2) {
        searchMarkdownIsValid = true;
      }
    }
  }

  // create a empty query object
  let query = {};
  if (!searchTermIsValid && !idIsValid && !searchMarkdownIsValid) {
    // if neither search criteria is valid, return all templates
  } else if (idIsValid && searchTermIsValid && searchMarkdownIsValid) {
    query = {
      category_id: id,
      markdown: {
        [Op.like]: `%${searchMarkdown}%`,
      },
      title: {
        [Op.like]: `%${searchTerm}%`,
      },
    };
  } else if (idIsValid && searchTermIsValid) {
    query = {
      category_id: id,
      title: {
        [Op.like]: `%${searchTerm}%`,
      },
    };
  } else if (idIsValid && searchMarkdownIsValid) {
    query = {
      category_id: id,
      markdown: {
        [Op.like]: `%${searchMarkdown}%`,
      },
    };
  } else if (searchTermIsValid && searchMarkdownIsValid) {
    query = {
      markdown: {
        [Op.like]: `%${searchMarkdown}%`,
      },
      title: {
        [Op.like]: `%${searchTerm}%`,
      },
    };
  } else if (searchTermIsValid) {
    query = {
      title: {
        [Op.like]: `%${searchTerm}%`,
      },
    };
  } else if (searchMarkdownIsValid) {
    query = {
      markdown: {
        [Op.like]: `%${searchMarkdown}%`,
      },
    };
  } else if (idIsValid) {
    query = {
      category_id: id,
    };
  }

  // Query the model based on the search criteria
  try {
    const templateData = await Template.findAll({
      include: [
        {
          model: Category,
        },
      ],
      where: query,
      order: [["title", "ASC"]],
    });
    if (!templateData || templateData.length === 0) {
      switch (returnFormat) {
        case "html":
          res
            .status(200)
            .send(`<p class="text-pulse-green-500">No templates found</p>`);
          break;
        default:
          res.status(404).json({ message: "No template images were found" });
      }
      return;
    }
    // return the data
    const templates = templateData.map((image) => image.get({ plain: true }));
    switch (returnFormat) {
      case "html":
        // use handlebars to render the data
        const htmlFormat = formatTemplateListItems(templates);
        res.status(200).send(htmlFormat);
        break;
      default:
        res.status(200).json(templates);
    }
  } catch (error) {
    console.error("Error retrieving template search results", error);
    res.status(500).send("Error retrieving template search results");
  }
});

// ! really important to export the router
module.exports = router;