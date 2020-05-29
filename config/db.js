const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  try {
    mongoose.connect(config.get("mongoUri"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mogodb connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
