import { handleSuccess ,handleError } from "../utils/responseHandler.js";




export const createArticles = async (req, res, articleService) => {
    try {
        const { title, content, image } = req.body; // Expect base64 image as 'image'
        
        // Ensure all fields are present
        if (!title || !content || !image) {
            return res.status(400).send({ message: 'All fields are required (title, content, image).' });
        }

        // Create the article object, including the base64 image string
        const newArticle = await articleService.createArticle({ title, content, image });

        // Send a success response
        res.status(201).send({ message: `Article with id ${newArticle.id} added to the database!` });
    } catch (error) {
        // Handle error and send error response
        res.status(500).send({ message: 'Error saving the article: ' + error.message });
    }
};


export const findArticles = async (req,res,articleService)  => {
    
    try{
        const { id } = req.params;
        const foundArticle = await articleService.findArticleById(id);

        if (!foundArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        
        handleSuccess(res, 200 , foundArticle);


    }catch(error){
        handleError(error.message);

    }
}

export const deleteArticles = async (req,res,articleService)  => {

    try{
        const { id } = req.params;
        const article = await articleService.deleteArticleById(id);

        if(!article){
            return res.status(404).json({message: `cannot find and article`})

        }
        handleSuccess(res, 200 , `Article with the id ${id} deleted from the db`);

             

    }catch(error){
        handleError(error.message);

    }
}

export const updateArticles =  async (req,res,articleService)  => {
    
    try{
        const { id } = req.params;
        const { id: articleId, ...dataToUpdate } = req.body;
        const article = await articleService.updateArticle(id, dataToUpdate);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        handleSuccess(res, 200 , `Article with id ${id} updated successfully`);

    }catch(error){
        handleError(error.message);

    }
}

export const showArticles = async (req,res,articleService)  => {
    try{
        const articles = await articleService.findAllArticles();
        
        handleSuccess(res, 200 , articles);

    }catch(error){
        handleError(error.message);

    }

}