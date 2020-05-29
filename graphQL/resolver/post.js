const Post = require("../../models/Post");
const User = require("../../models/User");

// * user
const auth = require("../../utils/auth");

// * Populete
const { allPosts, singlePost } = require("../../utils/populeted");

// * Validation
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Mutation: {
    async createPost(_, { body }, context) {
      //  Chack Error
      if (!body) {
        throw new Error("Post body must not be empty");
      }
      // user chack
      let user = auth(context);
      // create new post
      const newPost = new Post({
        body,
        username: user.username,
        user: user.id,
        date: new Date().toISOString(),
      });
      // update user
      await User.findOneAndUpdate(
        { username: user.username },
        { $push: { posts: newPost._id } },
        { new: true }
      );
      // save new post
      await newPost.save();
      return singlePost(newPost.id);
    },
    async updatePost(_, { postId, body }, context) {
      // auth chack
      auth(context);
      // body chack
      if (body.trim() == "") {
        throw new UserInputError("Body not be empty", {
          errors: "Body not be empty",
        });
      }
      try {
        // post update
        const post = await Post.findById(postId);
        if (post) {
          await Post.findByIdAndUpdate(
            postId,
            { $set: { body } },
            { new: true }
          );
          // return
          return singlePost(postId);
        }
      } catch (err) {
        throw new UserInputError("post", { errors: "Post dose not found" });
      }
    },
    async deletePost(_, { postId }, context) {
      let user = auth(context);
      try {
        const post = await Post.findById(postId);

        // if post not found
        if (!post) {
          throw new UserInputError("post", { errors: "Post dose not found" });
        }

        // user chack
        if (user.username === post.username) {
          // delete post
          await Post.findByIdAndRemove(postId);

          // update user
          user = await User.findByIdAndUpdate(
            user.id,
            { $pull: { posts: postId } },
            { new: true }
          );
          return "Post deleted";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new UserInputError("post", { errors: "Post dose not found" });
      }
    },
  },
  Query: {
    getPosts() {
      return allPosts();
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) return singlePost(postId);
      } catch (err) {
        throw new UserInputError("post", { errors: "Post dose not found" });
      }
    },
  },
};
