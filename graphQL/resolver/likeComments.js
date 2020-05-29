// * validation
const { UserInputError } = require("apollo-server");

// * model
const Post = require("../../models/Post");

// * user
const auth = require("../../utils/auth");

// * Populete
const { allPosts, singlePost } = require("../../utils/populeted");

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
  },
};
