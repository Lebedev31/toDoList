import { Request, Response } from "express";
import UserModal from "../models/UserModel";
import TaskModel from "../models/TaskModel";

async function getAllController(req: Request, res: Response) {

     if(req.id){

        
        try {
            const userId = await UserModal.findById(req.id);
            const arrTask = await TaskModel.find({user: userId});

            if(arrTask){
                res.status(200).json({arrTask});
            }


        } catch (error) {
            console.log(error)
        }
     } else {
        res.status(401).json({message: 'Скорее всего произошла ошибка авторизации'});
     }
}

export default getAllController;