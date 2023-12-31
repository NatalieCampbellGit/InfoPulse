/* eslint-disable camelcase */
const {
  Template,
  Category,
  Factsheet,
  User,
  UserComment,
  Administrator,
} = require("../models");
const { addInlineCSSTags } = require("./markdown-utils");

// return all categories
async function getAllCategories() {
  try {
    const categories = await Category.findAll({
      order: [["title", "ASC"]],
    });
    if (!categories) {
      return [];
    }
    const categoriesData = categories.map((category) =>
      category.get({ plain: true })
    );
    return categoriesData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// return all templates with included category data
async function getAllTemplates() {
  try {
    const templates = await Template.findAll({
      include: [{ model: Category }],
      order: [
        [Category, "title", "ASC"],
        ["title", "ASC"],
      ],
    });
    if (!templates) {
      return [];
    }
    const templatesData = templates.map((template) =>
      template.get({ plain: true })
    );
    return templatesData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// return all templates with included category data that have public set to true
async function getAllPublicTemplates() {
  try {
    const templates = await Template.findAll({
      include: [{ model: Category }],
      order: [
        [Category, "title", "ASC"],
        ["title", "ASC"],
      ],
      where: { public: true },
    });
    if (!templates) {
      return [];
    }
    const templatesData = templates.map((template) =>
      template.get({ plain: true })
    );
    return templatesData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// get all templates with a particular category
async function getTemplatesByCategoryId(categoryId) {
  try {
    categoryId = parseInt(categoryId);
    const templates = await Template.findAll({
      include: [{ model: Category }],
      order: [["title", "ASC"]],
      where: { category_id: categoryId },
    });
    if (!templates) {
      return [];
    }
    const templatesData = templates.map((template) =>
      template.get({ plain: true })
    );
    return templatesData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// get a user's factsheets, including template and category data and user comments
async function getUserFactsheets(userId) {
  try {
    userId = parseInt(userId);
    const factsheets = await Factsheet.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Template,
          include: [{ model: Category }],
          order: [[Category, "title", "ASC"]],
        },
        { model: UserComment },
      ],
      order: [[Template, "title", "ASC"]],
    });
    if (!factsheets) {
      return [];
    }
    const factsheetsData = factsheets.map((factsheet) =>
      factsheet.get({ plain: true })
    );
    return factsheetsData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// get an administrator by id
async function getAdministratorById(id) {
  try {
    id = parseInt(id);
    const administrator = await Administrator.findByPk(id);
    if (!administrator) {
      return null;
    }
    const administratorData = administrator.get({ plain: true });
    return administratorData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getTemplateById(id) {
  try {
    id = parseInt(id);
    const template = await Template.findByPk(id, {
      include: [{ model: Category }],
    });
    if (!template) {
      return null;
    }
    const templateData = template.get({ plain: true });
    return templateData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get a user by id, include their factsheets (and the template), comments, and administrators
async function getUserById(id) {
  if (!id) {
    return null;
  }
  if (Number.isNaN(id)) {
    return null;
  }
  id = parseInt(id);
  if (id < 1) {
    return null;
  }

  try {
    id = parseInt(id);
    const user = await User.findByPk(id, {
      include: [
        {
          model: Factsheet,
          include: [
            {
              model: Template,
              include: [{ model: Category }],
            },
            {
              model: UserComment,
            },
          ],
          order: [["title", "ASC"]],
        },
        { model: Administrator },
      ],
    });
    if (!user) {
      return null;
    }
    const userData = user.get({ plain: true });
    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getUserDashboardData(user_id) {
  const userData = await getUserById(user_id);

  if (!userData) {
    return null;
  }
  userData.currentPage = "userDashboard";

  // convert the user's factsheet html to use inline styles
  for (let i = 0; i < userData.factsheets.length; i++) {
    let html = userData.factsheets[i].template.html;
    html = await addInlineCSSTags(html);
    userData.factsheets[
      i
    ].template.html = `<div class="markdown text-pulse-bluegrey-900">${html}</div>`;

    const customMarkdown = userData.factsheets[i].custom_markdown;
    if (customMarkdown) {
      if (customMarkdown.length > 0) {
        userData.factsheets[i].hasCustomMarkdown = true;
        html = userData.factsheets[i].custom_html;
        html = await addInlineCSSTags(html);
        userData.factsheets[
          i
        ].custom_html = `<div class="markdown text-pulse-bluegrey-900">${html}</div>`;
      } else {
        userData.factsheets[i].hasCustomMarkdown = false;
      }
    } else {
      userData.factsheets[i].hasCustomMarkdown = false;
    }

    if (userData.factsheets[i].usercomments.length > 0) {
      userData.factsheets[i].hasComments = true;
    } else {
      userData.factsheets[i].hasComments = false;
    }
  }

  return userData;
}

// pull together all the data needed for the Administrator Dashboard
async function getAdministratorDashboardData(administrator_id) {
  try {
    const administrator = await getAdministratorById(administrator_id);
    if (!administrator) {
      return null;
    }
    const categories = await getAllCategories();
    if (!categories) {
      return null;
    }
    const templates = await getAllTemplates();
    if (!templates) {
      return null;
    }

    // return the administrator data, categories, and templates
    return {
      administrator_id,
      administrator,
      categories,
      templates,
      currentPage: "adminDashboard",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get the data needed to display the edit template page
async function getTemplateEditData(template_id) {
  template_id = parseInt(template_id);
  // get the categories to for the dropdown
  const categories = await getAllCategories();

  // is it a new template or an existing one?
  if (!template_id || template_id === 0) {
    // new template
    return {
      categories,
      template_id,
      template: null,
    };
  }
  const template = await getTemplateById(template_id);
  // doesn't exist: create a new one
  if (!template) {
    return {
      categories,
      template_id,
      template: null,
    };
  }
  // return the template data
  return {
    categories,
    template_id,
    template,
  };
}

module.exports = {
  getAllCategories,
  getAllTemplates,
  getTemplatesByCategoryId,
  getAllPublicTemplates,
  getUserFactsheets,
  getAdministratorById,
  getUserById,
  getTemplateById,
  getAdministratorDashboardData,
  getUserDashboardData,
  getTemplateEditData,
};
