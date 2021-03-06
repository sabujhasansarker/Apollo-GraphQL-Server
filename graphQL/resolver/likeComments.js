// * validation
const { UserInputError, AuthenticationError } = require("apollo-server");

// * model
const Post = require("../../models/Post");

// * user
const auth = require("../../utils/auth");

// * Populete
const { singlePost } = require("../../utils/populeted");

module.exports = {
  Mutation: {
    async like(_, { postId }, context) {
      const user = auth(context);
      try {
        let post = await Post.findById(postId);

        if (post) {
          if (post.likes.find((like) => like == user.id)) {
            await Post.findByIdAndUpdate(
              postId,
              { $pull: { likes: user.id } },
              { new: true }
            );
            return singlePost(postId);
          } else {
            await Post.findByIdAndUpdate(
              postId,
              { $push: { likes: user.id } },
              { new: true }
            );
            return singlePost(postId);
          }
        }
      } catch (err) {
        throw new UserInputError("post", { errors: "Post dose not found" });
      }
    },
    async comment(_, { postId, body }, context) {
      let user = auth(context);
      try {
        let post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            user: user.id,
            date: new Date().toISOString(),
          });
          await post.save();
          return singlePost(postId);
        }
      } catch (err) {
        throw new UserInputError("post", { errors: "Post dose not found" });
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      let user = auth(context);
      try {
        let post = await Post.findById(postId);
        if (post) {
          if (post.comments.find((comment) => comment._id == commentId)) {
            if (
              post.comments.filter(
                (comment) => comment.username == user.username
              )
            ) {
              await Post.findByIdAndUpdate(
                postId,
                { $pull: { comments: { _id: commentId } } },
                { new: true }
              );
              return singlePost(postId);
            } else {
              return new Error("Action not allowed");
            }
          } else {
            return new Error("Comment dose not found");
          }
        }
      } catch (err) {
        throw new UserInputError("post", { errors: "Post dose not found" });
      }
    },
  },
};
