import { AuthotizationException } from "./errorMiddleware";
import { Request, Response, NextFunction } from "express";
export const roleAuth = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.body.user.role !== role) {
            throw new AuthotizationException('Access denied');
        }
        next();
    };
};
