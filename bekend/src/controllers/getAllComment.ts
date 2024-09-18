import { Request, Response } from "express";
import CommentTaskModel from "../models/CommentTaskModel";

async function getAllComment(req: Request, res: Response){
     try {
        const data = await CommentTaskModel.find();
        res.status(200).json({comments: data})
        
     } catch (error) {
          console.log(error);
     }
}

export default getAllComment;