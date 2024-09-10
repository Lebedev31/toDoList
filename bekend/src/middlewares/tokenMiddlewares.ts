
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

interface DecodedToken {
    id: string;  
  }


async function tokenMiddlewares(req: Request, res: Response, next: NextFunction){
   
 
    const token = req.headers['authorization']?.split(' ')[1];
   
    if (!token) {
      return res.status(401).json({message: 'Токен отсутствует'})
    }
    
    try {
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as DecodedToken;
        req.id = decoded.id;
        next();

        
    } catch (error) {
        return res.status(401).json({message: 'Токен неверен или истек его срок'})
    }

    
}

export default tokenMiddlewares;