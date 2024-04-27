import express from 'express';
import * as controller from '../controllers/category'
const router = express.Router();

router.get('/index', controller.getCategoryController)

export default router