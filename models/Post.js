const { Schema, model } = require("mongoose");

const postSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  username: String,
  body: String,
  date: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      body: String,
      user: { type: Schema.Types.ObjectId, ref: "User" },
      date: String,
    },
  ],
});

module.exports = model("Post", postSchema);
