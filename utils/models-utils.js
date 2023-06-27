const {
  Template,
  Category,
  Factsheet,
  User,
  UserComment,
  Administrator,
} = require("../models");
const { withAuth, withAdminAuth, withUserAuth } = require("../utils/auth");

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

// get a user's factsheets, including template and category data and user comments
async function getUserFactsheets(userId) {
  try {
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
  try {
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

// pull together all the data needed for the Administrator Dashboard
async function getAdministratorDashboardData(
  administrator_id,
  dashboardView = 0,
  template_id = null
) {
  let pagetitle;
  console.log("dashboard view " + dashboardView);

  switch (dashboardView) {
    case 0: // general data
      pagetitle = "Administrator Dashboard";
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
          dashboardView: dashboardView,
          pagetitle: pagetitle,
          partialname: "template-select",
          administrator_id,
          administrator,
          categories,
          templates,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    case 1: // edit template
      pagetitle = "Edit Template";
      categories = await getAllCategories();
      if (!template_id || template_id === 0) {
        // new template
        return {
          dashboardView,
          pagetitle,
          categories,
          administrator_id,
          partialname: "template-edit",
          template_id,
          template: null,
        };
      }
      const template = await getTemplateById(template_id);
      if (!template) {
        return {
          dashboardView,
          pagetitle,
          categories,
          administrator_id,
          partialname: "template-edit",
          template_id,
          template: null,
        };
      }
      return {
        dashboardView,
        pagetitle,
        categories,
        administrator_id,
        partialname: "template-edit",
        template_id,
        template,
      };
    default:
      return null;
  }
}

//get user dashboard data
async function getUserDashboardData(
  user_id,
  dashboardView = 0,
  template_id = null
) {
  let pagetitle;
  console.log("dashboard view " + dashboardView);

  switch (dashboardView) {
    case 0: // general data
      pagetitle = "User Dashboard";
      try {
        const user = await getUserById(user_id);
        if (!user) {
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

        // return the user data, categories, and templates
        return {
          dashboardView: dashboardView,
          pagetitle: pagetitle,
          partialname: "template-select",
          user_id,
          user,
          categories,
          templates,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    case 1: // edit template
      pagetitle = "Edit Template";
      categories = await getAllCategories();
      if (!template_id || template_id === 0) {
        // new template
        return {
          dashboardView,
          pagetitle,
          categories,
          user_id,
          partialname: "template-edit",
          template_id,
          template: null,
        };
      }
      const template = await getTemplateById(template_id);
      if (!template) {
        return {
          dashboardView,
          pagetitle,
          categories,
          user_id,
          partialname: "template-edit",
          template_id,
          template: null,
        };
      }
      return {
        dashboardView,
        pagetitle,
        categories,
        user_id,
        partialname: "template-edit",
        template_id,
        template,
      };
    default:
      return null;
  }
} 

module.exports = {
  getAllCategories,
  getAllTemplates,
  getAllPublicTemplates,
  getUserFactsheets,
  getUserDashboardData,
  getAdministratorById,
  getUserById,
  getTemplateById,
  getAdministratorDashboardData,
};
