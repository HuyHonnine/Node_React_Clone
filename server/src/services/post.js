import db from "../models";

export const getPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: ["id", "title", "address", "star", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get Success" : "Failed to service get posts!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostPaginationService = (page, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const response = await db.Post.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: [
          "id",
          "title",
          "address",
          "star",
          "description",
          "createdAt",
        ],
        // Thêm sắp xếp theo createdAt giảm dần
        order: [["createdAt", "DESC"]],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get Success" : "Failed to service get posts!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNewPostService = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        where: query,
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get Success" : "Failed to service get posts!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getHotPostService = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        where: {
          ...query,
          star: 5,
        },
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get Success" : "Failed to service get posts!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getDetailPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: [
          "id",
          "title",
          "address",
          "star",
          "description",
          "createdAt",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get Success" : "Failed to service get posts!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
