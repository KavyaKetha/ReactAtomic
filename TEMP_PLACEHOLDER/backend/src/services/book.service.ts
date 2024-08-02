import * as bookDao from '../dao/book.dao';
import { NotFoundException } from '../middlewares/errorMiddleware';
import { Book } from '../models/Book.model';

export const getAllBooks = async (): Promise<any> => {
    let result: Book[] = await bookDao.getAllBooks();
    if (result?.length) {
        return { data: result };
    } else {
        throw new NotFoundException("Books not found.");
    }
}

export const updateBook = async (id: number, price: number): Promise<any> => {
    let details = await bookDao.getBook(id);
    if (details) {
        return await bookDao.updateBook(id, price);
    } else {
        throw new NotFoundException("Book not found.");
    }
}