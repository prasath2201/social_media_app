import Modle from "../../../models";
import { v4 as uuidv4 } from "uuid";

export const createReply = ({ command_id, user_profile_id, id, command }) => {
  return new Promise(async (resolve, reject) => {
    const payload = {
      command_id,
      created_by: user_profile_id,
      command,
    };
    try {
      if (!id) {
        await Modle.reply.create({ ...payload, id: uuidv4() });
        return resolve("Reply Created SucessFully");
      } else {
        await Modle.reply.update(payload, {
          where: { id },
        });
        return resolve("Reply Updated SucessFully");
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// export const getReply = ({ id , offset=0 ,limit=10}) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const data = await Modle.reply.findAndCountAll({
//         where: {
//           command_id: id,
//         },
//         offset,
//         limit,
//         order: [["createdAt", "DESC"]],
//       });
//       resolve(data)
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

export const getReply = ({ id, offset = 0, limit = 10 }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Modle.reply.findAndCountAll({
        where: {
          command_id: id,
        },
        attributes: ["command", "id"],
        include: {
          model: Modle.UserProfile,
          attributes: ["id"],
          include: [
            { model: Modle.profile, attributes: ["name", "profile_image"] },
          ],
          required: false,
        },
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });
      resolve(data);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
