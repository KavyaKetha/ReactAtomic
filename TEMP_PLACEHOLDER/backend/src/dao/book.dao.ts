import { Book } from "../models/Book.model";

export const getAllBooks = async (): Promise<Book[]> => {
    return await Book.findAll();
}

export const updateBook = async (id: number, price: number): Promise<any> => {
    return await Book.update(
        { price: price },
        {
            where: {
                id: id,
            },
        });
}

export const getBook = async (id: number): Promise<any> => {
    return await Book.findOne({
        where: {
            id: id
        }
    });
}