const { sequelize, Op } = require("sequelize");
const Template = require("../../models/Template");
const Category = require("../../models/Category");
const { withAuth, withAdminAuth, withUserAuth } = require("../../utils/auth");
const router = require("express").Router();
const { formatTemplateListItems } = require("../../utils/html-utils");
const { getTemplateById, getTemplateEditData } = require("../../utils/model-utils");
const { Factsheet } = require("../../models");

// route to edit a template via handlebars
router.get("/edit/:id", withAdminAuth, async (req, res) => {
  try {
    let template_id = req.params.id;
    if (!template_id) {
      res.status(404).render("error-404", { message: "Template not found" });
      return;
    }
    if (isNaN(template_id)) {
      res.status(404).render("error-404", { message: "Template not found" });
      return;
    }
    template_id = parseInt(template_id);
    if (template_id < 1) {
      res.status(404).render("error-404", { message: "Template not found" });
      return;
    }

    let templateData = await getTemplateEditData(template_id);
    if (!templateData) {
      res.status(404).render("error-404", { message: "Template not found" });
      return;
    }
    templateData.administrator_id = req.session.user_id;

    console.log(templateData);
    res.render("template-edit", templateData);
    return;
  } catch (err) {
    console.log(err);
    res.status(404).render("error-404", { message: err });
  }
});

router.get("/:id", withAuth, async (req, res) => {
  let template_id = req.params.id;
  if (!template_id) {
    res.status(404).render("error-404", { message: "Template not found" });
    return;
  }
  if (isNaN(template_id)) {
    res.status(404).render("error-404", { message: "Template not found" });
    return;
  }
  template_id = parseInt(template_id);

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

// store a template in the DB
router.post('/edit/:id/: title', withAdminAuth, async (req, res) => {

  try{  
   

    const { title, category_id } = req.body;

    // validate
    validCatID = parseInt(category_id);
  

    
    

    const savedTemplate = await Template.create({title, validCatID})

    return res.json(savedTemplate)

  }catch(err){
    console.log(err);
     
   return res
          .status(500)
          .json({ err: "An error occurred saving"})

  }


});

// delete a template
router.delete('/admin/:id', withAdminAuth, async (req, res) => {

  const template_id = req.body.id;

try{
      const deletedTemplate = await Template.destroy({
        where: { id: template_id}
       });

       if(deletedTemplate === 0){
        return res.status(404).json({ error: "User not found"});
       }

       return res.json({ message: "Template deleted"})

  }catch (err){
    console.log(error);
    return res
    .status(500)
    .json({ error: "An error occured while deleting the template"})

  }

});


// delete a comment
// ! TO DO 
router.delete('/comment/', withAdminAuth, async (req, res) => {

  const template_id = req.body.id;

try{
      const deletedTemplate = await Template.destroy({
        where: { id: template_id}
       });

       if(deletedTemplate === 0){
        return res.status(404).json({ error: "User not found"});
       }

       return res.json({ message: "Template deleted"})

  }catch (err){
    console.log(error);
    return res
    .status(500)
    .json({ error: "An error occured while deleting the template"})

  }

});




// ! really important to export the router
module.exports = router;
