// 建表
const initModals = require("../modals/User");
const sequelize = require("./instance");
const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
init();
