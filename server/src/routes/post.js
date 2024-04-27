import express from "express";
import * as controller from "../controllers/post";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();

router.get("/all", controller.getPostController);
router.get("/index", controller.getPostPaginationController);
router.get("/new-post", controller.getNewPostController);
router.get("/hot-post", controller.getHotPostController);

router.use(verifyToken);
router.post("/create-post", controller.createPostCL);
router.get("/", controller.getPostManageCL);
router.put("/", controller.updatePostCL);
router.delete("/", controller.deletePostCL);

export default router;
