const User = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.js");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: "Email already in use" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });
  const token = generateToken({ id: user._id, email: user.email });

  res.status(201).json({ user: { name: user.name, email: user.email }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken({ id: user._id, email: user.email });

  res.status(200).json({ user: { name: user.name, email: user.email }, token });
};

module.exports = { register, login };
