import { createReply, getReply } from "../../../controllers";
import express from "express";

const router = express.Router();

router.post("/create_reply", async (req, res, next) => {
  try {
    const data = await createReply(req.body);
    res.status(400).send({ type: "sucess", data });
  } catch (err) {
    console.log(err);
    next({
      code: 500,
      message: err,
    });
  }
});

router.post("/get_reply", async (req, res, next) => {
  try {
    const data = await getReply(req.body);
    res.status(400).send({ type: "sucess", ...data });
  } catch (err) {
    next({
      code: 500,
      message: err,
    });
  }
});
module.exports = router;
