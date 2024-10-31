import { Article } from '../models/articleModel.js';

class ArticleService {
    async createArticle(data) {
        const newArticle = new Article(data);
        await newArticle.save();
        return newArticle;
    }

    async findArticleById(id) {
        return Article.findOne({ id });
    }

    async deleteArticleById(id) {
        return Article.findOneAndDelete({ id });
    }

    async updateArticle(id, updateData) {
        return Article.findOneAndUpdate({ id }, updateData, { new: true });
    }

    async findAllArticles() {
        return Article.find({});
    }
}

export default new ArticleService();