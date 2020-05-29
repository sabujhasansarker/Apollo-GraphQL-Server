const userResolver = require("./user");
const postResolver = require("./post");

module.exports = {
  // query data
  Query: {
    ...postResolver.Query,
    ...userResolver.Query,
  },
  // Add data
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
  },
};
