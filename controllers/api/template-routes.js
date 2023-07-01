/* eslint-disable camelcase */
const { Op } = require("sequelize");
const Template = require("../../models/Template");
const Category = require("../../models/Category");
const { withAuth, withAdminAuth } = require("../../utils/auth");
const router = require("express").Router();
const {
  formatTemplateListItems,
  sanitizeHTML,
} = require("../../utils/html-utils");
const {
  getTemplateById,
  getTemplateEditData,
  getAllCategories,
  getTemplatesByCategoryId,
} = require("../../utils/model-utils");
const { addInlineCSSTags } = require("../../utils/markdown-utils");

// route to create a new Template
router.post("/", withAdminAuth, async (req, res) => {
  try {
    const markdown = req.body.markdown;
    const title = req.body.title;
    let administrator_id = req.body.administrator_id;
    let category_id = req.body.category_id;
    const description = req.body.description;
    let publicTemplate = req.body.publicTemplate;

    if (publicTemplate === undefined) {
      publicTemplate = true;
    }

    if (administrator_id === undefined) {
      administrator_id = 1;
    }
    administrator_id = parseInt(administrator_id);
    if (!category_id) {
      res.status(400).json({ message: "Invalid category chosen" });
      return;
    }
    category_id = parseInt(category_id);

    // validation
    if (
      !markdown ||
      !title ||
      !administrator_id ||
      !category_id ||
      !description
    ) {
      res.status(400).json({ message: "Invalid Template data" });
      return;
    }

    const newTemplate = await Template.create({
      title,
      description,
      category_id,
      markdown,
      html: "",
      administrator_id,
      public: publicTemplate,
    });

    res.status(200).json(newTemplate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error creating template" });
  }
});

// route to update a Template
router.put("/:id", withAdminAuth, async (req, res) => {
  try {
    let template_id = req.params.id;
    const markdown = req.body.markdown;
    const title = req.body.title;
    let administrator_id = req.body.administrator_id;
    let category_id = req.body.category_id;
    const description = req.body.description;
    let publicTemplate = req.body.publicTemplate;

    if (publicTemplate === undefined) {
      publicTemplate = true;
    }

    if (Number.isNaN(template_id)) {
      res.status(400).json({ message: "Invalid template id" });
      return;
    }
    template_id = parseInt(template_id);
    if (template_id < 1) {
      res.status(400).json({ message: "Invalid template id" });
      return;
    }

    // validation
    if (
      !template_id ||
      !markdown ||
      !title ||
      !administrator_id ||
      !category_id ||
      !description
    ) {
      res.status(400).json({ message: "Invalid Template data" });
      return;
    }
    administrator_id = parseInt(administrator_id);
    category_id = parseInt(category_id);

    try {
      const updatedTemplate = await Template.update(
        {
          markdown,
          title,
          administrator_id,
          category_id,
          description,
          public: publicTemplate,
        },
        {
          where: {
            id: template_id,
          },
        }
      );
      res.status(200).json(updatedTemplate);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: "Error updating template" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error updating template" });
  }
});

// route to go to the UI to create a new template
router.get("/new", withAdminAuth, async (req, res) => {
  try {
    const templateData = {
      administrator_id: Number.parseInt(req.session.user_id),
      categories: await getAllCategories(),
      returnPath: "/admin",
      template_id: 0,
      title: "",
      markdown: "",
      description: "",
      category_id: 0,
    };
    res.render("template-edit", templateData);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
});

// route to edit a template via handlebars
router.get("/edit", withAdminAuth, async (req, res) => {
  try {
    let template_id = req.query.id;
    let returnPath = req.query.path;

    if (!template_id) {
      res.status(404).json({ message: "Template not found" });
      return;
    }
    if (isNaN(template_id)) {
      res.status(404).json({ message: "Template not found" });
      return;
    }
    template_id = parseInt(template_id);
    if (template_id < 1) {
      res.status(404).json({ message: "Template not found" });
      return;
    }
    const templateData = await getTemplateEditData(template_id);
    if (!templateData) {
      res.status(404).json({ message: "Template not found" });
      return;
    }
    templateData.administrator_id = req.session.user_id;
    if (!returnPath || returnPath === "") {
      returnPath = "/admin";
    }
    templateData.returnPath = returnPath;

    console.log(templateData);
    res.render("template-edit", templateData);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
});

// gets a template, adds inline css to the html, returns the html
router.get("/formatted/:id", withAuth, async (req, res) => {
  let template_id = req.params.id;
  if (!template_id) {
    res.status(404).json({ message: "Template not found" });
    return;
  }
  if (isNaN(template_id)) {
    res.status(404).json({ message: "Template not found" });
    return;
  }
  template_id = parseInt(template_id);

  const templateData = await getTemplateById(template_id);
  if (!templateData) {
    res.status(404).json({ message: "Template not found" });
    return;
  }
  let html = templateData.html;
  html = sanitizeHTML(html);
  html = await addInlineCSSTags(html);
  html = `<div class="markdown text-pulse-grey-dark">${html}</div>`;

  res.status(200).send(html);
});

// get a single template
router.get("/:id", withAuth, async (req, res) => {
  let template_id = req.params.id;
  if (!template_id) {
    res.status(404).json({ message: "Template not found" });
    return;
  }
  if (isNaN(template_id)) {
    res.status(404).json({ message: "Template not found" });
    return;
  }
  template_id = parseInt(template_id);

  const templateData = await getTemplateById(template_id);
  if (!templateData) {
    res.status(404).json({ message: "Template not found" });
    return;
  }
  res.status(200).json(templateData);
});

// route a for a search on the templates model using either an id or text search
router.post("/search", withAuth, async (req, res) => {
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
      // add a minimum length for the search text
      if (searchTerm.length > 2) {
        searchTermIsValid = true;
      }
    }
  }

  if (searchMarkdown) {
    if (typeof searchMarkdown === "string") {
      // add a minimum length for the search text
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
            .send('<p class="text-pulse-green-500">No templates found</p>');
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
        res.status(200).send(formatTemplateListItems(templates));
        return;
      default:
        res.status(200).json(templates);
    }
  } catch (error) {
    console.error("Error retrieving template search results", error);
    res.status(500).send("Error retrieving template search results");
  }
});

// delete a template
router.delete("/delete/:id", withAdminAuth, async (req, res) => {
  let template_id = req.params.id;
  if (!template_id) {
    return res.status(404).json({ message: "Template not found" });
  }
  if (isNaN(template_id)) {
    return res.status(404).json({ message: "Template not found" });
  }
  template_id = parseInt(template_id);

  try {
    const deletedTemplate = await Template.destroy({
      where: { id: template_id },
    });

    if (deletedTemplate === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "Template deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      message: "An error occurred while deleting the template",
    });
  }
});

// get all templates for a category
router.get("/category/:id", withAuth, async (req, res) => {
  let category_id = req.params.id;

  if (!category_id) {
    res.status(404).json({ message: "Category not found" });
    return;
  }

  if (isNaN(category_id)) {
    res.status(404).json({ message: "Category not found" });
    return;
  }

  category_id = parseInt(category_id);
  if (category_id < 1) {
    res.status(404).json({ message: "Category not found" });
    return;
  }

  const templateData = await getTemplatesByCategoryId(category_id);
  if (!templateData) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  res.status(200).json(templateData);
});

module.exports = router;
