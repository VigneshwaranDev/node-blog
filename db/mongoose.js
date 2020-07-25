const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/blog";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
