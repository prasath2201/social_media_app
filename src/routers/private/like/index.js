import express from "express";
import { UpsertLike } from "../../../controllers";

const router = express.Router();

// upsert like
router.post("/upsert_like", async (req, res, next) => {
  try {
    const data = await UpsertLike(req.body);
    res.status(200).send({ type: "sucess", data });
  } catch (err) {
    console.log(err);
    next({
      code: 400,
      message: err,
    });
  }
});

module.exports = router;
