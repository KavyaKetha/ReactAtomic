import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { verifyToken, generateToken, logout } from '../../src/middlewares/authMiddleware';
import * as userDao from '../../src/dao/user.dao';
import { InternalServerException } from '../../src/middlewares/errorMiddleware';

jest.mock('jsonwebtoken');
jest.mock('../../src/dao/user.dao');

const jwtsecret = process.env.JWT_SECRET || 'iamjwtsessiontokensecret';

describe('Auth Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            header: jest.fn().mockReturnValue('Bearer token'),
            body:{
                user:null
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('verifyToken', () => {
        it('should return 401 if token is missing', async () => {
            req.header = jest.fn().mockReturnValue(null);

            await verifyToken(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed. Token missing.' });
        });

        it('should return 403 if token is invalid', async () => {
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(new Error('Invalid token'), null);
            });

            await verifyToken(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid bearer token.' });
        });

        it('should call next if token is valid and found in database', async () => {
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, { id: 1, email: 'test@example.com' });
            });
            (userDao.findToken as jest.Mock).mockResolvedValue({ token: 'token' });

            await verifyToken(req as Request, res as Response, next);

            expect(next).toHaveBeenCalled();
        });

        it('should return 403 if token is valid but not found in database', async () => {
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, { id: 1, email: 'test@example.com' });
            });
            (userDao.findToken as jest.Mock).mockResolvedValue(null);

            await verifyToken(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid bearer token' });
        });
    });

    describe('generateToken', () => {
        it('should generate token and update database', async () => {
            (jwt.sign as jest.Mock).mockReturnValue('newToken');
            (userDao.updateToken as jest.Mock).mockResolvedValue({});

            const token = await generateToken(1, 'test@example.com','');

            expect(token).toBe('newToken');
            expect(userDao.updateToken).toHaveBeenCalledWith('test@example.com', 'newToken');
        });

        it('should throw InternalServerException if error occurs while generating token', async () => {
            (jwt.sign as jest.Mock).mockImplementation(() => {
                throw new Error('Error');
            });

            await expect(generateToken(1, 'test@example.com','')).rejects.toThrow(InternalServerException);
        });
    });

    describe('logout', () => {
        it('should return 401 if token is missing', async () => {
            req.header = jest.fn().mockReturnValue(null);

            await logout(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Token missing.' });
        });

        it('should return 403 if token is invalid', async () => {
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(new Error('Invalid token'), null);
            });

            await logout(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid bearer token.' });
        });

        it('should log out user if token is valid and found in database', async () => {
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, { id: 1, email: 'test@example.com' });
            });
            (userDao.findToken as jest.Mock).mockResolvedValue({ email: 'test@example.com' });
            (userDao.updateToken as jest.Mock).mockResolvedValue(null);


            await logout(req as Request, res as Response, next);

            await expect(userDao.updateToken).toHaveBeenCalledWith('test@example.com', null);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successfully Logged Out.' });
        });

        it('should return 403 if token is valid but not found in database', async () => {
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, { id: 1, email: 'test@example.com' });
            });
            (userDao.findToken as jest.Mock).mockResolvedValue(null);

            await logout(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid bearer token.' });
        });
    });
});
