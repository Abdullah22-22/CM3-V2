const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//POST//api/login
const loginUser = async (req, res) => {

  const { username, password } = req.body;
  const user = await User.findOne({username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
}


//POST//api/register
const registerUser = async (req, res) => {
 try {
    const {
      name,
      username,
      password,
      phone_number,
      licenseNumber,
      date_of_birth,
      address,
    } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = new User({
      name,
      username,
      password,
    phone_number,
    licenseNumber,
    date_of_birth,
    address,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  }
    catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
