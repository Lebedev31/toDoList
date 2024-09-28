import { Request, Response } from "express";
import { CreateComment } from "../models/modalTypes";
import CommentTaskModel from "../models/CommentTaskModel";
import UserModal from "../models/UserModel";


async function createComment(req: Request, res: Response){
     
    if(!req.body){
        return res.status(401).json({message: 'Неправильный формат отправленных данных'});
     }
    try {

        const comment: CreateComment = req.body;
        const userId = req.id;

        const task = await CommentTaskModel.find({_id: comment.id});

        if(task.length === 0){
            res.status(400).json({message: 'Документа не существет или данные на сервер были отпрвлены не верные'});
        }

        const findAuthorComment = task.find(item => 
            item.comments?.some(comment => comment.id === userId)
          );
        
        if(findAuthorComment){

           await CommentTaskModel.updateOne(
            {_id: comment.id, "comments.id": userId},
            {$push: {"comments.$.commentsArr": comment.comment}}
           );

           const createComment = await CommentTaskModel.find();

           return res.status(200).json({comments: createComment});
        } 

        if(!findAuthorComment){

            const user = await UserModal.findById({_id: userId});
            if(user?.personalArea?.nikName && user?.personalArea?.logo){

             const update = await CommentTaskModel.findByIdAndUpdate(
                 comment.id, 
                {$push:{comments: {name: `${user?.personalArea?.nikName}`, avatar: `${user?.personalArea?.logo}`,  checkLike: false, commentsArr: [], id: userId}}},
                {upsert: true}
             );

             if(update){

                await CommentTaskModel.updateOne(
                    {_id: comment.id, "comments.id": userId},
                    {$push: {"comments.$.commentsArr": comment.comment}}
                );

                const createComment = await CommentTaskModel.find();

                return res.status(200).json({comments: createComment});
             }

            } else{
                return res.status(401).json({message: "Добавьте ник и аватар"});
            }

        }
    
   } catch (error) {
       return res.status(500).json({message: "Ошибка сервера"});
   }
}

export default createComment;