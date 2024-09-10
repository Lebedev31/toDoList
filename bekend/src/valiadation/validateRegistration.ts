import {body, validationResult}from 'express-validator';
import{Request, Response, NextFunction} from 'express';


const validateRegistration = [
    body('login').isEmail().withMessage('Неправильный формат Email'),
    body('password').isLength({min: 8}).withMessage('Пароль меньше 8 символов'),
    body('name').isLength({min: 5, max: 70}).withMessage('Имя или очень большое или очень маленькое'),

    (req: Request, res: Response, next: NextFunction)=>{

        const errors = validationResult(req);
      
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

export const validationAuth = validateRegistration.filter((_, index)=>{ index !== 2});


export default validateRegistration;