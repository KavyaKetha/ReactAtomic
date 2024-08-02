
import { Router } from 'express';
import * as userController from '../controllers/user.controller'

const userRouter = Router();

userRouter.get('/sign-in', userController.signIn);
userRouter.get('/sign-up', userController.signUp);

export default userRouter;
