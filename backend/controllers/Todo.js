const Todo = require("../models/Todo");
const ErrorResponse = require('../utils/ErrorResponse')

// @desc    Get all Todos
// @route   GET /api/todos
// @access  Public
exports.list = async (req, res) => {
  res
    .status(200)
    .json({ success: true, data: res.results })

};

// @desc    Get Single Todo
// @route   GET /api/todos/:id
// @access  Private
exports.read = async (req, res) => {
  const data = await Todo.findById(req.params.id).populate("userId categoryId");
  res.status(200).json({ success: true, data });
};

// @desc    Create a Todo
// @route   GET /api/todos/:id
// @access  Private
exports.create = async (req, res) => {
  req.userId = req.user._id;
  const data = await Todo.create(req.body);
  res.status(201).json({ success: true, data });
};

// @desc    Update a Todo
// @route   PUT /api/todos/:id
// @access  Admin/Private
exports.update = async (req, res) => {
  const todo = await Todo.findOne({_id:req.params.id}) 

  if (todo.userId.toString() !== req.user._id.toString() || req.user.role !== "admin")
    throw new ErrorResponse(404, "Not Authorized");
  const data = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(202).json({ success: true, data });
};

// @desc    Delete a Todo
// @route   DELETE /api/todos/:id
// @access  Admin
exports.delete = async (req, res) => {

  const todo = await Todo.findOne({_id:req.params.id}) 

  if (todo.userId.toString() !== req.user._id.toString() || req.user.role !== "admin")
    throw new ErrorResponse(404, "Not Authorized");
  const user = await Todo.findById(req.params.id);
  await user.deleteOne();
  res.status(200).json({ success: true, data: {} });
};
