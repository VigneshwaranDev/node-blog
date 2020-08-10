require("./db/mongoose");
const Blog = require("./models/blog");
const router = require("./routes/router");
const express = require("express");
const ejs = require("ejs");
const methodOverride = require("method-override");

const port = process.env.PORT | 3000;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const blog = await Blog.find().sort({ createdAt: "desc" });
  res.render("index", { blogs: blog, title: "Vigneshwaran's Blog" });
});

app.use("/blog", router);

app.listen(port, () => {
  console.log(`Sever up and running on port ${port}`);
});
