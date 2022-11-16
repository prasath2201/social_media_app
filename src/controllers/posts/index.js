import Modle from "../../../models";
import { v4 as uuidv4 } from "uuid";
const { QueryTypes } = require("sequelize");

// create post
export const CreatePost = ({ id, post, description, user_profile_id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        post,
        description,
        created_by: user_profile_id,
      };
      if (id && id.length > 0) {
        await Modle.Posts.destroy({
          where: {
            id,
          },
        });
        resolve("Post Deleted SuccessFully");
      } else {
        await Modle.Posts.create({ ...payload, id: uuidv4() });
        resolve("Post Created SuccessFully");
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// get post by created_by
export const GetPost = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { count, rows } = await Modle.Posts.findAndCountAll({
        where: {
          created_by: id,
        },
        attributes: ["post", "description", "id", "createdAt"],
        offset: 0,
        limit: 10,
      });
      resolve({
        count,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// get post by created_by
export const GetPostAll = ({ id, offset = 0, limit = 10 }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { count, rows } = await Modle.Posts.findAndCountAll({
        where: {
          created_by: {
            [Modle.Sequelize.Op.in]: Modle.Sequelize.literal(`(
              SELECT fs.follwer
              FROM  follwers AS fs
              WHERE
              fs.user_id = '${id}'
          )`),
          },
        },
        include: [
          {
            model: Modle.likes,
            as: "like",
            where: {
              created_by: {
                [Modle.Sequelize.Op.eq]: id,
              },
            },
            attributes: [["is_active", "current_user_status"], "id"],
            required: false,
          },
          {
            model: Modle.Commands,
            attributes: ["command", "id", "created_by"],
            include: [
              {
                model: Modle.UserProfile,
                attributes: ["id"],
                include: [
                  {
                    model: Modle.profile,
                    attributes: ["name", "profile_image"],
                  },
                ],
              },
            ],
            required: false,
            offset: 0,
            limit: 1,
            order: [["createdAt", "DESC"]],
          },
          {
            model: Modle.UserProfile,
            attributes: ["id"],
            include: [
              { model: Modle.profile, attributes: ["name", "profile_image"] },
            ],
          },
        ],
        attributes: [
          "post",
          "description",
          "id",
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
                  FROM commands
              )`),
            "command_count",
          ],
        ],
        required: false,
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });
      resolve({
        count,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
