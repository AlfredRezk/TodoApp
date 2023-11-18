const User = require('../models/User')

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
exports.list = async(req, res)=>{
    res.status(200).json({success:true, data:res.results});
}


// @desc    Get Single user
// @route   GET /api/users/:id
// @access  Admin
exports.read = async(req, res)=>{
    const user = await User.findById(req.params.id)
    res.status(200).json({success:true, data:user});
}


// @desc    Create a User
// @route   GET /api/users/:id
// @access  Admin
exports.create = async(req, res)=>{
    if(req.file) req.body.image = `/images/${req.file.originalname}`;
    const user = await User.create(req.body)
    res.status(201).json({success:true, data:user});
}

// @desc    Update a User
// @route   PUT /api/users/:id
// @access  Admin
exports.update= async (req, res) => {
    if(req.file) req.body.image = `/images/${req.file.originalname}`;

    const user = await User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new:true, runValidators:true}
    )
    res.status(200).json({success:true, data:user});
}

// @desc    Delete a User
// @route   DELETE /api/users/:id
// @access  Admin
exports.delete= async (req, res) => {
    const user = await User.findById(req.params.id);
    await user.deleteOne()
    res.status(200).json({success:true, data:{}});
}




