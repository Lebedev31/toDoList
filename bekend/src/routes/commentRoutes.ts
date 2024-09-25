import { Router } from "express";
import tokenMiddlewares from "../middlewares/tokenMiddlewares";
import commentController from "../controllers/commentController";
import getAllComment from "../controllers/getAllComment";
import checkLikes from "../controllers/checkLikes";
import createComment from "../controllers/createComment";

const commentRouter = Router();

commentRouter.post('/create', tokenMiddlewares, commentController);
commentRouter.get('/getComment', tokenMiddlewares, getAllComment);
commentRouter.patch('/checkLikes', tokenMiddlewares, checkLikes);
commentRouter.post('/createComment', tokenMiddlewares, createComment);


export default commentRouter;