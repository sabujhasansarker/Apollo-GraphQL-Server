// jsnon web token
const jwt = require("jsonwebtoken");
const jsonToken = require("config").get("jsonToken");

// Password
const bcrypt = require("bcryptjs");

// Validation
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  loginValidation,
} = require("../../utils/validator");

// Model
const User = require("../../models/User");
const Post = require("../../models/Post");

module.exports = {
  Query: {
    async getUser(_, { username }) {
      const user = await User.findOne({ username });
      const posts = await Post.find({ _id: { $in: user.posts } });
      return {
        ...user._doc,
        posts,
      };
    },
  },
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // * Validation Chack
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errrors", { errors });
      }

      // * Match user
      const user = await User.findOne({ username });

      if (!user) {
        // * User Register
        const newUser = new User({
          username,
          email,
          password: bcrypt.hashSync(password, 10),
          date: new Date().toISOString(),
        });
        await newUser.save();

        // * token signin
        const token = jwt.sign(
          { user: { id: newUser._id, username: newUser.username } },
          jsonToken,
          { expiresIn: "1h" }
        );
        return {
          ...newUser._doc,
          id: newUser._id,
          token,
        };
      } else {
        throw new UserInputError("Username is teken", {
          errors: {
            username: "this username is taken",
          },
        });
      }
    },
    async login(_, { username, password }) {
      // * validation chack
      const { valid, errors } = loginValidation(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // * user chack
      const user = await User.findOne({ username });
      // * user not found
      if (!user) {
        throw new UserInputError("user not found", {
          errors: {
            username: "User not found",
          },
        });
      }

      // * user found
      const matchPassword = bcrypt.compareSync(password, user.password);
      if (matchPassword) {
        // * token signin
        const token = jwt.sign(
          { user: { id: user._id, username: user.username } },
          jsonToken,
          { expiresIn: "1h" }
        );
        return {
          ...user._doc,
          id: user._id,
          token,
        };
      } else {
        throw new UserInputError("Password dose't match", {
          errors: { password: "Password dose't match" },
        });
      }
    },
  },
};
