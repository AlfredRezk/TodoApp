const Category = require("../models/Category");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Admin
exports.list = async (req, res) => {
  res.status(200).json({ success: true, data: res.results });
};

// @desc    Get Single category
// @route   GET /api/categories:id
// @access  Admin
exports.read = async (req, res) => {
  const data = await Category.findById(req.params.id);
  res.status(200).json({ success: true, data });
};

// @desc    Create a category
// @route   GET /api/categories/:id
// @access  Admin
exports.create = async (req, res) => {
  req.body.userId= req.user._id
  console.log(req.body)
  const data = await Category.create(req.body);
  res.status(201).json({ success: true, data });
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Admin
exports.update = async (req, res) => {
  const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data });
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Admin
exports.delete = async (req, res) => {
  const data = await Category.findById(req.params.id);
  await data.deleteOne();
  res.status(200).json({ success: true, data: {} });
};
