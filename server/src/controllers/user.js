import * as Services from "../services/user";
import { internalError, badRequest } from "../middlewares/handleErrors";
import { name, avatar, fbUrl, zalo } from "../helpers/joiSchema";
import joi from "joi";

export const getCurrentUserCL = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await Services.getCurrentUserSV(id);
    return res.status(200).json(response);
  } catch (error) {
    return internalError(res);
  }
};

export const updateCurrentUserCL = async (req, res) => {
  try {
    const { id } = req.user;
    const { error } = joi
      .object({ name, avatar, fbUrl, zalo })
      .validate(req.body);
    if (error) {
      return badRequest(error.details[0]?.message, res);
    }
    const response = await Services.updateCurrentUserSV(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return internalError(res);
  }
};
