const fs = require("fs");
const path = require("path");
const basePath = path.join(__dirname, "controllers");
const files = fs.readdirSync(basePath);

const createRouter = (router) => {
  files.forEach((file) => {
    const controllers = require(path.join(basePath, file));
    const name = file.split(".js")[0];
    for (const key in controllers) {
      router.all(`/${name}/${key}`, controllers[key]);
    }
  });
};
module.exports = createRouter;
