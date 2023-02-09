const { adminAuth, createAdmin } = require("../controllers/adminAuth");
const router = require("express").Router();

router.post("/login", adminAuth);
router.post("/signup", createAdmin);

module.exports = router;
