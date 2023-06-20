const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class UserComment extends Model {
}

UserComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    factSheetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'factsheet',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.STRING,
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
    modelName: 'usercomment'
  }
)

module.exports = UserComment
