import db from "../models";

// get category
export const getCategoryService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Success" : "Failed to get categories!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
