const bcrypt = require("bcrypt");
const { user } = require("../models");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 8);

  const regis = await user.create({
    firstName,
    lastName,
    username,
    email,
    password: hashPassword,
  });

  return res.status(201).send({
    message: "Create User Succes",
  });
};

const allUsers = async (req, res) => {
  try {
    const all = await user.findAll();

    return res.status(200).send({
      message: "All user data retrivied",
      data: all,
    });
  } catch (error) {
    return res.status(403).send({
      message: error,
    });
  }
};

const login = async (req, res) => {
  const data = req.userInfo;

  const token = jwt.sign(
    {
      id: data.id,
      username: data.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
  );

  return res.status(200).send({
    message: "login successed",
    data: token,
  });
};

const uploadprofile = async (req, res) => {
  try {
    const userData = req.user;
    const file = req.file;

    const updateProfilePic = await user.update(
      { picture: file.path },
      { where: { id: userData.id } },
    );

    return res.status(201).send({
      message: "upload successed",
    });
  } catch (error) {
    return res.status(403).send({
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const userData = req.user;
  const deleted = await user.destroy({
    where: { id: userData.id },
  });
  return res.status(201).send({
    message: "deleted user success",
  });
};
module.exports = { register, allUsers, login, uploadprofile, deleteUser };
