import express from "express";
import * as controller from "../controllers/province";
const router = express.Router();

router.get("/index", controller.getProvincesController);

export default router;
