const {
  createUser,
  searchUser,
  updateUser,
  removehUser,
} = require("../service/user");

// 登录
const login = async (ctx) => {
  const { id, password } = ctx.query;
  if (!id || !password) {
    ctx.body = { status: false, msg: "id 或 password 不能为空" };
    return;
  }
  try {
    const user = await searchUser(id, password);
    ctx.body = {
      status: true,
      msg: "登录成功",
      data: user[0],
    };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

// 注册
const signup = async (ctx) => {
  const { id, password } = ctx.request.body;
  try {
    await createUser(id, password);
    ctx.body = { status: true, data: "注册成功" };
  } catch (e) {
    ctx.body = { status: false, msg: "注册失败，" + e };
  }
};

// 修改密码
const update = async (ctx) => {
  const { id, password, newPassword } = ctx.request.body;
  try {
    await updateUser(id, password, newPassword);
    ctx.body = { status: true, data: "修改成功" };
  } catch (e) {
    ctx.body = { status: false, msg: "修改失败：", e };
  }
};

const remove = async (ctx) => {
  const { id, password } = ctx.request.body;
  try {
    await removehUser(id, password);
    ctx.body = { status: true, data: "注销成功" };
  } catch (e) {
    ctx.body = { status: false, msg: "注销失败：" + e };
  }
};

module.exports = { login, signup, update, remove };
