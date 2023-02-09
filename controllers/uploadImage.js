const multer = require("multer");

const destinationPath = "public/cover";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|avif)$/)) {
    console.log("dsds");
    return cb(new Error("You can only upload images files."), false);
  }

  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

module.exports = upload;
