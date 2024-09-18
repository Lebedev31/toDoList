import { Request, Response } from "express";
import CommentTaskModel from "../models/CommentTaskModel";
import { CommentsTask } from "../models/modalTypes";


async function  commentController(req: Request, res: Response) {

    if(!req.body){
        return res.status(400).json({message: 'Данные неккоректны'});
    }
     
    try {

     const dataTask: CommentsTask  = req.body;
     const userId = req.id;
     
     const findComment = await CommentTaskModel.findOne({title: dataTask.title, authorId: userId});

     if(findComment){
        return res.status(409).json({message: 'Вы уже создавали тему с подобным названием'});
     }

        
     
     const newObject = new CommentTaskModel({
            title: dataTask.title,
            description: dataTask.description,
            authorId: userId,
            like: 0
         });
        await newObject.save();

     
    res.status(200).json({message: 'Обсуждение успешно создано'});

        
     } catch (error) {
        res.status(500).json({ message: "Ошибка при создании объекта", error });
     }
}

export default commentController;