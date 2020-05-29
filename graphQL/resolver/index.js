const userResolver = require("./user");
const postResolver = require("./post");
const likeCommentsResolver = require("./likeComments");

module.exports = {
  // modifi
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    },
  },
  // query data
  Query: {
    ...postResolver.Query,
    ...userResolver.Query,
  },
  // Add data
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...likeCommentsResolver.Mutation,
  },
};
