import express from 'express';
import multer from 'multer';
import { handleUpload } from '../controllers/uploadController.js';
import path from 'path';

const router = express.Router();
// Multer storage configuration to save with original filename and extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // get .dxf or .dwg
    const name = path.basename(file.originalname, ext); // get filename without extension
    const timestamp = Date.now(); // make it unique
    cb(null, `${name}-${timestamp}${ext}`); // e.g., plan-1234567890.dxf
  }
});

// Create multer upload middleware
const upload = multer({ storage });

router.post('/', upload.single('file'), handleUpload);

export default router;
