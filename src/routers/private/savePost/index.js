import express from "express";
import { UpsertSavedPost, GetSavedPost } from "../../../controllers";

const router = express.Router();

router.post("/upsert_save_post", async (req, res, next) => {
  try {
    const data = await UpsertSavedPost(req.body);
    res.status(400).send({ type: "success", data });
  } catch (err) {
    next({
      code: 500,
      message: err,
    });
  }
});

router.post("/get_saved_post", async (req, res, next) => {
  try {
    const data = await GetSavedPost(req.body);
    res.status(400).send({ type: "success", data });
  } catch (err) {
    next({
      code: 500,
      message: err,
    });
  }
});

module.exports = router;
