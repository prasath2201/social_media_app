const jwt = require("jsonwebtoken");
import { config as configure } from "../config";

export const encode = (payload, expiry_time) => {
  let config = {};
  if (expiry_time) {
    config["expiresIn"] = expiry_time;
  }

  return jwt.sign(payload, configure.jwt_key, config);
};

export const decode = (token) => {
  return jwt.decode(token, configure.jwt_key);
};

export const verify = (token) => {
  return new Promise((resolve, reject) => {
    try {
      let payload = jwt.verify(token, configure.jwt_key);
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
};
