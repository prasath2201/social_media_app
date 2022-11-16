import express from "express";
// controllers
import { UserProfile, CreateProfile } from "../../../controllers";
import { v4 as uuidv4 } from "uuid";

// extensions
const bcryptjs = require("bcryptjs");
const router = express.Router();

// login
router.post("/login", async (req, res, next) => {
  try {
    const details = await UserProfile(req?.body);
    res.status(200).send({ type: "success", token: details });
  } catch (err) {
    console.log(err);
    next({
      code: 500,
      message: err,
    });
  }
});

// user creattion
router.post("/create_user", async (req, res, next) => {
  try {
    // hash the password
    var hash = await bcryptjs.hash(req.body.password, 10);
    const value = {
      id: uuidv4(),
      Name: req?.body?.name,
      password: hash,
      email_id: req?.body?.email_id,
    };
    const data = await CreateProfile(value);
    res.status(200).send({ type: "success", data });
  } catch (err) {
    console.log(err);
    next({
      code: 500,
      message: err.message,
    });
  }
});

module.exports = router;
