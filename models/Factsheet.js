const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const { convertMarkdownToHTML } = require('../utils/markdown-utils')
const { sanitizeHTML } = require('../utils/html-utils')
class Factsheet extends Model {

}

Factsheet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "template",
        key: "id",
      },
    },
    administrator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "administrator",
        key: "id",
      },
    },
    custom_markdown: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    custom_html: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date_last_viewed: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      beforeCreate: async (newData) => {
        // convert markdown to html and sanitise the html
        newData.custom_html = await convertMarkdownToHTML(
          newData.custom_markdown
        );
        newData.custom_html = sanitizeHTML(newData.custom_html);
        return newData;
      },
      beforeUpdate: async (updatedData) => {
        // convert markdown to html and sanitise the html
        updatedData.custom_html = await convertMarkdownToHTML(
          updatedData.custom_markdown
        );
        updatedData.custom_html = sanitizeHTML(updatedData.custom_html);
        return updatedData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "factsheet",
  }
);

module.exports = Factsheet;
