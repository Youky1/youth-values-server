// 导出实例
const { Sequelize } = require("sequelize");
const config = {
  database: "youth_values",
  username: "root",
  password: "123456",
  host: "localhost",
  dialect: "mysql",
};
const sequelize = new Sequelize(config);
console.log("sequelize"), sequelize;
module.exports = sequelize;
