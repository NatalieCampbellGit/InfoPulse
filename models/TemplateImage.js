const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class TemplateImage extends Model {
}

TemplateImage.init(
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
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_data: {
      type: DataTypes.BLOB('medium'),
      allowNull: false
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
    modelName: 'templateimage'
  }
)

module.exports = TemplateImage
