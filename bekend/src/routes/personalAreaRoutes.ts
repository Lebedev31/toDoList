import { Router } from "express";
import tokenMiddlewares from "../middlewares/tokenMiddlewares";
import personalAreaController from "../controllers/personalAreaController";
import personalAreaGetAll from "../controllers/personalAreaGetAll";
import upload from "../middlewares/uploadMiddlewares";
import uploadAvatar from "../controllers/uploadAvatarController";

const personalAreaRouter = Router();

personalAreaRouter.post('/categories', tokenMiddlewares, personalAreaController);

personalAreaRouter.get('/categories', tokenMiddlewares, personalAreaGetAll);

personalAreaRouter.post('/categoriesUploadImg', tokenMiddlewares, upload.single('image'), uploadAvatar)

export default personalAreaRouter;