const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {generateToken} = require("../helpers/tokens");
const {sendVerificationEmail} = require("../helpers/mailer");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    // Check if the email already exists
    const check = await User.findOne({email});
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists, try with a different email address",
      });
    }

    // Validate first name length
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "First name must be between 3 and 30 characters.",
      });
    }

    // Validate last name length
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Last name must be between 3 and 30 characters.",
      });
    }

    // Validate password length
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    // Hash the password
    const cryptedPassword = await bcrypt.hash(password, 12);

    // Generate a temporary username and validate it
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    // Create a new user and save it to the database
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken(
      {id: user._id.toString()},
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({id: user._id.toString()}, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success! Please activate your email to start",
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const {token} = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res.status(400).json({
        message: "Your account has already been activated",
      });
    } else {
      await User.findByIdAndUpdate(user.id, {verified: true});
      return res.status(200).json({
        message: "Your account has been activated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }
    // Check if the email exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        message: "This email address is not registered",
      });
    }
    // Check if the password is correct
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
    // Generate a token and send it to the client
    const token = generateToken({id: user._id.toString()}, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Login Success!",
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
