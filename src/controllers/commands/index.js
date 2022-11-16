import Modle from "../../../models";
import { v4 as uuidv4 } from "uuid";

// upsert command
export const CreateCommand = ({ post_id, user_profile_id, id, command }) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(user_profile_id, "user_profile_id");
      const payload = {
        post_id,
        created_by: user_profile_id,
        command,
      };

      if (id && id?.length) {
        await Modle.Commands.update(payload, {
          where: {
            id,
          },
        });
        resolve("Command Updated");
      } else {
        await Modle.Commands.create({ ...payload, id: uuidv4() });
        resolve("Command Create");
      }
    } catch (err) {
      reject(err);
    }
  });
};

// get list
export const GetCommand = ({ id, user_profile_id, offset = 0, limit = 10 }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { count, rows } = await Modle.Commands.findAndCountAll({
        where: {
          post_id: id,
        },
        attributes: [
          "id",
          "command",
          "createdAt",
          [
            Modle.Sequelize.literal(`(
                SELECT COUNT(*)
                FROM likes AS l
                WHERE
                    l.is_active = true 
                   AND l.type = 'CM'
            )`),
            "likes_count",
          ],
          [
            Modle.Sequelize.literal(`(
                SELECT COUNT(*)
                FROM replies
            )`),
            "reply_count",
          ],
        ],
        include: [
          {
            model: Modle.likes,
            where: {
              created_by: {
                [Modle.Sequelize.Op.eq]: user_profile_id,
              },
            },
            attributes: [["is_active", "current_user_status"], "id"],
            required: false,
          },
          {
            model: Modle.UserProfile,
            attributes: ["id"],
            include: {
              model: Modle.profile,
              attributes: ["name", "profile_image"],
            },
            required: false,
          },
          {
            model: Modle.reply,
            attributes: ["id", "command"],
            include: {
              model: Modle.UserProfile,
              attributes: ["id"],
              include: [
                { model: Modle.profile, attributes: ["name", "profile_image"] },
              ],
              required: false,
            },
            required: false,
            offset: 0,
            limit: 1,
            order: [["createdAt", "DESC"]],
          },
        ],
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });
      resolve({ count, data: rows });
    } catch (err) {
      reject(err);
    }
  });
};
