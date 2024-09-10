import { Request,  Response } from "express";
import UserModal from "../models/UserModel";

async function personalAreaGetAll(req: Request, res: Response){
   
    try {
        if(!req.id){
           return res.status(400).json({message: 'Что-то пошло не так на клиенте'});
        }

        const userId = req.id;
        const examinationIdCollection = await UserModal.findById(userId);
        if(examinationIdCollection){
            return res.status(200).json({ personalArea: examinationIdCollection?.personalArea});
        } else{
            return res.status(500).json({message: 'Что то пошло не так в базе данных...'});
        }

   } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Кажется на сервере вышла ошибочка'});
   }
}

export default personalAreaGetAll;