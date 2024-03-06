import express from "express";
import * as controller from "../controllers/post"
const router = express.Router();

router.get('/all', controller.getPostController)
router.get('/index', controller.getPostPaginationController)

export default router;
