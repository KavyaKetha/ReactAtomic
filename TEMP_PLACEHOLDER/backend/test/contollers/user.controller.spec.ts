import { Request, Response, NextFunction } from 'express';
import { signIn, signUp } from '../../src/controllers/user.controller';
import * as userService from '../../src/services/user.service';
import { NotFoundException, BadRequestException } from '../../src/middlewares/errorMiddleware';

jest.mock('../../src/services/user.service');

describe('User Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('signIn', () => {
        it('should return 200 and user data for valid email and password', async () => {
            const mockUser = { id: 1, email: 'test@example.com' };
            (userService.signIn as jest.Mock).mockResolvedValue(mockUser);

            req.body.email = 'test@example.com';
            req.body.password = 'password';

            await signIn(req as Request, res as Response, next);

            expect(userService.signIn).toHaveBeenCalledWith('test@example.com', 'password');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockUser });
        });

        it('should return 400 if email or password is missing', async () => {
            await signIn(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new BadRequestException("Email / Password Missing"));
        });

        it('should return 404 if user is not found', async () => {
            (userService.signIn as jest.Mock).mockResolvedValue(null);

            req.body.email = 'test@example.com';
            req.body.password = 'password';

            await signIn(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new NotFoundException("Unauthorized User. Please check Password / Email"));
        });

        it('should call next with error when an exception is thrown', async () => {
            const error = new Error('Internal error');
            (userService.signIn as jest.Mock).mockRejectedValue(error);

            req.body.email = 'test@example.com';
            req.body.password = 'password';

            await signIn(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('signUp', () => {
        it('should return 200 and user data for valid email, password, and confirmPassword', async () => {
            const mockUser = { id: 1, email: 'test@example.com' };
            (userService.signUp as jest.Mock).mockResolvedValue(mockUser);

            req.body.email = 'test@example.com';
            req.body.password = 'password';
            req.body.confirmPassword = 'password';

            await signUp(req as Request, res as Response, next);

            expect(userService.signUp).toHaveBeenCalledWith('test@example.com', 'password');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockUser });
        });

        it('should return 400 if email, password, or confirmPassword is missing', async () => {
            await signUp(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new BadRequestException("Email / Password / Confirm Password Missing"));
        });

        it('should return 400 if password and confirmPassword do not match', async () => {
            req.body.email = 'test@example.com';
            req.body.password = 'password';
            req.body.confirmPassword = 'differentpassword';

            await signUp(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new BadRequestException("Password and Confirm Password Mismatch"));
        });

        it('should return 404 if user is not authorized', async () => {
            (userService.signUp as jest.Mock).mockResolvedValue(null);

            req.body.email = 'test@example.com';
            req.body.password = 'password';
            req.body.confirmPassword = 'password';

            await signUp(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new NotFoundException("Unauthorized User. Please check Password / Email"));
        });

        it('should call next with error when an exception is thrown', async () => {
            const error = new Error('Internal error');
            (userService.signUp as jest.Mock).mockRejectedValue(error);

            req.body.email = 'test@example.com';
            req.body.password = 'password';
            req.body.confirmPassword = 'password';

            await signUp(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
