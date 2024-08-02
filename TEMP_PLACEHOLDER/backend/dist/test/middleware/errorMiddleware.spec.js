"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware_1 = require("../../src/middlewares/errorMiddleware");
describe('Error Middleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });
    it('should handle NotFoundException', () => {
        const error = new errorMiddleware_1.NotFoundException('Resource not found');
        (0, errorMiddleware_1.errorMiddleware)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ status: 404, message: 'Resource not found', data: [] });
    });
    it('should handle BadRequestException', () => {
        const error = new errorMiddleware_1.BadRequestException('Bad request');
        (0, errorMiddleware_1.errorMiddleware)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'Bad request' });
    });
    it('should handle InternalServerException', () => {
        const error = new errorMiddleware_1.InternalServerException('Internal server error');
        (0, errorMiddleware_1.errorMiddleware)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ status: 500, message: 'Internal server error' });
    });
    it('should handle AlreadyExistException', () => {
        const error = new errorMiddleware_1.AlreadyExistException('Resource already exists');
        (0, errorMiddleware_1.errorMiddleware)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ status: 409, message: 'Resource already exists' });
    });
    it('should handle AuthotizationException', () => {
        const error = new errorMiddleware_1.AuthotizationException('Unauthorized');
        (0, errorMiddleware_1.errorMiddleware)(error, req, res, next);
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
