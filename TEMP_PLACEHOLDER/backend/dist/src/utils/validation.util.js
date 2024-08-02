"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEnum = void 0;
const isValidEnum = (value, enumStore) => {
    return Object.values(enumStore).includes(value);
};
exports.isValidEnum = isValidEnum;
