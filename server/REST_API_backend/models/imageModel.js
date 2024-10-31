import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const imageSchema = new mongoose.Schema({
    
    image: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        default: uuidv4,
    }
});

export const Image = mongoose.model('Image', imageSchema);