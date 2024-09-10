import {Router} from 'express';
import tokenMiddlewares from '../middlewares/tokenMiddlewares';
import upload from '../middlewares/uploadMiddlewares';
import uploadController from '../controllers/uploadController';
import getAllController from '../controllers/getAllController';
import deleteTaskController from '../controllers/deleteTaskController'

const uploadRouter = Router();

uploadRouter.post('/chunkFile', tokenMiddlewares, upload.single('image'), uploadController);

uploadRouter.get('/getAllTasks', tokenMiddlewares, getAllController);

uploadRouter.delete('/deleteTask/:id', tokenMiddlewares, deleteTaskController)

export default uploadRouter;