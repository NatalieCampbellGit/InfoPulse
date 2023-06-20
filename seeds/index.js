// Purpose: to create the database tables and relationships
// via synchronizing the Sequelize models with the database
const sequelize = require('../config/connection')

const seedAll = async () => {
  await sequelize.sync({ force: true })
  process.exit(0)
}

// TODO add data to tables here

seedAll()
