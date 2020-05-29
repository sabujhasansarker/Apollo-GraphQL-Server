const { Schema, model } = require("mongoose");

const postSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  username: String,
  body: String,
  date: String,
  likes: [{ username: String }],
  comments: [
    {
      body: String,
      username: String,
      date: String,
    },
  ],
});

module.exports = model("Post", postSchema);
