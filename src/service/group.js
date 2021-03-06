const Teams = require("../modals/Teams");
const { searchUser } = require("./user");

const addGroup = async (id, description, owner) => {
  try {
    const users = JSON.stringify([owner]);
    const createDate = new Date().toLocaleDateString();
    await Teams.create({
      id,
      description,
      owner,
      users,
      createDate,
    });
    return Promise.resolve();
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

const searchGroup = async (id) => {
  try {
    const groups = id
      ? await Teams.findOne({ where: { id } })
      : await Teams.findAll();
    return Promise.resolve(
      groups.map((item) => ({
        ...item.dataValues,
        users: JSON.parse(item.dataValues.users),
      }))
    );
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

const removeGroup = async (id) => {
  try {
    const groups = await Teams.destroy({ where: { id } });
    return groups > 0 ? Promise.resolve() : Promise.reject("未找到该小组");
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

const updateGroup = async (id, description) => {
  try {
    await Teams.update({ description }, { where: { id } });
    return Promise.resolve();
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

const addUsers = async (id, userId) => {
  try {
    await searchUser(userId);
    const group = await Teams.findAll({ where: { id } });
    const users = JSON.parse(group[0].dataValues.users);
    if (users.includes(userId)) {
      return Promise.reject("该成员已经存在");
    }
    const list = JSON.stringify([...users, userId]);
    await Teams.update({ users: list }, { where: { id } });
    return Promise.resolve();
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

const removeUser = async (id, userId) => {
  try {
    const groups = await Teams.findOne({ where: { id } });
    const users = JSON.parse(groups.dataValues.users);
    const index = users.indexOf(userId);
    if (index >= 0) {
      users.splice(index, 1);
      await Teams.update({ users: JSON.stringify(users) }, { where: { id } });
      return Promise.resolve();
    } else {
      return Promise.reject("该用户不是本小组成员");
    }
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

module.exports = {
  addGroup,
  searchGroup,
  removeGroup,
  updateGroup,
  addUsers,
  removeUser,
};
