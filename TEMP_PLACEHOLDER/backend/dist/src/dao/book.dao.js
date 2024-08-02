"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBook = exports.updateBook = exports.getAllBooks = void 0;
const Book_model_1 = require("../models/Book.model");
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Book_model_1.Book.findAll();
});
exports.getAllBooks = getAllBooks;
const updateBook = (id, price) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Book_model_1.Book.update({ price: price }, {
        where: {
            id: id,
        },
    });
});
exports.updateBook = updateBook;
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Book_model_1.Book.findOne({
        where: {
            id: id
        }
    });
});
exports.getBook = getBook;
