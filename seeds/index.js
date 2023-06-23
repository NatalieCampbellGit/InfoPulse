// Purpose: to create the database tables and relationships
// via synchronizing the Sequelize models with the database

const sequelize = require("../config/connection");
const seedUsers = require("./seed-users");
const seedAdministrators = require("./seed-administrators.js");
const seedCategories = require("./seed-categories.js");
const seedTemplates = require("./seed-templates.js");
const seedFactsheets = require("./seed-factsheets.js");
const seedUserComments = require("./seed-usercomments.js");
const seedImages = require("./seed-images.js");
const seedMarkdownTagStyles = require("./seed-markdowntagstyles.js");

const seedAll = async () => {
  // create the tables and relationships
  await sequelize.sync({ force: true });
  // need to be in pretty much this order to maintain foreign key relationships
  await seedAdministrators();
  await seedUsers();
  await seedCategories();
  await seedTemplates();
  await seedFactsheets();
  await seedUserComments();
  await seedImages();
  await seedMarkdownTagStyles();

  process.exit(0);
};

seedAll();
