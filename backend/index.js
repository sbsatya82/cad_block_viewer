import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db.js';
import cors from 'cors';
import path from 'path';

import uploadRoutes from './routes/upload.js';
import blockRoutes from './routes/blocks.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const __dirname = path.resolve(); 

app.use('/api/upload', uploadRoutes);
app.use('/api/blocks', blockRoutes);


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("/", (req,res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}



dbConnect.sync().then(() => {
  app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
  });
});
