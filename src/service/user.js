const User = require("../modals/User");

const createUser = async (id, password) => {
  try {
    const users = await User.findAll({
      where: {
        id,
        password,
      },
    });
    if (users.length > 0) {
      return Promise.reject("账号已存在");
    }
    await User.create({ id, password });
    return Promise.resolve();
  } catch (e) {
    console.log("e: ", e);
    return Promise.reject(e);
  }
};

const searchUser = async (id, password) => {
  const where = password
    ? {
        id,
        password,
      }
    : { id };
  try {
    const users = await User.findAll({
      where,
    });
    return users.length > 0
      ? Promise.resolve(users)
      : Promise.reject("用户不存在");
  } catch (e) {
    return Promise.reject(e);
  }
};

const removehUser = async (id, password) => {
  try {
    const users = await User.destroy({
      where: { id, password },
    });
    return users > 0 ? Promise.resolve() : Promise.reject();
  } catch (e) {
    return Promise.reject(e);
  }
};

const updateUser = async (id, password, newPassword) => {
  try {
    const users = await User.update(
      { password: newPassword },
      {
        where: { id, password },
      }
    );
    return users.length > 0 ? Promise.resolve(users) : Promise.reject();
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = {
  createUser,
  searchUser,
  removehUser,
  updateUser,
};
