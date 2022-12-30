const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Blog = require("./models/blog.model");

// database url
const dbUrl = "mongodb://127.0.0.1:27017/just9krish";

// setting ejs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting ejs as template engine
app.set("view engine", "ejs");

// connecting database
mongoose.set("strictQuery", false);
mongoose
    .connect(dbUrl)
    .then(() => app.listen(3000)) // activate server when connection with db is succesfull
    .catch((err) => console.log(err));

// setting the public access to public folder
app.use(express.static("public"));

// setting multer for uploading files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const upload = multer({ storage: storage });

// rendering the home page
app.get("/", (req, res) => {
    res.render("home.ejs", { title: "Home" });
});

// rendering blogs page
app.get("/blogs", (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("blogs", { title: "All Blogs", blogs: result });
        })
        .catch((err) => console.log(err));
});

// posting blog
app.post("/blogs", upload.single("image"), (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        blog: req.body.blog,
        img: {
            data: req.file.fieldname,
            contentType: "image/png",
        },
    });

    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        })
        .catch((err) => console.log(err));
});

// rendering blog creating page
app.get("/blogs/create", (req, res) =>
    res.render("createblog", { title: "Create Blog" })
);

// rendering about page
app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});
