const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  try {
    mongoose.connect(config.get("mongoUri"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("mogodb connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
