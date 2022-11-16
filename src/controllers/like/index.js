import Modle from "../../../models";
import { v4 as uuidv4 } from "uuid";

export const UpsertLike = ({
  id,
  command_id,
  post_id,
  is_active = true,
  type = "PT",
  user_profile_id,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        id,
        command_id,
        post_id,
        is_active,
        type,
        created_by: user_profile_id,
      };
      if (!id) {
        await Modle.likes.create({ ...payload, id: uuidv4() });
        return resolve("Liked Created SucessFully");
      }

      await Modle.likes.update(payload, {
        where: {
          id,
        },
      });
      return resolve("Liked Updated SucessFully");
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
