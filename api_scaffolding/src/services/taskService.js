const taskRepo = require('../repositories/taskRepository');
const userRepo = require('../repositories/userRepository');

async function createTask(task) {
  // validate minimal fields
  if (!task.title) throw { status: 400, message: 'title is required' };
  if (task.user_id) {
    const user = await userRepo.getById(task.user_id);
    if (!user) throw { status: 400, message: 'user_id does not reference an existing user' };
  }
  const created = await taskRepo.create(task);
  return created;
}

async function updateTask(id, task) {
  if (task.user_id) {
    const user = await userRepo.getById(task.user_id);
    if (!user) throw { status: 400, message: 'user_id does not reference an existing user' };
  }
  const ok = await taskRepo.updateById(id, task);
  if (!ok) throw { status: 404, message: 'task not found' };
  return { id: Number(id), ...task };
}

async function deleteTask(id) {
  const ok = await taskRepo.deleteById(id);
  if (!ok) throw { status: 404, message: 'task not found' };
  return ok;
}

async function listTasks(filter) {
  return taskRepo.getAll(filter || {});
}

async function getTask(id) {
  const t = await taskRepo.getById(id);
  if (!t) throw { status: 404, message: 'task not found' };
  return t;
}

module.exports = { createTask, updateTask, deleteTask, listTasks, getTask };
