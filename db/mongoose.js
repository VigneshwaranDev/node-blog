const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
