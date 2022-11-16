const dotenv = require("dotenv");

dotenv.config();

let config = {};
config.jwt_key = `${process.env.JWT_SECRET}`;

export { config };
