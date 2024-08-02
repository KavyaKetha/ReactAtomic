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
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const helper_util_1 = require("../src/utils/helper.util");
jest.mock('crypto');
const IV_LENGTH = 16;
describe('helper.util', () => {
    describe('encrypt', () => {
        let originalBufferConcat;
        beforeEach(() => {
            originalBufferConcat = Buffer.concat;
            jest.clearAllMocks();
        });
        it('should encrypt a password', () => {
            const password = 'password123';
            const expectedEncryptedPassword = 'encryptedpassword123';
            let iv = crypto.randomBytes.mockReturnValue('encrypted');
            crypto.createCipheriv.mockImplementation((algorithm, key, iv) => {
                const cipher = {
                    update: jest.fn().mockReturnValue('encrypted'),
                    final: jest.fn().mockReturnValue('part'),
                };
                return Object.assign({}, cipher);
            });
            Buffer.concat = jest.fn().mockImplementation((buffers) => {
                return Buffer.from('encryptedpart');
            });
            const result = (0, helper_util_1.encrypt)(password);
            expect(result.toString()).toBe('encrypted:656e6372797074656470617274');
        });
        afterEach(() => {
            // Restore the original implementation after each test
            Buffer.concat = originalBufferConcat;
        });
    });
});
