// Database
const db = require("./config/db");
db();

// GraphQL Server
const { ApolloServer } = require("apollo-server");

// Type defs
const typeDefs = require("./graphQL/typeDefs");

// Resolvers
const resolvers = require("./graphQL/resolver");

// Server connection
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then((res) => console.log(`Server runing at ${res.url}`));
