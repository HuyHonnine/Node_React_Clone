import db from "../models";
const { Op } = require("sequelize");
import { v4 } from "uuid";
import generateCode from "../ultis/generateCode";
import moment from "moment";
import generateDate from "../ultis/generateDate";
import Sequelize from "sequelize";

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

export const getPostPaginationService = (
  page,
  { limit, order, ...query },
  { priceNumber, areaNumber }
) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { ...query, raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const flimit = +limit || +process.env.LIMIT;
      queries.limit = flimit;
      queries.offset = offset * flimit;
      if (priceNumber) query.priceNumber = { [Op.between]: priceNumber };
      if (areaNumber) query.areaNumber = { [Op.between]: areaNumber };
      if (order) queries.order = [order];
      const response = await db.Post.findAndCountAll({
        where: query,

        ...queries,
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
            attributes: ["name", "phone", "fbUrl", "avatar"],
          },
          {
            model: db.Category,
            as: "categories",
            attributes: ["value"],
          },
          {
            model: db.Overview,
            as: "overviews",
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
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

export const createPostSV = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = v4();
      const imagesId = v4();
      const overviewId = v4();
      const labelCode = generateCode(body.label);
      const provinceCode = body?.province?.includes("Thành phố")
        ? generateCode(body?.province?.replace("Thành phố ", ""))
        : generateCode(body?.province?.replace("Tỉnh ", ""));
      const hashtag = Math.floor(Math.random() * Math.pow(10, 6));
      const currentDate = generateDate();

      await db.Post.create({
        id: v4(),
        title: body.title,
        address: body.address,
        categoryCode: body.categoryCode,
        description: JSON.stringify(body.description),
        userId,
        labelCode,
        overviewId,
        imagesId,
        attributesId,
        areaCode: body.areaCode,
        priceCode: body.priceCode,
        provinceCode,
        priceNumber: body.priceNumber,
        areaNumber: body.areaNumber,
      });

      await db.Attribute.create({
        id: attributesId,
        price:
          +body.priceNumber < 1
            ? `${+body.priceNumber * 1000000} đồng/tháng`
            : `${body.priceNumber} triệu/tháng`,
        acreage: `${body.areaNumber} m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag,
      });

      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body.images),
      });

      await db.Overview.create({
        id: overviewId,
        code: `#${hashtag}`,
        area: body.label,
        type: body?.category,
        target: body?.target,
        bonus: "Tin Thường",
        created: currentDate.today,
        expired: currentDate.expireDay,
      });

      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        default: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        default: {
          code: labelCode,
          value: body.label,
        },
      });

      resolve({
        err: 0,
        msg: "Create new post successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostManageSV = ({ page, id, limit, name, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { ...query, userId: id };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const flimit = +limit || +process.env.LIMIT;
      if (name) query.title = { [Op.substring]: name };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        order: [["createdAt", "DESC"]],
        offset: offset * flimit,
        limit: flimit,
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
          {
            model: db.Overview,
            as: "overviews",
          },
        ],
        // attributes: ["id", "title", "address", "star", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get Success!" : "Failed to service get posts!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updatePostSV = ({
  userId,
  id,
  overviewId,
  imagesId,
  attributesId,
  ...body
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generateCode(body.label);
      const provinceCode = body?.province?.includes("Thành phố")
        ? generateCode(body?.province?.replace("Thành phố ", ""))
        : generateCode(body?.province?.replace("Tỉnh ", ""));
      await db.Post.update(
        {
          title: body.title,
          address: body.address,
          categoryCode: body.categoryCode,
          description: JSON.stringify(body.description),
          labelCode,
          areaCode: body.areaCode,
          priceCode: body.priceCode,
          provinceCode,
          priceNumber: body.priceNumber,
          areaNumber: body.areaNumber,
          createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        {
          where: { id: id, userId: userId },
        }
      );

      await db.Attribute.update(
        {
          price:
            +body.priceNumber < 1
              ? `${+body.priceNumber * 1000000} đồng/tháng`
              : `${body.priceNumber} triệu/tháng`,
          acreage: `${body.areaNumber} m2`,
        },
        { where: { id: attributesId } }
      );

      await db.Image.update(
        {
          image: JSON.stringify(body.images),
        },
        { where: { id: imagesId } }
      );

      await db.Overview.update(
        {
          area: body.label,
          type: body?.category,
          target: body?.target,
        },
        { where: { id: overviewId } }
      );

      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        default: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        default: {
          code: labelCode,
          value: body.label,
        },
      });
      resolve({
        err: 0,
        msg: "Update successfully!",
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const deletePostSV = (postId, userId) =>
  new Promise(async (resolve, reject) => {
    const response = await db.Post.destroy({
      where: { id: postId, userId: userId },
    });
    resolve({
      err: response > 0 ? 0 : 1,
      msg: response > 0 ? "Posts deleted successfully!" : "Not found post!",
    });
    try {
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
