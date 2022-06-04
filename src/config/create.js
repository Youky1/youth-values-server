// 建表
const Task = require("../modals/Task");
const User = require("../modals/User");
const Teams = require("../modals/Teams");
const TaskRecord = require("../modals/TaskRecord");
const sequelize = require("./instance");
const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("初始化成功");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
init();
