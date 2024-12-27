const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, '待办事项内容不能为空']
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema); 