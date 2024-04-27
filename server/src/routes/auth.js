import express from 'express'
import * as authController from '../controllers/auth'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout);
router.get('/index-user', authController.getUserController)

export default router