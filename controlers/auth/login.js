const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const { HttpError } = require("../../helpers");

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
  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      diskSpace: user.diskSpace,
      userSpace: user.userSpace,
      avatar: user.avatar,
    },
  });
};

module.exports = login;
