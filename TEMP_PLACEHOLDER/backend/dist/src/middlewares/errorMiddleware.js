"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.AuthotizationException = exports.AlreadyExistException = exports.InternalServerException = exports.BadRequestException = exports.NotFoundException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HttpException = HttpException;
class NotFoundException extends HttpException {
    constructor(message) {
        super(404, message);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends HttpException {
    constructor(message) {
        super(400, message);
    }
}
exports.BadRequestException = BadRequestException;
class InternalServerException extends HttpException {
    constructor(message) {
        super(500, message);
    }
}
exports.InternalServerException = InternalServerException;
class AlreadyExistException extends HttpException {
    constructor(message) {
        super(409, message);
    }
}
exports.AlreadyExistException = AlreadyExistException;
class AuthotizationException extends HttpException {
    constructor(message) {
        super(401, message);
    }
}
exports.AuthotizationException = AuthotizationException;
const errorMiddleware = (err, req, res, next) => {
    const message = err.status && err.message ? err.message : 'Internal Server Error Occured';
    const status = err.status || 500;
    if (status == 404) {
        res.status(status).json({ status, message, data: [] });
    }
    else {
        res.status(status).json({ status, message });
    }
};
exports.errorMiddleware = errorMiddleware;
