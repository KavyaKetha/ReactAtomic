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
const authMiddleware_1 = require("../../src/middlewares/authMiddleware");
const userDao = __importStar(require("../../src/dao/user.dao"));
const errorMiddleware_1 = require("../../src/middlewares/errorMiddleware");
jest.mock('jsonwebtoken');
jest.mock('../../src/dao/user.dao');
const jwtsecret = process.env.JWT_SECRET || 'iamjwtsessiontokensecret';
describe('Auth Middleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            header: jest.fn().mockReturnValue('Bearer token'),
            body: {
                user: null
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('verifyToken', () => {
        it('should return 401 if token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            req.header = jest.fn().mockReturnValue(null);
            yield (0, authMiddleware_1.verifyToken)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed. Token missing.' });
        }));
        it('should return 403 if token is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            jwt.verify.mockImplementation((token, secret, callback) => {
                callback(new Error('Invalid token'), null);
            });
            yield (0, authMiddleware_1.verifyToken)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid bearer token.' });
        }));
        it('should call next if token is valid and found in database', () => __awaiter(void 0, void 0, void 0, function* () {
            jwt.verify.mockImplementation((token, secret, callback) => {
                callback(null, { id: 1, email: 'test@example.com' });
            });
            userDao.findToken.mockResolvedValue({ token: 'token' });
            yield (0, authMiddleware_1.verifyToken)(req, res, next);
            expect(next).toHaveBeenCalled();
        }));
        it('should return 403 if token is valid but not found in database', () => __awaiter(void 0, void 0, void 0, function* () {
            jwt.verify.mockImplementation((token, secret, callback) => {
                callback(null, { id: 1, email: 'test@example.com' });
            });
            userDao.findToken.mockResolvedValue(null);
            yield (0, authMiddleware_1.verifyToken)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid bearer token' });
        }));
    });
    describe('generateToken', () => {
        it('should generate token and update database', () => __awaiter(void 0, void 0, void 0, function* () {
            jwt.sign.mockReturnValue('newToken');
            userDao.updateToken.mockResolvedValue({});
            const token = yield (0, authMiddleware_1.generateToken)(1, 'test@example.com', '');
            expect(token).toBe('newToken');
            expect(userDao.updateToken).toHaveBeenCalledWith('test@example.com', 'newToken');
        }));
        it('should throw InternalServerException if error occurs while generating token', () => __awaiter(void 0, void 0, void 0, function* () {
            jwt.sign.mockImplementation(() => {
                throw new Error('Error');
            });
            yield expect((0, authMiddleware_1.generateToken)(1, 'test@example.com', '')).rejects.toThrow(errorMiddleware_1.InternalServerException);
        }));
    });
    describe('logout', () => {
        it('should return 401 if token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            req.header = jest.fn().mockReturnValue(null);
            yield (0, authMiddleware_1.logout)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Token missing.' });
        }));
        it('should return 403 if token is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            jwt.verify.mockImplementation((token, secret, callback) => {
                callback(new Error('Invalid token'), null);
            });
            yield (0, authMiddleware_1.logout)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid bearer token.' });
        }));
        it('should log out user if token is valid and found in database', () => __awaiter(void 0, void 0, void 0, function* () {
            jwt.verify.mockImplementation((token, secret, callback) => {
                callback(null, { id: 1, email: 'test@example.com' });
            });
            userDao.findToken.mockResolvedValue({ email: 'test@example.com' });
            userDao.updateToken.mockResolvedValue(null);
            yield (0, authMiddleware_1.logout)(req, res, next);
            yield expect(userDao.updateToken).toHaveBeenCalledWith('test@example.com', null);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successfully Logged Out.' });
        }));
        it('should return 403 if token is valid but not found in database', () => __awaiter(void 0, void 0, void 0, function* () {
            jwt.verify.mockImplementation((token, secret, callback) => {
                callback(null, { id: 1, email: 'test@example.com' });
            });
            userDao.findToken.mockResolvedValue(null);
            yield (0, authMiddleware_1.logout)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid bearer token.' });
        }));
    });
});
