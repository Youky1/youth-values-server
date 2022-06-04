const {
  searchTask,
  insertTask,
  removeTask,
  finishTask,
} = require("../service/task");
const { addRecord, searchRecordRange } = require("../service/record");
const query = async (ctx) => {
  try {
    const { id } = ctx.request.query;
    const tasks = await searchTask(id);
    ctx.body = { status: true, data: tasks };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

const add = async (ctx) => {
  try {
    const { groupId, taskId } = ctx.request.body;
    await insertTask(groupId, taskId);
    ctx.body = { status: true };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

const remove = async (ctx) => {
  try {
    const { groupId, taskId } = ctx.request.body;
    await removeTask(groupId, taskId);
    ctx.body = { status: true };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

const finish = async (ctx) => {
  try {
    const { groupId, taskId, userId } = ctx.request.body;
    await finishTask(groupId, taskId);
    await addRecord(groupId, taskId, userId, new Date().toString());
    ctx.body = { status: true };
  } catch (e) {
    ctx.body = { status: false, msg: e };
  }
};

const record = async (ctx) => {
  try {
    const { groupId } = ctx.request.query;
    const data = await searchRecordRange(groupId);
    ctx.body = { status: true, data };
  } catch (e) {
    console.log(e);
    ctx.body = { status: false, msg: e };
  }
};

module.exports = { query, add, remove, finish, record };
