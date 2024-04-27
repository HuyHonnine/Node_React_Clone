import db from "../models";

// get category
export const getProvincesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Success" : "Failed to get Province!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
