const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  password: String,
  email: {
    type: String,
    trim: true,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  date: String,
});

module.exports = model("User", userSchema);
