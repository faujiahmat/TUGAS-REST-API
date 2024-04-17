const validator = require("validator");
const { user } = require("../models");
const bcrypt = require("bcrypt");

const regisValidator = async (req, res, next) => {
  const { firstName, username, email, password } = req.body;

  if (!firstName || !username || !email || !password) {
    return res.status(400).send({
      message: "Register Failed, This field cannot be empty",
    });
  }

  const isValidEmail = validator.isEmail(email, {
    host_whitelist: ["gmail.com"],
  });

  if (!isValidEmail) {
    return res.status(400).send({
      message: "invalid email, use only google mail",
    });
  }

  const isValidPassword = validator.isStrongPassword(password);

  if (!isValidPassword) {
    return res.status(400).send({
      message:
        "Password not strong enough, password must be 8 character, include uppercase, lowercase, number and symbol",
    });
  }

  next();
};

const loginValidator = async (req, res, next) => {
  const { username, password } = req.body;
  const getUser = await user.findOne({ where: { username } });
  if (!getUser) {
    return res.status(400).send({
      message: "Error, user not found",
    });
  }

  const dataUser = getUser.dataValues;

  const comparedPassword = bcrypt.compareSync(password, dataUser.password);
  if (!comparedPassword) {
    return res.status(400).send({
      message: "Error, incorrect password",
    });
  }

  req.userInfo = dataUser;

  next();
};

module.exports = { regisValidator, loginValidator };
