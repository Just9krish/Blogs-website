const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        blog: {
            type: String,
            required: true,
        },
        img: {
            data: Buffer,
            contentType: String,
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;
