import express from "express";
const router = express.Router();


import { createImages, findImages } from "../controllers/imagesController.js";
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import ImageService from "../services/ImageService.js";

const imageService = ImageService

router.use(authMiddleware);



router.post('/', adminMiddleware, (req, res) => createImages(req, res, imageService));

router.get('/:id', (req, res) => findImages(req, res, imageService));



export default router;