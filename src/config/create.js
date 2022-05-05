// 建表
const User = require("../modals/User");
const Group = require("../modals/Group");
const sequelize = require("./instance");
const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("初始化成功");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
init();
