import {Router} from 'express';
import registerController from '../controllers/registerController';
import validateRegistration, {validationAuth} from '../valiadation/validateRegistration';
import authController from '../controllers/authController';


const router =  Router();

router.post('/register', validateRegistration,  registerController);

router.post('/auth', validationAuth, authController );

export default router;


