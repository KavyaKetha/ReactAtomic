import * as jwt from 'jsonwebtoken';
import * as userDao from "../../src/dao/user.dao";
import * as utils from '../../src/utils/encryption.util';
import { NotFoundException, AlreadyExistException, BadRequestException } from "../../src/middlewares/errorMiddleware";
import { signIn, signUp } from "../../src/services/user.service";

jest.mock('jsonwebtoken');
jest.mock('../../src/dao/user.dao');
jest.mock('../../src/utils/encryption.util');

describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('signIn', () => {
        it('should return user data and token on successful sign in', async () => {
            const mockUser = { id: 1, email: 'test@example.com', password: 'encryptedPassword' };

            (userDao.signIn as jest.Mock).mockResolvedValue(mockUser);
            (utils.decrypt as jest.Mock).mockReturnValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('token');
            const result = await signIn('test@example.com', 'password');

            expect(userDao.signIn).toHaveBeenCalledWith('test@example.com', 'password');
            expect(utils.decrypt).toHaveBeenCalledWith("password", "encryptedPassword");
            expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id, email: mockUser.email }, 'iamjwtsessiontokensecret');
            expect(result).toEqual({ userId: mockUser.id, email: mockUser.email, token: 'token' });
        });

        it('should throw BadRequestException on wrong password', async () => {
            const mockUser = { id: 1, email: 'test@example.com', password: 'wrongpassword' };
            (userDao.signIn as jest.Mock).mockResolvedValue(mockUser);
            (utils.decrypt as jest.Mock).mockReturnValue(false);

            await expect(signIn(mockUser.email, 'wrongpassword')).rejects.toThrow(BadRequestException);
        });

        it('should throw NotFoundException when user does not exist', async () => {
            (userDao.signIn as jest.Mock).mockResolvedValue(null);

            await expect(signIn('nonexistent@example.com', 'password')).rejects.toThrow(NotFoundException);
        });
    });

    describe('signUp', () => {
        it('should create a new user and return user data with token', async () => {
            (userDao.findUser as jest.Mock).mockResolvedValue(null);
            (userDao.signUp as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com' });
            (utils.encrypt as jest.Mock).mockReturnValue('encryptedPassword');
            (jwt.sign as jest.Mock).mockReturnValue('token');

            const result = await signUp('test@example.com', 'password');

            expect(userDao.findUser).toHaveBeenCalledWith('test@example.com');
            expect(utils.encrypt).toHaveBeenCalledWith('password');
            expect(userDao.signUp).toHaveBeenCalledWith('test@example.com', 'encryptedPassword');
            expect(jwt.sign).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' }, 'iamjwtsessiontokensecret');
            expect(result).toEqual({ userId: 1, email: 'test@example.com', token: 'token' });
        });

        it('should throw AlreadyExistException when user already exists', async () => {

            (userDao.findUser as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

            await expect(signUp('test@example.com', 'password')).rejects.toThrow(AlreadyExistException);
        });
    });
});