const sequelize = require("../config/instance");
const {
  DataTypes: { STRING, TEXT, INTEGER },
} = require("sequelize");
const Task = sequelize.define("Task", {
  taskId: { type: TEXT, allowNull: false },
  groupId: { type: STRING, allowNull: false },
  createDate: { type: STRING, allowNull: false },
  completed: { type: INTEGER, allowNull: false },
});
module.exports = Task;
