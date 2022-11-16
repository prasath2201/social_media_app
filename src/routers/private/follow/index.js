import express from "express";
import { UpsertFollow } from "../../../controllers";
const router = express.Router();
// create follow
router.post("/upsert_following", async (req, res, next) => {
  try {
    const data = await UpsertFollow(req?.body);
    res.status(200).send({ type: "success", data });
  } catch (err) {
    console.log(err);
    next({
      code: 500,
      message: err,
    });
  }
});
module.exports = router;
