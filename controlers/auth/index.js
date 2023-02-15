const register = require("./register");
const login = require("./login");
const ctrlWrapper = require("./../../helpers/ctrlWrapper");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
