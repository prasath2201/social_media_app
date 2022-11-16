import Modle from "../../../models";
import { v4 as uuidv4 } from "uuid";
import { encode } from "../../../utils";

const bcryptjs = require("bcryptjs");

// get users
export const UserProfile = ({ email_id, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      var user_details = await Modle.UserProfile.findOne({
        where: { email_id: email_id },
      });
      if (!user_details) {
        return resolve({ type: "Error", message: "Email is not exists" });
      }
      var pass = await bcryptjs.compare(password, user_details.password);
      if (!pass) {
        return resolve({ type: "Error", message: "Wrong Password" });
      }

      var details = await Modle.profile.findOne({
        where: { user_profile_id: user_details?.id },
        attributes: ["id"],
      });
      let is_profile = "";
      if (details) {
        is_profile = true;
      } else {
        is_profile = false;
      }
      // token
      var userToken = encode({ id: user_details.id });
      resolve({ token: userToken, is_profile });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// profile creation
export const CreateProfile = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Modle.UserProfile.create(payload);
      resolve("User Created Successfully");
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// get user profile details
export const GetUserProfile = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const details = await Modle.profile.findOne({
        where: { id },
        attributes: [
          "profile_image",
          "mobile_no",
          "mobile_coutry_no",
          "country",
          "bio",
          "banner_image",
          "name",
        ],
      });
      resolve(details);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// profile creation
export const CreateUserProfile = ({
  id,
  profile_image,
  mobile_no,
  mobile_coutry_no,
  country,
  bio,
  banner_image,
  name,
  user_profile_id,
}) => {
  return new Promise(async (resolve, reject) => {
    const payload = {
      profile_image,
      mobile_no,
      mobile_coutry_no,
      country,
      bio,
      banner_image,
      name,
      user_profile_id,
    };
    try {
      if (!id) {
        await Modle.profile.create(payload);
        resolve("User Created Successfully");
      } else {
        await Modle.profile.update(payload, {
          where: { id },
        });
        resolve("User Created Successfully");
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
