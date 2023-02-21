const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const { HttpError } = require("../../helpers");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  const isPassValid = bcrypt.compareSync(password, user.password);

  if (!isPassValid) {
    throw HttpError(400, "Invalid password");
  }
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "23h" });

  res.status(200).json({
    token,
    id: user.id,
    name: user.name,
    email: user.email,
  });
};

module.exports = login;
