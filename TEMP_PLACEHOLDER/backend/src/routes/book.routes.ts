
import { Router } from 'express';
import * as bookController from '../controllers/book.controller'
import {
    validateUpdateBook
} from '../middlewares/schemaValidatorMiddleware';
import { roleAuth } from '../middlewares/roleAuthMiddleware';
const bookRouter = Router();

bookRouter.get('/', bookController.getAllBooks);
bookRouter.put('/:id', roleAuth('ADMIN'), ...validateUpdateBook, bookController.updateBook);


export default bookRouter;
