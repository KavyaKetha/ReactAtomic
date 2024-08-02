import { Request, Response, NextFunction } from 'express';
export class HttpException extends Error {
    public status: number;
    public message: string;


    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string) {
        super(404, message);
    }
}
export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
export class InternalServerException extends HttpException {
    constructor(message: string) {
        super(500, message);
    }
}
export class AlreadyExistException extends HttpException {
    constructor(message: string) {
        super(409, message);
    }
}
export class AuthotizationException extends HttpException {
    constructor(message: string) {
        super(401, message);
    }
}
export const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const message = err.status && err.message ? err.message : 'Internal Server Error Occured';
    const status = err.status || 500;
    if (status == 404) {
        res.status(status).json({ status, message, data: [] });
    } else {

        res.status(status).json({ status, message });
    }
};

