import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/userRoutes';
import uploadRouter from './routes/uploadRoutes';
import path from 'path';
import personalAreaRouter from './routes/personalAreaRoutes';
import commentRouter from './routes/commentRoutes';

const uri:'mongodb+srv://user:user@cluster0.uoefzol.mongodb.net/dataBd'= 'mongodb+srv://user:user@cluster0.uoefzol.mongodb.net/dataBd';
 

mongoose.connect(uri)
         .then(()=>{
            console.log('база данных запущена');
         })
         .catch((err: Error)=>{
            console.log(err.message);
         });

const app: Application = express();
const port: number = 8000;
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use(express.text());
app.use(express.json());
app.use(cors());
app.use('/user', router);
app.use('/upload', uploadRouter);
app.use ('/personalArea', personalAreaRouter);
app.use('/commentsTask', commentRouter);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
