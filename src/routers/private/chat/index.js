import express from "express";
import { CreateChat } from "../../../controllers";
const router = express.Router();

router.post("/upsert_chat", async (req, res, next) => {
  try {
    const data = await CreateChat(req?.body);
    res.status(200).send({ type: "success", data: data });
  } catch (err) {
    console.log(err.message);
    next({
      code: 500,
      message: err,
    });
  }
});
module.exports = router;
