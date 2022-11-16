import express from "express";
import { CreateCommand, GetCommand } from "../../../controllers";
const router = express.Router();

router.post("/upsert_command", async (req, res, next) => {
  try {
    const data = await CreateCommand(req?.body);
    res.status(200).send({ type: "success", data: data });
  } catch (err) {
    console.log(err.message);
    next({
      code: 500,
      message: err,
    });
  }
});

router.post("/get_command", async (req, res, next) => {
  try {
    const data = await GetCommand(req.body);
    res.status(200).send({ type: "sucess", ...data });
  } catch (err) {
    next({
      code: 500,
      message: err.message,
    });
  }
});
module.exports = router;
