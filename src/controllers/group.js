const {
  addGroup,
  searchGroup,
  removeGroup,
  updateGroup,
  addUsers,
  removeUser,
} = require("../service/group");

// 创建小组
const create = async (ctx) => {
  try {
    const { id, description, owner } = ctx.request.body;
    await addGroup(id, description, owner);
    ctx.body = { status: true };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

// 删除小组
const remove = async (ctx) => {
  try {
    const { id } = ctx.request.body;
    await removeGroup(id);
    ctx.body = { status: true };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

// 更新小组描述
const update = async (ctx) => {
  try {
    const { id, description } = ctx.request.body;
    await updateGroup(id, description);
    ctx.body = { status: true };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

// 为小组添加成员
const join = async (ctx) => {
  try {
    const { id, userId } = ctx.request.body;
    await addUsers(id, userId);
    ctx.body = { status: true };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

// 查询所有小组
const all = async (ctx) => {
  try {
    const { id = null } = ctx.query;
    const groups = await searchGroup(id);
    ctx.body = { status: true, data: groups };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

// 退出小组
const quit = async (ctx) => {
  try {
    const { id, userId } = ctx.request.body;
    await removeUser(id, userId);
    ctx.body = { status: true };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

module.exports = { create, remove, update, join, all, quit };
