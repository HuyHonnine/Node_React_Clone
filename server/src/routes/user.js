import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as controllers from "../controllers/user";
const router = express.Router();

//------------Public Routers------------

//------------Private Routers------------
router.use(verifyToken);
router.get("/get-current", controllers.getCurrentUserCL);
router.put("/", controllers.updateCurrentUserCL);

export default router;
