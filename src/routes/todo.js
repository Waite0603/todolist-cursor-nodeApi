const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// 获取所有待办事项
router.get('/get-todo', async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 添加新的待办事项
router.post('/add-todo', async (req, res) => {
  try {
    const { value, isCompleted = false } = req.body;
    if (!value) {
      return res.status(400).json({ message: '待办事项内容不能为空' });
    }
    
    const todo = await Todo.create({ value, isCompleted });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新待办事项状态
router.post('/update-todo/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: '待办事项不存在' });
    }
    
    todo.isCompleted = !todo.isCompleted;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 删除待办事项
router.post('/del-todo/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: '待办事项不存在' });
    }
    
    await todo.remove();
    res.json({ message: '待办事项已删除' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 