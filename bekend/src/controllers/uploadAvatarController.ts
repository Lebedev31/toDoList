import { Request, Response} from "express";
import UserModal from "../models/UserModel";
import fs from "fs";


async function uploadAvatar(req: Request, res: Response){

   if(!req.file){
       return res.status(400).json({message: 'Картинка не получена'});
   }

   try {

      if(req.id){

         const img = req.file;
         const userId = req.id;
         const examinationIdCollection = await UserModal.findById(userId);


         if(examinationIdCollection){

        const pathDeleteImg = examinationIdCollection.personalArea.logo as string;
         
        const newPath = img.path.replace(/\\/g, '/');
         
        await UserModal.updateOne(
               {_id: userId},
               {$set: {'personalArea.logo': newPath}},
               { upsert: true }
            );

        fs.access(pathDeleteImg, fs.constants.F_OK, (err)=>{
            if(err){
               console.log('Файла не существует');
            } else{
               fs.unlink(pathDeleteImg, (err)=>{
                  if(err){
                    return res.status(500).json({message: 'Произошла ошибка на сервере при обновлении данных'});
                  }
                  console.log('Файл успешно удален');
               })
            }
         } );

         }

      }

      return res.status(200).json({message: 'Аватар загружен или заменен'});
      
   } catch (error) {
       return res.status(500).json({message: 'Ошибка при обновлении данных'});
   }
   
}


export default uploadAvatar;