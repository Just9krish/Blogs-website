const Admin = require("../models/admin.blog");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.SECRET;
const expireTime = process.env.EXPIRESIN;

const adminAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: admin._id }, secret, {
      expiresIn: expireTime,
    });

    // res.status(200).json({ success: true, jwt: token });

    res.render("dashboard", { title: "Dashboard", jwt: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin adready in use" });
    }

    const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: admin._id }, secret, {
      expiresIn: expireTime,
    });

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  adminAuth,
  createAdmin,
};
