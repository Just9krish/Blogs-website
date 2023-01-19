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
  res.render("createblog", { title: "Create Blog", blog: new Blog() });
};

// post blog
const blog_create_post = async (req, res) => {
  let blog = new Blog(req.body);

  try {
    blog = await blog.save();
    res.redirect("/blogs");
  } catch (error) {
    console.log(error);
    res.render("createblog", { title: "Create Blog", blog: blog });
  }
};

// single blog
const blog_details = async (req, res) => {
  const slug = req.params.slug;

  try {
    const blog = await Blog.findOne({ slug: slug }); // find return array so use findOne
    res.render("blog", { blog: blog, title: "Blog Details" });
  } catch (error) {
    console.log(error);
  }
};

// delete blog
const blog_delete = async (req, res) => {
  const id = req.body.id;

  const blog = await Blog.findByIdAndDelete(id);
  res.redirect("/blogs");
};

// Edit blog
const blog_edit = async (req, res) => {
  const id = req.params.id;

  console.log(id);
  const blog = await Blog.findById(id);
  console.log(blog);
  res.render("editblog", { blog: blog, title: "Edit blog" });
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
  blog_details,
  blog_delete,
  blog_edit,
};
