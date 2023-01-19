require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverriden = require("method-override");
const blogRouter = require("./routes/blogs.routes");
const Blog = require("./models/blog.model");

const app = express();

// telling app to use method override to delete blog wihtout heking of code in front end
app.use(methodOverriden("_method"));

// database url
const dbUrl = process.env.MONGODBURL;
const port = process.env.PORT;

// setting ejs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting ejs as template engine
app.set("view engine", "ejs");

// connecting database
mongoose.set("strictQuery", false);
mongoose
  .connect(dbUrl)
  .then(() => app.listen(port, () => console.log("connected to " + port))) // activate server when connection with db is succesfull
  .catch((err) => console.log(err));

// setting the public access to public folder
app.use(express.static("public"));

// rendering the home page
app.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("home.ejs", { title: "Home", blogs: blogs.slice(0, 10) });
});

app.use("/blogs", blogRouter);

// rendering about page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
