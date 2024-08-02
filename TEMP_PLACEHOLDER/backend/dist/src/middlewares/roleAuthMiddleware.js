"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleAuth = void 0;
const errorMiddleware_1 = require("./errorMiddleware");
const roleAuth = (role) => {
    return (req, res, next) => {
        if (req.body.user.role !== role) {
            throw new errorMiddleware_1.AuthotizationException('Access denied');
        }
        next();
    };
};
exports.roleAuth = roleAuth;
