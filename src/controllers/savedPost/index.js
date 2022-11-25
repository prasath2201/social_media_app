import Modle from "../../../models";
import { v4 as uuidv4 } from "uuid";

export const UpsertSavedPost = ({ post_id, user_profile_id, id }) => {
  return new Promise(async (resolve, reject) => {
    const payload = {
      post_id,
      created_by: user_profile_id,
    };
    try {
      if (!id) {
        await Modle.SavedPosts.create({ ...payload, id: uuidv4() });
        return resolve("Post Saved Successfully");
      } else {
        await Modle.SavedPosts.destroy({
          where: { id },
        });
        return resolve("Post Updated Successfully");
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const GetSavedPost = ({ user_profile_id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Modle.SavedPosts.findAll({
        where: { created_by: user_profile_id },
        attributes: ["id"],
        include: [
          {
            model: Modle.Posts,
            attributes: ["id"],
          },
        ],
      });
      return resolve(data);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
