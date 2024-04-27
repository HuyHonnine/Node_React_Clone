import joi from "joi";

// Check validate User
export const email = joi.string().pattern(new RegExp("@gmail.com")).required();
export const password = joi.string().min(6).required();
export const name = joi.string().required();
export const phone = joi.string().required();
export const avatar = joi.string().required();
export const fbUrl = joi.string().required();
export const zalo = joi.string().required();
export const refreshToken = joi.string().required();

//Check Validate Post
export const value = joi.string().required();
export const id = joi.string().required();
export const ids = joi.array().required();
export const title = joi.string().required();
export const userId = joi.required();
export const priceNumber = joi.required();
export const priceCode = joi.required();
export const areaCode = joi.required();
export const areaNumber = joi.required();
export const labelCode = joi.required();
export const label = joi.string().required();
export const address = joi.string().required();
export const description = joi.string().required();
export const filename = joi.array().required();
export const categoryCode = joi.string().uppercase().alphanum().required();
export const price = joi.number().required();
export const images = joi.required();
export const target = joi.required();
export const province = joi.required();
export const category = joi.string().required();
export const overviewId = joi.string().required();
export const imagesId = joi.string().required();
export const attributesId = joi.string().required();
export const postId = joi.string().required();
