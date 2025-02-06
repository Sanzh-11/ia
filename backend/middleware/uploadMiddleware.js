const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Export fields configuration for multiple files
module.exports = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "material", maxCount: 1 },
]);
