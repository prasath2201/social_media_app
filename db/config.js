const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  production: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: process.env.PORT,
  },
  development: {
    username: "postgres",
    password: "root",
    database: "postgres",
    host: "localhost",
    dialect: "postgres",
    port: "5432",
  },
};
