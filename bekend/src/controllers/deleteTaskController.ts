import { Request, Response } from "express";
import TaskModel from "../models/TaskModel";
import fs from 'fs';


async function deleteTaskController(req: Request, res: Response){
    const {id} = req.params;
    const userId = req.id;

    if(!id){
        return res.status(400).json({message: 'Не указан id для удаления'});
    }
    try {
        const taskPathImageId = await TaskModel.findById(id);
        const deleteT = taskPathImageId?.nameTask;
        
        if (!taskPathImageId) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if(taskPathImageId.imgTaskPath){
           const newPath = taskPathImageId.imgTaskPath.replace(/\\/g, '/');
           fs.unlink(newPath, (err)=>{
               if(err){
                 console.log('Проблема с удалением картинки');
               }

               console.log('картинка удалена');
           })
        }
        await TaskModel.deleteOne({nameTask: deleteT});
        const arrTask = await TaskModel.find({user: userId});

        res.status(200).json({arrTask});
        
    } catch (error) {
        res.status(404).json({message: 'Ресурс не найден или был уже удален'});
    }


}

export default deleteTaskController;