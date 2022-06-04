const moment = require("moment");
const TaskRecord = require("../modals/TaskRecord");

const addRecord = async (groupId, taskId, userId, actionDate) => {
  try {
    await TaskRecord.create({ groupId, taskId, userId, actionDate });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

// 某小组内最早/晚的打卡事件
const searchRecordRange = async (groupId) => {
  try {
    const records = await TaskRecord.findAll({ where: { groupId } });
    if (records.length === 0) {
      return Promise.reject("没有打卡记录");
    }
    let early = moment(records[0].dataValues.actionTime).hour(),
      late = moment(records[0].dataValues.actionTime).hour(),
      earlyUser = records[0].dataValues.userId,
      lateUser = records[0].dataValues.userId;
    records.forEach((item) => {
      const time = moment(item.dataValues.actionTime).hour();
      if (time > late) {
        late = time;
        lateUser = item.dataValues.userId;
      }
      if (time < early) {
        early = time;
        earlyUser = item.dataValues.userId;
      }
    });
    return Promise.resolve({
      early: { time: early, user: earlyUser },
      late: { time: late, user: lateUser },
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = {
  addRecord,
  searchRecordRange,
};
