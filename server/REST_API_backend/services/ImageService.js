import { Image } from '../models/imageModel.js';

class ImageService {
    async createImage(data) {
        const newImage = new Image(data);
        await newImage.save();
        return newImage;
    }

    async findImageById(id) {
        return Image.findOne({ id });
    }
}

export default new ImageService();