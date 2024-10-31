import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import articlesRoutes from './routes/articles.js';
import imagesRoutes from './routes/images.js';
import authRoutes from './routes/auth.js'; 
import connectDB from "./db.js";
import cors from 'cors';





dotenv.config();

const app = express(); 
const PORT = 3000; 



app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));



app.use('/api/articles', articlesRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  const role = req.cookies.role || 'guest';
  const token = req.cookies.token || 'none';

  res.send(`
      <h1>You are currently logged in as ${role}</h1>
      <p>Your token is: ${token}</p>
  `);
});



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
