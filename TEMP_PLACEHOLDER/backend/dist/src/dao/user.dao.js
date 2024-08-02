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
exports.findToken = exports.updateToken = exports.signUp = exports.findUser = exports.signIn = void 0;
const User_model_1 = require("../models/User.model");
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.User.findOne({
        where: {
            email: email
        },
        attributes: ['id', 'email', 'password', 'role'],
        raw: false
    });
});
exports.signIn = signIn;
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.User.findOne({
        where: {
            email: email,
        },
        attributes: ['id', 'email'],
        raw: false
    });
});
exports.findUser = findUser;
const signUp = (email, encriptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield User_model_1.User.create({
        email: email,
        password: encriptedPassword
    }, { raw: false });
    return result.get({ plain: true });
});
exports.signUp = signUp;
const updateToken = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.User.update({ token: token }, {
        where: {
            email: email,
        },
    });
});
exports.updateToken = updateToken;
const findToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.User.findOne({
        where: {
            token: token
        },
    });
});
exports.findToken = findToken;
