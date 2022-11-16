import Modle from "../../../models";
import { v4 as uuidv4 } from "uuid";

// create follow
export const UpsertFollow = ({ user_profile_id, follwer, id }) => {
  return new Promise(async (resolve, reject) => {
    const payload = {
      user_id: user_profile_id,
      follwer,
    };
    try {
      if (id && id.length > 0) {
        await Modle.Follwers.destroy({
          where: {
            id,
          },
        });
        resolve("Unfollow SuccessFully");
      } else {
        await Modle.Follwers.create({ ...payload, id: uuidv4() });
        resolve("Follow SuccessFully");
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
