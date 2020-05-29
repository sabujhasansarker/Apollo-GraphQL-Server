const { gql } = require("apollo-server");

module.exports = gql`
  # Model like Schema
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    date: String!
    posts: [Post]
  }
  type Post {
    id: ID!
    body: String!
    username: String!
    date: String!
    user: User!
    likes: [User]
    likeCount: Int!
    comments: [Comment]
    commentCount: Int!
  }
  type Comment {
    id: ID!
    date: String!
    user: User
    body: String!
  }
  # Input data
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  # Query
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUser(username: String!): User
  }

  # Add data like update and input
  type Mutation {
    # User
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!

    # Post
    createPost(body: String!): Post!
    updatePost(postId: ID!, body: String!): Post!
    deletePost(postId: ID!): String!
    like(postId: ID!): Post!
    comment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
`;
