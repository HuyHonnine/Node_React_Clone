import express from "express";
import * as controller from "../controllers/post";
const router = express.Router();

router.get("/all", controller.getPostController);
router.get("/index", controller.getPostPaginationController);
router.get("/new-post", controller.getNewPostController);
router.get("/hot-post", controller.getHotPostController);

export default router;
