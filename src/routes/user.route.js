const express = require("express");

const {
  register,
  allUsers,
  login,
  uploadprofile,
  deleteUser,
} = require("../controllers/user.controller");
const { verify } = require("../middlewares/verifytoken");
const { regisValidator, loginValidator } = require("../middlewares/validator");
const { uploadProfile } = require("../middlewares/upload");

const router = express.Router();

router.post("/register", regisValidator, register);
router.get("/all", verify, allUsers);
router.post("/login", loginValidator, login);
router.post(
  "/uploadProfilePic",
  verify,
  uploadProfile.single("profile"),
  uploadprofile,
);
router.delete("/deleteUser", verify, deleteUser);

module.exports = router;
