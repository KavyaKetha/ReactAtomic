import * as bookService from '../services/book.service';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestException } from '../middlewares/errorMiddleware';


export const checkValidation = (req: Request, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestException(errors.array().map(err => err.msg).join(', '));

    }
};

export const getAllBooks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        checkValidation(req, next);
        let result = await bookService.getAllBooks();
        if (result) {
            res.status(200).json(result);
        }
    } catch (e) {
        next(e);
    }

};

export const updateBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        checkValidation(req, next);
        let result = await bookService.updateBook(Number(req.params.id), Number(req.body.price));
        if (result) {
            res.status(200).json({ message: "Book Price Updated Successfully" });
        }
    } catch (e) {
        next(e);
    }

};