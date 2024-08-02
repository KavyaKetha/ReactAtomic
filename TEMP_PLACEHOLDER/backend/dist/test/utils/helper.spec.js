"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_util_1 = require("../../src/utils/helper.util");
const crypto_1 = __importDefault(require("crypto"));
describe('Encryption Utility', () => {
    const password = 'mypassword';
    it('should encrypt a password', () => {
        const encrypted = (0, helper_util_1.encrypt)(password);
        expect(encrypted).toBeDefined();
        expect(encrypted).not.toBe(password);
        expect(encrypted.split(':')).toHaveLength(2);
    });
    it('should decrypt an encrypted password', () => {
        const encrypted = (0, helper_util_1.encrypt)(password);
        const decrypted = (0, helper_util_1.decrypt)(encrypted);
        expect(decrypted).toBe(password);
    });
    it('should use crypto.randomBytes and crypto.createCipheriv', () => {
        const randomBytesSpy = jest.spyOn(crypto_1.default, 'randomBytes');
        const createCipherivSpy = jest.spyOn(crypto_1.default, 'createCipheriv');
        (0, helper_util_1.encrypt)(password);
        expect(randomBytesSpy).toHaveBeenCalledWith(16);
        expect(createCipherivSpy).toHaveBeenCalledWith('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY || 'thisisaencryptionkeyformypasword'), expect.any(Buffer));
        randomBytesSpy.mockRestore();
        createCipherivSpy.mockRestore();
    });
});
// import * as crypto from "crypto";
// import { encrypt } from '../../src/utils/helper.util';
// jest.mock('crypto');
// const IV_LENGTH = 16;
// describe('helper.util', () => {
//     describe('encrypt', () => {
//         let originalBufferConcat: any;
//         beforeEach(() => {
//             originalBufferConcat = Buffer.concat;
//             jest.clearAllMocks();
//         });
//         it('should encrypt a password', () => {
//             const password = 'password123';
//             const expectedEncryptedPassword = 'encryptedpassword123';
//             let iv = (crypto.randomBytes as jest.Mock).mockReturnValue('encrypted');
//             (crypto.createCipheriv as jest.Mock).mockImplementation((algorithm, key, iv) => {
//                 const cipher = {
//                     update: jest.fn().mockReturnValue('encrypted'),
//                     final: jest.fn().mockReturnValue('part'),
//                 };
//                 return {
//                     ...cipher,
//                 } as any;
//             });
//             Buffer.concat = jest.fn().mockImplementation((buffers: Buffer[]) => {
//                 return Buffer.from('encryptedpart');
//             });
//             const result = encrypt(password);
//             expect(result.toString()).toBe('encrypted:656e6372797074656470617274');
//         });
//         afterEach(() => {
//             // Restore the original implementation after each test
//             Buffer.concat = originalBufferConcat;
//         })
//     });
// });
