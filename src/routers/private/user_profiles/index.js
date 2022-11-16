import express from "express";
import {
  getDownloadURL,
  ref,
  storage,
  uploadBytesResumable,
} from "../../../firebase";
// controllers
import { GetUserProfile, CreateUserProfile } from "../../../controllers";

const router = express.Router();

// get profile
router.post("/get_user_profile", async (req, res, next) => {
  try {
    const details = await GetUserProfile(req?.body);
    res.status(200).send({ type: "success", data: details });
  } catch (err) {
    console.log(err);
    next({
      code: 500,
      message: err,
    });
  }
});

// profile creattion
router.post("/upsert_user_profile", async (req, res, next) => {
  try {
    // const newName = uuidv4() + "-" + req.files?.logo?.name;
    // const storageRef = ref(storage, `files/${newName}`);
    // const uploadFile = uploadBytesResumable(storageRef, req.files?.logo);
    // await uploadFile.on("state_changed", () => {
    //   getDownloadURL(uploadFile.snapshot.ref)
    //     .then((url) => {
    //       return console.log(url, "profile_url");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });
    const data = await CreateUserProfile(req?.body);
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
