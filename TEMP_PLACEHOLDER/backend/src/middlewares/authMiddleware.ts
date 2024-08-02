import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { InternalServerException } from "./errorMiddleware";
import * as userDao from '../dao/user.dao';
const jwtsecret = process.env.JWT_SECRET ?? 'iamjwtsessiontokensecret';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. Token missing.' });
    }
    try {
        jwt.verify(token, jwtsecret, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid bearer token.' });
            } else {
                let result = await userDao.findToken(token);
                if (result) {
                    req.body.user = decoded;
                    req.body.token = token;
                    next();
                }
                else {
                    return res.status(403).json({ message: 'Invalid bearer token' });
                }
            }
        });

    } catch (error) {
        return res.status(403).json({ message: 'Invalid bearer token' });
    }
};
export const generateToken = async (id: number, email: string, role: string) => {
    try {
        const token = jwt.sign({ id: id, email: email, role: role }, jwtsecret);
        await userDao.updateToken(email, token);
        return token;
    } catch (error) {
        throw new InternalServerException('Error occured while generating token.');
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ message: 'Token missing.' });
    }
    try {
        jwt.verify(token, jwtsecret, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid bearer token.' });
            } else {
                let result = await userDao.findToken(token);
                if (result) {
                    req.body.user = null;
                    req.body.token = null;
                    await userDao.updateToken(result.email, null);
                    return res.status(200).json({ message: 'Successfully Logged Out.' });
                }
                else {
                    return res.status(403).json({ message: 'Invalid bearer token.' });
                }
            }
        });

    } catch (error) {
        return res.status(403).json({ message: 'Invalid bearer token.' });
    }
};