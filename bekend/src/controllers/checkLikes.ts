import { Request, Response } from "express";
import CommentTaskModel from "../models/CommentTaskModel";
import UserModal from "../models/UserModel";



async function checkLikes(req: Request, res: Response){
   try {


    const userId = req.id;
    const commentId = req.body;
    const user = await UserModal.find({_id: userId});
    const comment = await CommentTaskModel.find({_id: commentId});
     
    if((user && user.length !== 0) && (comment && comment.length !== 0)){


        const name = user[0].personalArea?.nikName;
        const avatar = user[0].personalArea?.logo;

        if (name && avatar){
           
           const examinationCommentAuthor = comment[0].comments?.some((item)=> item.avatar === avatar && item.name === name);

           if(!examinationCommentAuthor){

           const update =  await CommentTaskModel.findByIdAndUpdate(
                commentId, 
                {$push:{comments: {name: `${name}`, avatar: `${avatar}`, chekLike: true, commentsArr: [], id: userId}}},
                {upsert: true}
             )
            

             if(update){
                const likes = comment[0].like + 1;
                await CommentTaskModel.findByIdAndUpdate(
                    commentId,
                    {$set: {like: likes}}
                )
             }
            
             return res.status(200).json({message: "Вы поставили лайк"});

           }   

           if(examinationCommentAuthor){
               const updateLike = comment[0].comments?.find((item)=> item.id === userId);
               if(updateLike){
                    
                   if(updateLike.chekLike){

                    const likes = comment[0].like - 1;
                         await CommentTaskModel.findByIdAndUpdate(
                            commentId,
                            {$set: {like: likes}}
                        )

                   } else {
                        const likes = comment[0].like + 1;
                        await CommentTaskModel.findByIdAndUpdate(
                            commentId,
                            {$set: {like: likes}}
                        )

                   }

                   res.status(200).json({message: 'Количество лайков успешно изменено'});
               }
           }



        } else {

            return res.status(401).json({message: 'Добавьте в личном кабинете картинку и аватар'});
        }

    } else{

        return res.status(401).json({message: 'По всей видимости поста или юзера не существует'});
    }
    

    
   } catch (error) {
    
   }
}

export default checkLikes;