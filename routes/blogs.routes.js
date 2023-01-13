const router = require("express").Router();
const blogController = require("../controllers/blogs.controller");

router.get("/", blogController.blog_index);
router.get("/create", blogController.blog_create_get);
router.get("/:id");
router.delete("/:id");
router.post("/", blogController.blog_create_post);

module.exports = router;
