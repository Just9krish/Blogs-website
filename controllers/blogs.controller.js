const Blog = require("../models/blog.model");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
};

const blog_create_get = (req, res) => {
  res.render("createblog", { title: "Create Blog" });
};

// post blog
const blog_create_post = (req, res) => {
  console.log(req.body.title);
  const blog = new Blog({
    title: req.body.title,
    blog: req.body.blog,
  });

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
};
