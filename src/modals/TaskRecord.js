const sequelize = require("../config/instance");
const {
  DataTypes: { STRING, TEXT, INTEGER },
} = require("sequelize");
const TaskRecord = sequelize.define("TaskRecord", {
  taskId: { type: TEXT, allowNull: false },
  groupId: { type: STRING, allowNull: false },
  userId: { type: STRING, allowNull: false },
  actionDate: { type: STRING, allowNull: false },
});
module.exports = TaskRecord;
