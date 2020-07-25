const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/new", (req, res) => {
  res.render("new-blog", { blog: new Blog(), title: "New Blog" });
});

router.get("/edit/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("edit-blog", { blog: blog, title: "Edit Blog" });
});

router.get("/show/:id", async (req, res) => {
  const blog = await Blog.findById({ _id: req.params.id });
  res.render("blog", { blog, title: blog.title });
});

router.post(
  "/",
  async (req, res, next) => {
    req.blog = new Blog();
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.blog = await Blog.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let blog = req.blog;
    blog.title = req.body.title;
    blog.short_desc = req.body.short_desc;
    blog.description = req.body.description;
    try {
      blog = await blog.save();
      res.redirect("/");
    } catch (e) {
      res.render(`blog/${path}`, { blog });
    }
  };
}

module.exports = router;
