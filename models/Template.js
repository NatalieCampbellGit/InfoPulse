const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Template extends Model {

}

Template.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    markdown: {
      type: DataTypes.STRING,
      allowNull: false
    },
    html: {
      type: DataTypes.STRING,
      allowNull: false
    },
    administratorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'administrator',
        key: 'id'
      }
    }
  },
  {
    hooks: {
      beforeCreate: async (newData) => {
        return newData
      }
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'template'
  }
)

module.exports = Template
