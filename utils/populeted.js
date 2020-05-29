const Post = require("../models/Post");

exports.allPosts = () => {
  return Post.find()
    .populate({
      path: "user",
      select: ["username", "email", "id", "posts", "date"],
      model: "User",
      populate: [
        {
          path: "posts",
          select: ["body", "id", "date", "username"],
          model: "Post",
        },
      ],
    })
    .populate("likes")
    .populate({
      path: "comments",
      populate: { path: "user" },
    });
};

exports.singlePost = (postId) => {
  return Post.findById(postId)
    .populate({
      path: "user",
      select: ["username", "email", "id", "posts", "date"],
      model: "User",
      populate: [
        {
          path: "posts",
          select: ["body", "id", "date", "username"],
          model: "Post",
        },
      ],
    })
    .populate("likes")
    .populate({
      path: "comments",
      populate: { path: "user" },
    });
};
