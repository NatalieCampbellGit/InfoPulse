const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { convertMarkdownToHTML } = require("../utils/markdown-utils");
const { sanitizeHTML } = require("../utils/html-utils");
class Template extends Model {}

Template.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "category",
        key: "id",
      },
    },
    markdown: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    administrator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "administrator",
        key: "id",
      },
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (newData) => {
        // convert markdown to html and sanitise the html
        let html = await convertMarkdownToHTML(newData.markdown);
        html = sanitizeHTML(html);
        newData.html = html;
        return newData;
      },
      beforeUpdate: async (updatedData) => {
        // convert markdown to html and sanitise the html
        let html = await convertMarkdownToHTML(updatedData.markdown);
        html = sanitizeHTML(html);
        updatedData.html = html;
        return updatedData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "template",
  }
);

module.exports = Template;
