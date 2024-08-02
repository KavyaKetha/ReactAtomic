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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const userDao = __importStar(require("../src/dao/user.dao"));
const utils = __importStar(require("../src/utils/helper.util"));
const errorMiddleware_1 = require("../src/middlewares/errorMiddleware");
const user_service_1 = require("../src/services/user.service");
jest.mock('jsonwebtoken');
jest.mock('../src/dao/user.dao');
jest.mock('../src/utils/helper.util');
describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('signIn', () => {
        it('should return user data and token on successful sign in', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, email: 'test@example.com', password: 'encryptedPassword' };
            userDao.signIn.mockResolvedValue(mockUser);
            utils.decrypt.mockReturnValue('password');
            jwt.sign.mockReturnValue('token');
            const result = yield (0, user_service_1.signIn)('test@example.com', 'password');
            expect(userDao.signIn).toHaveBeenCalledWith('test@example.com', 'password');
            expect(utils.decrypt).toHaveBeenCalledWith('encryptedPassword');
            expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id, email: mockUser.email }, 'iamjwtsessiontokensecret');
            expect(result).toEqual({ id: mockUser.id, email: mockUser.email, token: 'token' });
        }));
        it('should throw BadRequestException on wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, email: 'test@example.com', password: 'encryptedPassword' };
            userDao.signIn.mockResolvedValue(mockUser);
            utils.decrypt.mockReturnValue('encryptedPassword');
            yield expect((0, user_service_1.signIn)(mockUser.email, 'wrongpasswor')).rejects.toThrow(errorMiddleware_1.BadRequestException);
        }));
        it('should throw NotFoundException when user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            userDao.signIn.mockResolvedValue(null);
            yield expect((0, user_service_1.signIn)('nonexistent@example.com', 'password')).rejects.toThrow(errorMiddleware_1.NotFoundException);
        }));
    });
    describe('signUp', () => {
        it('should create a new user and return user data with token', () => __awaiter(void 0, void 0, void 0, function* () {
            userDao.findUser.mockResolvedValue(null);
            userDao.signUp.mockResolvedValue({ id: 1, email: 'test@example.com' });
            utils.encrypt.mockReturnValue('encryptedPassword');
            jwt.sign.mockReturnValue('token');
            const result = yield (0, user_service_1.signUp)('test@example.com', 'password');
            expect(userDao.findUser).toHaveBeenCalledWith('test@example.com');
            expect(utils.encrypt).toHaveBeenCalledWith('password');
            expect(userDao.signUp).toHaveBeenCalledWith('test@example.com', 'encryptedPassword');
            expect(jwt.sign).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' }, 'iamjwtsessiontokensecret');
            expect(result).toEqual({ id: 1, email: 'test@example.com', token: 'token' });
        }));
        it('should throw AlreadyExistException when user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            userDao.findUser.mockResolvedValue({ email: 'test@example.com' });
            yield expect((0, user_service_1.signUp)('test@example.com', 'password')).rejects.toThrow(errorMiddleware_1.AlreadyExistException);
        }));
    });
});
