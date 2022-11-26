import Modle from "../../../models";
import { v4 as uuidv4 } from "uuid";

export const CreateChat = ({ id, user_profile_id, to, message }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        message: message,
        users: [user_profile_id, to],
        senders: user_profile_id,
        created_by: user_profile_id,
      };
      if (!id) {
        await Modle.chat.create({ ...payload, id: uuidv4() });
        return resolve("Chat Created SucessFully");
      }

      await Modle.chat.update(payload, {
        where: {
          id,
        },
      });
      return resolve("Chat Updated SucessFully");
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
