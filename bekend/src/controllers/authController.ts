import UserModal from '../models/UserModel';
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User, UserDocument } from '../models/modalTypes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

 async function authController(req: Request, res: Response){
   
    try {

        if(!req.body){
            return res.status(400).json('Данные не полные или не все поля заполнены');
         }

        const{login, password}: User = req.body;
        
        const findLogin: UserDocument | null = await UserModal.findOne({login});

        if(findLogin === null){
            return res.status(401).json({error: 'Неверный логин или пароль' });
        } 


        const passwordDecryption = await bcrypt.compare(password, findLogin.password);
      
        
        if(!passwordDecryption){
            return res.status(401).json({error: 'Неверный логин или пароль' });
        }


        const payload = {
            id: findLogin._id,
            name: findLogin.name
        }
        const secret = process.env.JWT_SECRET as string;

        const token = jwt.sign(payload, secret, {expiresIn: '2h'});
        
      

        if(token){
           
            res.status(200).json({
                auth: true,
                token
            });
        }

        
    } catch (error) {
        res.status(500).json({
            error
        });
    }
    
}

export default authController;
