const { DataTypes } = require("sequelize");
const Sequelize = require("../setup/database");

const UserModel = Sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profileImgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "Users" }
);

module.exports = UserModel;
