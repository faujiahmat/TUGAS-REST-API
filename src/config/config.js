const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  development: {
    username: process.env.DATABASES_USER,
    password: process.env.DATABASES_PASSWORD,
    database: process.env.DATABASES_NAME2,
    host: process.env.DATABASES_HOST,
    port: process.env.DATABASES_PORT,
    dialect: "mysql",
  },
  // test: {
  //   username: "root",
  //   password: null,
  //   database: "database_test",
  //   host: "127.0.0.1",
  //   dialect: "mysql",
  // },
  // production: {
  //   username: "root",
  //   password: null,
  //   database: "database_production",
  //   host: "127.0.0.1",
  //   dialect: "mysql",
  // },
};
