const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Factsheet extends Model {

}

Factsheet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'template',
        key: 'id'
      }
    },
    administratorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'administrator',
        key: 'id'
      }
    },
    customMarkdown: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customHtml: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateLastViewed: {
      type: DataTypes.DATE,
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
    modelName: 'factsheet'
  }
)

module.exports = Factsheet
