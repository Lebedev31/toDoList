import TaskModel from "../models/TaskModel";
import UserModal from "../models/UserModel";
import { Request, Response} from "express";
import { BodyTask } from "../models/modalTypes";




async function uploadController(req: Request, res: Response){


    if(!req.body){
        return res.status(400).json({err: 'Ошибка в отправке данных'});
    }
    
    try {

        const {now, description, colorCategoryButton, name, dateCompletion, check} : BodyTask =  req.body;
       
        
        const userId = await UserModal.findById(req.id);
       
        const newTask = new TaskModel({
            nameTask: name,
            dateOfCompletion: dateCompletion,
            dataOfCreation: now,
            reminder: check,
            categoryTask: colorCategoryButton,
            contentTask: description,
            imgTaskPath: req.file !== undefined ? req.file.path: '',
            user: userId
         });

         await newTask.save();
         const arrTask = await TaskModel.find({user: userId});
         
         if(arrTask){
            res.status(200).json({arrTask});
         } 
        
     } catch (error) {
        console.log(error)
     }
}

export default uploadController;