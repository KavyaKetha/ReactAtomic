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
const encryption_util_1 = require("../../src/utils/encryption.util");
const bcrypt = __importStar(require("bcrypt"));
jest.mock('bcrypt');
describe('Password Utilities', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const password = 'mypassword';
    let hashedPassword;
    it('should hash a password', () => __awaiter(void 0, void 0, void 0, function* () {
        bcrypt.genSalt.mockReturnValue('salt');
        bcrypt.hash.mockReturnValue('hashedPassword');
        hashedPassword = yield (0, encryption_util_1.encrypt)(password);
        const salt = expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).not.toHaveBeenCalledWith(password, salt);
        expect(hashedPassword).not.toBe(password);
    }));
    it('should compare the password with the hashed password and return true', () => __awaiter(void 0, void 0, void 0, function* () {
        bcrypt.compare.mockReturnValue(true);
        const isMatch = yield (0, encryption_util_1.decrypt)(password, hashedPassword);
        expect(isMatch).toBe(true);
    }));
    it('should compare the password with a different hashed password and return false', () => __awaiter(void 0, void 0, void 0, function* () {
        bcrypt.compare.mockReturnValue(false);
        const isMatch = yield (0, encryption_util_1.decrypt)('wrongpassword', hashedPassword);
        expect(isMatch).toBe(false);
    }));
    it('should throw an error when hashing fails', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => {
            throw new Error('Mocked error');
        });
        yield expect((0, encryption_util_1.encrypt)(password)).rejects.toThrow('Error hashing password');
    }));
    it('should throw an error when comparing fails', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            throw new Error('Mocked error');
        });
        yield expect((0, encryption_util_1.decrypt)(password, hashedPassword)).rejects.toThrow('Error comparing password');
    }));
});
