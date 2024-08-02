import { Request, Response, NextFunction } from 'express';
import { errorMiddleware, HttpException, NotFoundException, BadRequestException, InternalServerException, AlreadyExistException, AuthotizationException } from '../../src/middlewares/errorMiddleware';

describe('Error Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('should handle NotFoundException', () => {
        const error = new NotFoundException('Resource not found');

        errorMiddleware(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ status: 404, message: 'Resource not found', data: [] });
    });

    it('should handle BadRequestException', () => {
        const error = new BadRequestException('Bad request');

        errorMiddleware(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'Bad request' });
    });

    it('should handle InternalServerException', () => {
        const error = new InternalServerException('Internal server error');

        errorMiddleware(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ status: 500, message: 'Internal server error' });
    });

    it('should handle AlreadyExistException', () => {
        const error = new AlreadyExistException('Resource already exists');

        errorMiddleware(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ status: 409, message: 'Resource already exists' });
    });

    it('should handle AuthotizationException', () => {
        const error = new AuthotizationException('Unauthorized');

        errorMiddleware(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ status: 401, message: 'Unauthorized' });
    });

    // it('should handle generic error', () => {
    //     const error = new HttpException(0, '');

    //     errorMiddleware(error, req as Request, res as Response, next);

    //     expect(res.status).toHaveBeenCalledWith(500);
    //     expect(res.json).toHaveBeenCalledWith({ status: 500, message: "Internal Server Error Occurred" });
    // });
});
