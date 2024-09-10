import bcrypt from 'bcrypt';
import { UserDocument, User } from '../models/modalTypes';
import UserModal from '../models/UserModel';
import {Request, Response} from 'express';


async function registerController(req: Request, res: Response){
    try {

          if(!req.body){
             return res.status(400).json('Данные не полные или не все поля заполнены');
          }

          const {password, login, name}: User = await req.body;

          const isRegistered: UserDocument | null = await UserModal.findOne({login});

          if(isRegistered){
            return res.status(400).json({error: 'Такой email уже существует' });
          }

          const hashPassword = await bcrypt.hash(password, 10);

                                
          const newUser = new UserModal({
            login,
            password: hashPassword,
            name
          });

         const savedUser = await newUser.save();

        res.status(201).json({registration: true});
    
    } catch (error) {
        return res.status(500).json({error: 'Произошла ошибка сервера при регистрации'})
    }
}

export default registerController;