import * as insertService from "../services/insert";

export const insert = async (req, res) => {
  try {
    const respone = await insertService.insertService();
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail to register" + error,
    });
  }
};
