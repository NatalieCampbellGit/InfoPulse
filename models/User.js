const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
const generatePassphrase = require("../utils/codes-utils");

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }


  validateName(name){
    const allowedChars = /^[A-Za-z]+$/;

    if(allowedChars.test(name) === false){
      return false;
    }
    else if(name < 0 || name > 40){
      return false;

    }else if(name == "" || name == null){
      return false;

    }else{
      return true;
    };
  }

  checkAuthenticationCode(loginAuthenticationCode) {
    // if the user has already created a password and username, then the authentication code is unnecessary
    if (this.username && this.password) {
      return true;
    } else {
      const codeMatches = loginAuthenticationCode === this.authentication_code;
      return codeMatches;
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    administrator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "administrator",
        key: "id",
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 64],
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 64],
      },
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [1, 64],
      },
    },
    mobile_phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [11, 18],
      },
    },
    crm_id: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 64],
      },
    },
    authentication_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [12, 64],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        newUserData.authentication_code = generatePassphrase();
        newUserData.email = newUserData.email.toLowerCase();
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        updatedUserData.email = updatedUserData.email.toLowerCase();
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
