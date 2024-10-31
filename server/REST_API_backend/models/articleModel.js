import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const articleSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        default: uuidv4,
    }
});

export const Article = mongoose.model('Article', articleSchema);


