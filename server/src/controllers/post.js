import * as services from "../services/post";
import { internalError, badRequest } from "../middlewares/handleErrors";
import {
  title,
  categoryCode,
  label,
  areaNumber,
  priceNumber,
  address,
  priceCode,
  areaCode,
  images,
  description,
  target,
  province,
  category,
  userId,
  overviewId,
  imagesId,
  attributesId,
  postId,
} from "../helpers/joiSchema";
import joi from "joi";

export const getPostController = async (req, res) => {
  try {
    const response = await services.getPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getPostPaginationController = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;
  try {
    const response = await services.getPostPaginationService(page, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getNewPostController = async (req, res) => {
  try {
    const response = await services.getNewPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getHotPostController = async (req, res) => {
  try {
    const response = await services.getHotPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const createPostCL = async (req, res) => {
  try {
    const { id } = req.user;
    const { error } = joi
      .object({
        title,
        categoryCode,
        priceNumber,
        areaNumber,
        label,
        address,
        priceCode,
        areaCode,
        images,
        description,
        target,
        province,
        category,
        userId,
      })
      .validate({ ...req.body });
    if (error) {
      return badRequest(error.details[0]?.message, res);
    }
    const response = await services.createPostSV(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return internalError(res);
  }
};

export const getPostManageCL = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id) {
      return res.status(400).json({ err: 1, msg: "Missing token!" });
    }
    const response = await services.getPostManageSV({ page, id, ...query });
    return res.status(200).json(response);
  } catch (error) {
    return internalError(res);
  }
};

export const updatePostCL = async (req, res) => {
  try {
    const { id } = req.user;
    const { error } = joi
      .object({
        id: joi.string().required(),
        overviewId,
        imagesId,
        attributesId,
        title,
        categoryCode,
        priceNumber,
        areaNumber,
        description,
        target,
        province,
        category,
        label,
        address,
        priceCode,
        areaCode,
        images,
        userId,
      })
      .validate({ ...req.body });
    if (error) {
      return badRequest(error.details[0]?.message, res);
    }
    const response = await services.updatePostSV(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ err: 1, msg: "Internal Server Error" + error.message });
  }
};

export const deletePostCL = async (req, res) => {
  try {
    const { id } = req.user;
    const { error } = joi.object({ postId, userId }).validate(req.query);
    if (error) {
      return badRequest(error.details[0]?.message, res);
    }
    const response = await services.deletePostSV(
      req.query.postId,
      req.query.userId,
      id
    );
    return res.status(200).json(response);
  } catch (error) {
    return internalError(res);
  }
};

