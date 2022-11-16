import express from "express";
import { CreatePost, GetPost, GetPostAll } from "../../../controllers";

const router = express.Router();
// create post
router.post("/upsert_post", async (req, res, next) => {
  try {
    await CreatePost(req?.body);
    res.status(200).send({ type: "success" });
  } catch (err) {
    console.log(err);
    next({
      code: 500,
      message: err,
    });
  }
});

// get post by createdby
router.post("/get_post_for_user", async (req, res, next) => {
  try {
    const data = await GetPost({ id: req?.body?.user_profile_id });
    res.status(200).send({ type: "success", data: data });
  } catch (err) {
    console.log(err);
    next({
      code: 500,
      message: err,
    });
  }
});

// get post by createdby
router.post("/get_post", async (req, res, next) => {
  try {
    const data = await GetPostAll({ id: req?.body?.user_profile_id });
    res.status(200).send({ type: "success", data: data });
  } catch (err) {
    console.log(err);
    next({
      code: 500,
      message: err,
    });
  }
});

module.exports = router;
