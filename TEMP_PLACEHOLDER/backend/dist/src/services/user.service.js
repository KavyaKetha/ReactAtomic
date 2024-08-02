"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = void 0;
const userDao = __importStar(require("../dao/user.dao"));
const utils = __importStar(require("../utils/encryption.util"));
const authMiddleware = __importStar(require("../middlewares/authMiddleware"));
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const jwtsecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'iamjwtsessiontokensecret';
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield userDao.signIn(email, password);
    if (result) {
        let decriptedPwd = yield utils.decrypt(password, result.password);
        if (decriptedPwd) {
            const token = yield authMiddleware.generateToken(result.id, result.email, result.role);
            return {
                userId: result.id,
                email: result.email,
                token: token
            };
        }
        else {
            throw new errorMiddleware_1.BadRequestException("Wrong email / Password.");
        }
    }
    else {
        throw new errorMiddleware_1.NotFoundException("User does not exist with this email.");
    }
});
exports.signIn = signIn;
const signUp = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let userR = yield userDao.findUser(email);
    if (userR == null) {
        let pwd = yield utils.encrypt(password);
        let result = yield userDao.signUp(email, pwd);
        const token = yield authMiddleware.generateToken(result.id, result.email, result.role);
        return {
            userId: result.id,
            email: result.email,
            token: token
        };
    }
    else {
        throw new errorMiddleware_1.AlreadyExistException("User already exists with this email.");
    }
});
exports.signUp = signUp;
