import db from "../models";

export const getCurrentUserSV = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        attributes: {
          exclude: ["password"],
        },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Got successfully!" : "User not found!",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateCurrentUserSV = (id, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(
        {
          name: body.name,
          zalo: body.zalo,
          fbUrl: body.fbUrl,
          avatar: body.avatar,
        },
        { where: { id } }
      );

      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "Update user successfully!" : "User not found!",
      });
    } catch (error) {
      reject(error);
    }
  });
