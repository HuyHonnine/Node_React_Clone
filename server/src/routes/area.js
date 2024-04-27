import express from 'express';
import * as controller from '../controllers/area'
const router = express.Router();

router.get('/index', controller.getAreasController)

export default router