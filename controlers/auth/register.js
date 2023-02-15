// const { validateResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { HttpError } = require("../../helpers");
const User = require("../../models/user");

const register = async (req, res) => {
  // const errors = validateResult(req);
  // if (!errors.isEmpty()) {
  //   throw HttpError(400, ""Uncorrect request"");
  //   return res.status(400).json({ message: "Uncorrect request", errors });
  // }

  const { email, password } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw HttpError(400, `USer with emai ${email} alredy have in database`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashPassword });
  await user.save();
  return res.json({ message: `User was created` });
};

module.exports = register;
