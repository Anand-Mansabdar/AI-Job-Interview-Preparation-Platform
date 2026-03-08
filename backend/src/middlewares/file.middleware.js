// A middleware that is used for uploading resume(pdf)

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB is the maximum size
  },
});

module.exports = upload;
