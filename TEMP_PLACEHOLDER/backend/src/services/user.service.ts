import * as userDao from "../dao/user.dao";
import * as utils from '../utils/encryption.util';
import * as authMiddleware from '../middlewares/authMiddleware';

import { NotFoundException, AlreadyExistException, BadRequestException } from "../middlewares/errorMiddleware";

const jwtsecret = process.env.JWT_SECRET ?? 'iamjwtsessiontokensecret';

export const signIn = async (email: string, password: string): Promise<any> => {
    let result = await userDao.signIn(email, password);
    if (result) {
        let decriptedPwd = await utils.decrypt(password, result.password);
        if (decriptedPwd) {
            const token = await authMiddleware.generateToken(result.id, result.email, result.role);
            return {
                userId: result.id,
                email: result.email,
                token: token
            };
        } else {
            throw new BadRequestException("Wrong email / Password.");
        }
    } else {
        throw new NotFoundException("User does not exist with this email.");
    }
};
export const signUp = async (email: string, password: string): Promise<any> => {
    let userR = await userDao.findUser(email);
    if (userR == null) {
        let pwd = await utils.encrypt(password)
        let result = await userDao.signUp(email, pwd)

        const token = await authMiddleware.generateToken(result.id, result.email, result.role);
        return {
            userId: result.id,
            email: result.email,
            token: token
        };
    } else {
        throw new AlreadyExistException("User already exists with this email.");
    }

};