const sequelize = require("../config/instance");
const {
  DataTypes: { STRING, TEXT },
} = require("sequelize");
const Group = sequelize.define("Group", {
  id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  description: STRING,
  owner: { type: STRING, allowNull: false },
  users: { type: TEXT, allowNull: false },
  createDate: STRING,
});
module.exports = Group;
