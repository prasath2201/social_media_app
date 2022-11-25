import Modle from "../../../models";
import { v4 as uuidv4 } from "uuid";
import { encode } from "../../../utils";
import nodemailer from "nodemailer";

const bcryptjs = require("bcryptjs");

// get users
export const UserProfile = ({ email_id, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      var user_details = await Modle.UserProfile.findOne({
        where: { email_id: email_id },
        attributes: ["id", "password"],
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
export const GetUserProfile = ({ user_profile_id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const details = await Modle.profile.findOne({
        where: { user_profile_id },
        attributes: [
          "profile_image",
          "mobile_no",
          "mobile_coutry_no",
          "country",
          "bio",
          "banner_image",
          "name",
          [
            Modle.Sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM follwers WHERE follwer = '${user_profile_id}'
              )`),
            "follwers",
          ],
          [
            Modle.Sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM follwers WHERE user_id = '${user_profile_id}'
              )`),
            "following",
          ],
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
        resolve("Profile Created Successfully");
      } else {
        await Modle.profile.update(payload, {
          where: { id },
        });
        resolve("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const mailTrigerFunction = async ({
  from = "",
  to = "",
  subject = "",
  text = "",
  html = "",
}) => {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    let info = "";
    if (to && subject) {
      // send mail with defined transport object
      info = await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
      });
    }
    // console.log("sucess")
  } catch (err) {
    console.log(err);
  }
};
// mailTrigerFunction("prasathmm001@gmail.com" , "prasathm009@gmail.com" , "test")
