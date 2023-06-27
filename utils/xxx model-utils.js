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
  ​
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
  ​
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
  ​
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
  ​
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
  ​
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
  ​
  module.exports = {
    getAllCategories,
    getAllTemplates,
    getAllPublicTemplates,
    getUserFactsheets,
    getAdministratorById,
    getUserById,
  };