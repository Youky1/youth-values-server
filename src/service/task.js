const Task = require("../modals/Task");

// 查询本小组任务
const searchTask = async (groupId) => {
  try {
    const tasks = await Task.findAll({ where: { groupId } });
    return Promise.resolve(tasks.map((item) => item.dataValues));
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

// 创建任务
const insertTask = async (groupId, taskId) => {
  try {
    const exsitTask = await Task.findAll({ where: { taskId, groupId } });
    if (exsitTask.length > 0) {
      return Promise.reject("该任务已存在");
    }
    await Task.create({
      taskId,
      groupId,
      createDate: new Date().toLocaleDateString(),
      completed: 0,
    });
    return Promise.resolve();
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

// 删除任务
const removeTask = async (groupId, taskId) => {
  try {
    const exsitTask = await Task.findAll({ where: { taskId, groupId } });
    if (exsitTask.length === 0) {
      return Promise.reject("该任务不存在");
    }
    await Task.destroy({ where: { taskId, groupId } });
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

// 完成任务
const finishTask = async (groupId, taskId) => {
  try {
    const exsitTask = await Task.findAll({ where: { taskId, groupId } });
    if (exsitTask.length === 0) {
      return Promise.reject("该任务不存在");
    }
    await Task.increment("completed", { where: { groupId, taskId } });
    return Promise.resolve();
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

module.exports = {
  searchTask,
  insertTask,
  removeTask,
  finishTask,
};
