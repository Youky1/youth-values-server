const sequelize = require("../config/instance");
const {
  DataTypes: { STRING },
} = require("sequelize");
const User = sequelize.define("User", {
  id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
});
module.exports = User;
