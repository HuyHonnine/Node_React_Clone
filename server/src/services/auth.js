import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = ({ phone, name, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          name,
          phone,
          password: hashPassword(password),
          id: v4(),
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Register is successfully!"
          : "Phone number has been already registered!",
        token: token ? token : null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone },
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is successfully!"
          : response
          ? "Password is wrong!"
          : "Phone not found!",
        token: token ? token : null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const logoutService = (req) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return {
        status: 401,
        response: {
          err: 1,
          msg: "Unauthorized - No token provided",
        },
      };
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return {
      status: 200,
      response: {
        err: 0,
        msg: "Logout successful",
        user: decoded,
      },
    };
  } catch (error) {
    return {
      status: 500,
      response: {
        err: -1,
        msg: "Failed to logout" + error,
      },
    };
  }
};

export const getUserService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        raw: true,
        attributes: ["name", "phone"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get user success!" : "Fail to get user!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
