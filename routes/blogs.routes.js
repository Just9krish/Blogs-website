const router = require("express").Router();
const blogController = require("../controllers/blogs.controller");
const upload = require("../controllers/uploadImage");
const { verifyToken } = require("../controllers/adminAuth");

router.get("/", blogController.blog_index);
router.get("/create", blogController.blog_create_get);
router.get("/:slug", blogController.blog_details);
router.get("/edit/:id", blogController.blog_edit);
router.delete("/:id", blogController.blog_delete);
router.post(
  "/",
  upload.single("cover"),
  blogController.blog_create_post,
  blogController.createAndUpdateBlog
);
router.put(
  "/:id",
  upload.single("cover"),
  blogController.blog_update_post,
  blogController.createAndUpdateBlog
);

module.exports = router;
