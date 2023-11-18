const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail");
const generateToken = require("../utils/generateToken");
const fs = require("fs/promises");
const path = require("path");

const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getToken();
  // Create cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "porduction") options.secure = true;

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user });
};

// @desc    Register a user
// @route   Post /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const { email, username, password, password2 } = req.body;

  // Check if that user already exists in the DB
  const userData = await User.findOne({ $or: [{ username }, { email }] });
  if (userData) throw new ErrorResponse(401, "User already exists");
  if (password !== password2)
    throw new ErrorResponse(403, "Password2 not matching");
  delete req.body.password2;
  if (req.file) req.body.image = `/images/${req.file.originalname}`;
  const user = await User.create(req.body);
  // send Email Verification
  let html = await fs.readFile(
    path.resolve(__dirname, "../utils/templates/VerifyEmail.html"),
    { encoding: "utf-8" },
  );
  html = html.replaceAll("{url}", `${req.protocol}://${req.get("host")}/api`);
  html = html.replaceAll("{userId}", user._id);
  html = html.replaceAll("{verifyCode}", generateToken(user.email));

  const options = {
    email: user.email,
    subject: "Welcome to our platform",
    html: html,
  };
  // Send verification email
  sendEmail(options);
  sendTokenResponse(user, 200, res);
};

// @desc    Login a user
// @route   Post /api/auth/login
// @access  Public
exports.login = async (req, res) => {

  const { username, email, password } = req.body;
  if ((!username || !email) && !password)
    throw new ErrorResponse(401, "Please Enter username/email and Password");
  // Find the user
  const user = await User.findOne({ $or: [{ username }, { email }] }).select(
    "+password",
  );
  if (!user) throw new ErrorResponse(401, "Wrong username/email or password");
  // Validate password
  const isMatch = await user.matchPassword(password);
  if (!isMatch)
    throw new ErrorResponse(401, "Wrong username/email or password");
  //  Check if the user is active
  if (!user.isActive) throw new ErrorResponse(401, "Account is inactive");
  sendTokenResponse(user, 200, res);
};
// @desc    Log user out and clear cookie
// @route   Post /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, data: {} });
};

// @desc    Get current logged in user
// @route   GET /api/auth/profile
// @access  Private
exports.profile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

// @url     GET auth/users/verify
// @desc    verify the user email
// @access  public
exports.verify = async (req, res) => {
  const { id: _id, verifyCode } = req.query;
  const user = await User.findOne({ _id });
  if (!user || verifyCode !== generateToken(user.email))
    throw new ErrorResponse(402, "User not found");

  await User.updateOne({ _id }, { emailVerified: true });
  let html = await fs.readFile(
    path.resolve(__dirname, "../utils/templates/verified.html"),
    { encoding: "utf-8" },
  );

  const options = {
    email: user.email,
    subject: "Email verified",
    html: html,
  };
  sendEmail(options);
  res.status(200).json({
    success: true,
    message: "Email Verified",
  });
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new ErrorResponse(404, "There is no user with that email");
  // Get reset token
  const resetToken = user.getRestPasswordToken();
  await user.save({ validateBeforeSave: false });
  // create a reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host",
  )}/api/auth/resetpassword/${resetToken}`;
  let html = await fs.readFile(
    path.resolve(__dirname, "../utils/templates/ResetEmail.html"),
    { encoding: "utf-8" },
  );
  html = html.replaceAll("{resetURL}", resetUrl);

  const options = {
    email: user.email,
    subject: "RESET EMAIL",
    html: html,
  };

  try {
    await sendEmail(options);
    res.status(200).json({ success: true, data: { message: "Email sent" } });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ErrorResponse(500, "Email could not be send");
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resetToken
// @access  Public
exports.reset = async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  // Find the user by the reset token
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) throw new ErrorResponse(400, "Invalid token");
  // Set new Password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendTokenResponse(user, 200, res);
};

// @desc    Update a user details
// @route   PUT /api/auth/update
// @access  Private
exports.update = async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
  };

  if (req.file) fieldsToUpdate.image = `/images/${req.file.originalname}`;

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
};
// @desc    Update a user password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");
  // check current password
  const currentPasswordMatch = await user.matchPassword(
    req.body.currentPassword,
  );
  // Throw error if not matched
  if (!currentPasswordMatch) throw new ErrorResponse(401, "Inccorect password");
  // update the passowrd with new password
  user.password = req.body.newPassword;
  // save the user
  await user.save();
  // send the token
  res.status(200).json({ success: true, data: user });
};
