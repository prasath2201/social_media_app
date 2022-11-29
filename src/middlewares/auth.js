import { verify, decode } from "../../utils";
import Modle from "../../models";

// check token access
export const isAuthenticated = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[1] &&
      req.headers.authorization.split(" ")[1] != "null" &&
      req.headers.authorization.split(" ")[1] != "undefined"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = await verify(token);
      const token_detial = decode(token);
      const details = await Modle.profile.findOne({
        where: { user_profile_id: token_detial?.id },
        attributes: ["id"],
      });
      res.locals.user = payload;
      req.body["profile_id"] = details?.id;
      req.body["user_profile_id"] = token_detial?.id;
      return next();
    } else {
      return next({
        code: 403,
        message: "You are not an authorized user!",
      });
    }
  } catch (err) {
    console.log(err);
    return next({
      code: 400,
      message: err.message,
    });
  }
};

// get profile id by user profile id
export const getUserProfile = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[1] &&
      req.headers.authorization.split(" ")[1] != "null" &&
      req.headers.authorization.split(" ")[1] != "undefined"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = await verify(token);

      const details = await Modle.profile.findOne({
        where: { user_profile_id: payload?.id },
        attributes: ["id"],
      });

      return details;
    }
    return next({
      code: 403,
      message: "You are not an authorized user!",
    });
  } catch (err) {
    return next({
      code: 400,
      message: err.message,
    });
  }
};
