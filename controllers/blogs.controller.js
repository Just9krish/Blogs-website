const Blog = require("../models/blog.model");
const Path = require("path");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
};

const blog_create_get = (req, res) => {
  console.log("creatte");
  res.render("createblog", { title: "Create Blog", blog: new Blog() });
};

// post blog or save the article
const createAndUpdateBlog = async (req, res) => {
  const path = req.file.path.replace(/^public\\/, "");

  let blog = req.blog;

  blog.title = req.body.title;
  blog.markdown = req.body.markdown;
  blog.cover = `http:\\\\${Path.normalize(`${req.hostname}:3000\\${path}`)}`;

  try {
    blog = await blog.save();
    res.redirect("/blogs");
  } catch (error) {
    res.render("createblog", { title: "Create Blog", blog: blog });
  }
};

// create a blog
const blog_create_post = async (req, res, next) => {
  req.blog = new Blog();
  next();
};

// update a blog
const blog_update_post = async (req, res, next) => {
  const id = req.params.id;
  req.blog = await Blog.findById(id);
  next();
};

// single blog
const blog_details = async (req, res) => {
  const slug = req.params.slug;

  try {
    console.log("Ddd");
    const blog = await Blog.findOne({ slug: slug }); // find return array so use findOne
    res.render("blog", { blog: blog, title: "Blog Details" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete blog
const blog_delete = async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findByIdAndDelete(id);
  res.redirect("/blogs");
};

// Edit blog
const blog_edit = async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);
  res.status(200).render("editblog", { blog: blog, title: "Edit blog" });
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
  blog_details,
  blog_delete,
  blog_edit,
  blog_update_post,
  createAndUpdateBlog,
};
