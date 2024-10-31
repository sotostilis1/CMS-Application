

import { handleSuccess ,handleError } from "../utils/responseHandler.js";




export const createImages = async (req,res, imageService) => {
    try {
        const newImage = await imageService.createImage(req.body);
        handleSuccess(res, 201 , `Image with id ${newImage.id} added to the database!`);
    } catch (error) {
        handleError('Error saving the image: ' + error.message);
    }
}

export const findImages = async (req,res,imageService)  => {
    
    try{
        const { id } = req.params;
        const foundImage = await imageService.findImageById(id);

        if (!foundImage) {
            return res.status(404).json({ message: 'Image not found' });
        }
        
        
        handleSuccess(res, 200 , foundImage);

    }catch(error){
        handleError(error.message);
    }
}