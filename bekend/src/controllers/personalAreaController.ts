import { Request,  Response } from "express";
import UserModal from "../models/UserModel";

 
async function personalAreaController(req: Request, res: Response){
    try {

        if(!req.body){
            res.status(400).json({message: 'Запрос выполнен некорректно'});
        }

        if(!req.id){
            res.status(400).json({message: 'Что-то пошло не так на клиенте'});
        }
        const userId = req.id;
        const examinationIdCollection = await UserModal.findById(userId);
        const PROPERTIESARRAY: [string, string, string, string] = ['Имя', 'Фамилия', 'Ник', 'Email'];
        
        if(examinationIdCollection){
            const data = req.body;
            const key = Object.keys(data);
         
            try {

                switch (key[0]) {
               
                    case PROPERTIESARRAY[0]:
                        await UserModal.updateOne(
                            {_id: userId},
                            {$set: {'personalArea.namePersonal': data[key[0]]}},
                            { upsert: true }
                         );
                     
                        break;
                   
                    case PROPERTIESARRAY[1]: 
                        await  UserModal.updateOne(
                            {_id: userId},
                            {$set: {'personalArea.surname': data[key[0]]}},
                            { upsert: true }
                        );
                      
                        break;
    
                    case PROPERTIESARRAY[2]: 
                        await  UserModal.updateOne(
                            {_id: userId},
                            {$set: {'personalArea.email': data[key[0]]}},
                            { upsert: true }
                        );
                     
                        break;
                        
                    case PROPERTIESARRAY[3]: 
                       await  UserModal.updateOne(
                            {_id: userId},
                            {$set: {'personalArea.nikName': data[key[0]]}},
                            { upsert: true }
                        );
                      
                        break;    
                
                    default:
                       return res.send(400).json({message: 'Некорректные данные'})
                    
                }

                const updatedUser = await UserModal.findById(userId);
                return res.status(200).json({ personalArea: updatedUser?.personalArea});
                
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Произошла ошибка при обновлении данных' });
            }
           
        }
     
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Общая ошибка на сервере'});
    }
}

export default personalAreaController;