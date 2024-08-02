import { Request, Response, RequestHandler, NextFunction } from "express";
import * as userService from "../services/user.service";
import { NotFoundException, BadRequestException } from "../middlewares/errorMiddleware";
export const signIn: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.email && req.body.password) {
            let result = await userService.signIn(req.body.email, req.body.password)
            if (result) {
                res.status(200).json({ data: result });
            } else {
                throw new NotFoundException("Unauthorized User. Please check Password / Email");
            }
        } else {
            throw new BadRequestException("Email / Password Missing");
        }
    } catch (e) {
        next(e);
    }

};
export const signUp: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.email && (req.body.password && req.body.confirmPassword)) {
            if (req.body.password !== req.body.confirmPassword) {
                throw new BadRequestException("Password and Confirm Password Mismatch");
            }
            let result = await userService.signUp(req.body.email, req.body.password)
            if (result) {
                res.status(200).json({ data: result });
            } else {
                throw new NotFoundException("Unauthorized User. Please check Password / Email");
            }
        } else {
            throw new BadRequestException("Email / Password / Confirm Password Missing");
        }
    } catch (e) {
        next(e);
    }

};