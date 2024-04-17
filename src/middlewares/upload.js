const multer = require("multer");

const uploadProfileDir = `${process.cwd()}/upload`;

const uploadProfile = multer({ dest: uploadProfileDir });

module.exports = { uploadProfile };
