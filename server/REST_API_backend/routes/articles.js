import express from "express";

import { createArticles, findArticles, deleteArticles, updateArticles, showArticles } from "../controllers/articlesController.js";
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import ArticleService from "../services/ArticleService.js";


const router = express.Router();
const articleService = ArticleService;

router.use(authMiddleware);

router.post('/', adminMiddleware, (req, res) => createArticles(req, res, articleService));

router.get('/', (req, res) => showArticles(req, res, articleService));

router.get('/:id', (req, res) => findArticles(req, res, articleService));

router.delete('/:id', adminMiddleware, (req, res) => deleteArticles(req, res, articleService));

router.put('/:id', adminMiddleware, (req, res) => updateArticles(req, res, articleService));

export default router;