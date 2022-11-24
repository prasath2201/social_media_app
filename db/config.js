const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  production: {
    username: "postgres",
    password: "TczqWBKwKgf#427",
    database: "postgres",
    host: "db.wneplftbgkqowgrmcuyk.supabase.co",
    dialect: "postgres",
    port: "5432",
  },
  staging: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
