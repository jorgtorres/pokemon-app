const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const taskService = require('../services/taskService');

const STATUS_VALUES = ['pending', 'in_progress', 'done', 'completed'];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Create a task
router.post(
  '/',
  [
    body('title').exists().withMessage('title is required').isString().trim().notEmpty(),
    body('description').optional().isString(),
    body('status').optional().isIn(STATUS_VALUES),
    body('due_date').optional().isISO8601(),
    body('user_id').optional().isInt().toInt(),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const task = req.body;
      const created = await taskService.createTask(task);
      res.status(201).json(created);
    } catch (err) {
      const status = err && err.status ? err.status : 500;
      res.status(status).json({ error: err.message || String(err) });
    }
  }
);

// Update a task
router.put(
  '/:id',
  [
    param('id').isInt().toInt(),
    body('title').optional().isString().trim().notEmpty(),
    body('description').optional().isString(),
    body('status').optional().isIn(STATUS_VALUES),
    body('due_date').optional().isISO8601(),
    body('user_id').optional().isInt().toInt(),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await taskService.updateTask(id, req.body);
      res.json(updated);
    } catch (err) {
      const status = err && err.status ? err.status : 500;
      res.status(status).json({ error: err.message || String(err) });
    }
  }
);

// Delete
router.delete('/:id', [param('id').isInt().toInt(), handleValidationErrors], async (req, res) => {
  try {
    const id = req.params.id;
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (err) {
    const status = err && err.status ? err.status : 500;
    res.status(status).json({ error: err.message || String(err) });
  }
});

// Get list (optionally filter by user_id)
router.get('/', [query('user_id').optional().isInt().toInt(), handleValidationErrors], async (req, res) => {
  try {
    const filter = {};
    if (req.query.user_id) filter.user_id = req.query.user_id;
    const rows = await taskService.listTasks(filter);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message || String(err) });
  }
});

// Get single
router.get('/:id', [param('id').isInt().toInt(), handleValidationErrors], async (req, res) => {
  try {
    const row = await taskService.getTask(req.params.id);
    res.json(row);
  } catch (err) {
    const status = err && err.status ? err.status : 500;
    res.status(status).json({ error: err.message || String(err) });
  }
});

module.exports = router;
