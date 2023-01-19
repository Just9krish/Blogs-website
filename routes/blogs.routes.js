const router = require("express").Router();
const blogController = require("../controllers/blogs.controller");

router.get("/", blogController.blog_index);
router.get("/create", blogController.blog_create_get);
router.get("/edit/:id", blogController.blog_edit);
router.get("/:slug", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);
router.post("/", blogController.blog_create_post);

module.exports = router;
