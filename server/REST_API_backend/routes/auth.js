import express from 'express';
import { loginUser } from '../controllers/authController.js';
import UserService from '../services/UserService.js';

const router = express.Router();
const userService = UserService;

router.post('/login', (req, res) =>  loginUser(req, res, userService));


export default router;
