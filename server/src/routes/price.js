import express from 'express';
import * as controller from '../controllers/price'
const router = express.Router();

router.get('/index', controller.getPricesController)

export default router