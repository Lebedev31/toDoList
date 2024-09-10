import multer from 'multer';
import path from "path";
import {Request} from 'express';


const storage = multer.diskStorage({
  
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void)=>{
        cb(null, 'dist/upload');
   },

   filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void)=>{
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

   }
});


const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
      }
});

export default upload;