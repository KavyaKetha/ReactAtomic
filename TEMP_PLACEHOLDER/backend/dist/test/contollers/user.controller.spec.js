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
const user_controller_1 = require("../../src/controllers/user.controller");
const userService = __importStar(require("../../src/services/user.service"));
const errorMiddleware_1 = require("../../src/middlewares/errorMiddleware");
jest.mock('../../src/services/user.service');
describe('User Controller', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });
    describe('signIn', () => {
        it('should return 200 and user data for valid email and password', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, email: 'test@example.com' };
            userService.signIn.mockResolvedValue(mockUser);
            req.body.email = 'test@example.com';
            req.body.password = 'password';
            yield (0, user_controller_1.signIn)(req, res, next);
            expect(userService.signIn).toHaveBeenCalledWith('test@example.com', 'password');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockUser });
        }));
        it('should return 400 if email or password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, user_controller_1.signIn)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException("Email / Password Missing"));
        }));
        it('should return 404 if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            userService.signIn.mockResolvedValue(null);
            req.body.email = 'test@example.com';
            req.body.password = 'password';
            yield (0, user_controller_1.signIn)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.NotFoundException("Unauthorized User. Please check Password / Email"));
        }));
        it('should call next with error when an exception is thrown', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('Internal error');
            userService.signIn.mockRejectedValue(error);
            req.body.email = 'test@example.com';
            req.body.password = 'password';
            yield (0, user_controller_1.signIn)(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        }));
    });
    describe('signUp', () => {
        it('should return 200 and user data for valid email, password, and confirmPassword', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, email: 'test@example.com' };
            userService.signUp.mockResolvedValue(mockUser);
            req.body.email = 'test@example.com';
            req.body.password = 'password';
            req.body.confirmPassword = 'password';
            yield (0, user_controller_1.signUp)(req, res, next);
            expect(userService.signUp).toHaveBeenCalledWith('test@example.com', 'password');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockUser });
        }));
        it('should return 400 if email, password, or confirmPassword is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, user_controller_1.signUp)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException("Email / Password / Confirm Password Missing"));
        }));
        it('should return 400 if password and confirmPassword do not match', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body.email = 'test@example.com';
            req.body.password = 'password';
            req.body.confirmPassword = 'differentpassword';
            yield (0, user_controller_1.signUp)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException("Password and Confirm Password Mismatch"));
        }));
        it('should return 404 if user is not authorized', () => __awaiter(void 0, void 0, void 0, function* () {
            userService.signUp.mockResolvedValue(null);
            req.body.email = 'test@example.com';
            req.body.password = 'password';
            req.body.confirmPassword = 'password';
            yield (0, user_controller_1.signUp)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.NotFoundException("Unauthorized User. Please check Password / Email"));
        }));
        it('should call next with error when an exception is thrown', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('Internal error');
            userService.signUp.mockRejectedValue(error);
            req.body.email = 'test@example.com';
            req.body.password = 'password';
            req.body.confirmPassword = 'password';
            yield (0, user_controller_1.signUp)(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        }));
    });
});
