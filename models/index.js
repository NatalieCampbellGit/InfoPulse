const User = require('./User')
const Administrator = require('./Administrator')
const Category = require('./Category')
const UserComment = require('./UserComment')
const Template = require('./Template')
const Factsheet = require('./Factsheet')
const TemplateImage = require('./TemplateImage')

// set up associations
Administrator.hasMany(User, {
  onDelete: 'CASCADE',
  foreignKey: 'administrator_id'
})

User.belongsTo(Administrator, {
  foreignKey: 'administrator_id'
})

Administrator.hasMany(Template, {
  onDelete: 'CASCADE',
  foreignKey: 'administrator_id'
})

Template.belongsTo(Administrator, {
  foreignKey: 'administrator_id'
})

Administrator.hasMany(Factsheet, {
  onDelete: 'CASCADE',
  foreignKey: 'administrator_id'
})

Factsheet.belongsTo(Administrator, {
  foreignKey: 'administrator_id'
})

User.hasMany(Factsheet, {
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
})

Factsheet.belongsTo(User, {
  foreignKey: 'user_id'
})

Category.hasMany(Template, {
  onDelete: 'SET NULL',
  foreignKey: 'category_id'
})

Template.belongsTo(Category, {
  foreignKey: 'category_id'
})

Factsheet.hasMany(UserComment, {
  onDelete: 'CASCADE',
  foreignKey: 'factsheet_id'
})

UserComment.belongsTo(Factsheet, {
  foreignKey: 'factsheet_id'
})

module.exports = { User, Administrator, Category, UserComment, Template, Factsheet, TemplateImage }
