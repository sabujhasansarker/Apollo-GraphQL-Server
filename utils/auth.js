const { AuthenticationError } = require("apollo-server");

// * token
const jwt = require("jsonwebtoken");
const jsonToken = require("config").get("jsonToken");

module.exports = (context) => {
  const token = context.req.headers.auth;
  if (token) {
    try {
      const decoded = jwt.verify(token, jsonToken);
      return decoded.user;
    } catch (err) {
      throw new AuthenticationError("Invalid/Expired token");
    }
  } else {
    throw new AuthenticationError("Authentication headre must be provided");
  }
};
