const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    diskSpace: {
      type: Number,
      default: 1024 ** 3 * 10,
    },
    usedSpace: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
    },
    files: [
      {
        type: Object,
        ref: "File",
      },
    ],
  },
});
const User = model("user", userSchema);

module.exports = User;
