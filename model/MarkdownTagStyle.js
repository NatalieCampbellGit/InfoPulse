const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class MarkdownTagStyle extends Model {}

MarkdownTagStyle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    style: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newData) => {
        return newData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "markdowntagstyle",
  }
);

module.exports = MarkdownTagStyle;
