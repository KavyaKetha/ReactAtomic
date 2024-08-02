import bcrypt from 'bcrypt';
import { InternalServerException } from '../middlewares/errorMiddleware';
const saltRounds = 10;
export const encrypt = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new InternalServerException('Error hashing password.');
    }
};

export const decrypt = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new InternalServerException('Error comparing password.');
    }
};