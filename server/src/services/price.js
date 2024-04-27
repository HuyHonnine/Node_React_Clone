import db from "../models";

// get category
export const getPricesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.findAll({
        raw: true,
        attributes: ["code", "value", "order"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Success" : "Failed to get Prices!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
