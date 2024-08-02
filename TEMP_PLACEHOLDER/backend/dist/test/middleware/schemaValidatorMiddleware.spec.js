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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const schemaValidatorMiddleware_1 = require("../../src/middlewares/schemaValidatorMiddleware");
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const candidateService = __importStar(require("../../src/services/candidate.service"));
jest.mock('express-validator', () => (Object.assign(Object.assign({}, jest.requireActual('express-validator')), { validationResult: jest.fn() })));
jest.mock('../../src/services/candidate.service');
const mockValidationResult = express_validator_1.validationResult;
const mockAddAdverseAction = candidateService.addAdverseAction;
const createValidationRoute = (middlewares, handler) => {
    return (req, res, next) => {
        for (let mw of middlewares) {
            mw(req, res, next);
        }
        handler(req, res, next);
    };
};
const validationHandler = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    res.status(200).send('Valid');
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.patch('/candidates/:candidateId/action', createValidationRoute(schemaValidatorMiddleware_1.validateAddAdverseAction, validationHandler));
app.get('/candidates', createValidationRoute(schemaValidatorMiddleware_1.validateAddAdverseAction, validationHandler));
describe('addAdverseAction Controller', () => {
    beforeEach(() => {
        mockValidationResult.mockImplementation((req) => ({
            isEmpty: () => true,
            array: () => [],
        }));
        mockAddAdverseAction.mockClear();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should pass validation and call the service with valid data', () => __awaiter(void 0, void 0, void 0, function* () {
        const candidateId = 1;
        const mockResult = { success: true };
        mockAddAdverseAction.mockResolvedValue(mockResult);
        const response = yield (0, supertest_1.default)(app).patch(`/candidates/${candidateId}/action`);
        expect(mockValidationResult).toHaveBeenCalled();
        expect(mockAddAdverseAction).toHaveBeenCalledWith(candidateId);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: mockResult, message: 'Adverse Action Updated' });
    }));
    it('should fail validation and return 400 status', () => __awaiter(void 0, void 0, void 0, function* () {
        mockValidationResult.mockImplementation((req) => ({
            isEmpty: () => false,
            array: () => [],
        }));
        const response = yield (0, supertest_1.default)(app).patch('/candidates/a/action');
        expect(mockValidationResult).toHaveBeenCalled();
        expect(mockAddAdverseAction).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
        console.log(response.body.message);
        // expect(response.body.message).toEqual('Invalid Candidate ID Passed.');
    }));
    it('should handle service error and call next with error', () => __awaiter(void 0, void 0, void 0, function* () {
        const candidateId = 1;
        const errorMessage = 'Service error';
        mockAddAdverseAction.mockRejectedValue(new Error(errorMessage));
        const response = yield (0, supertest_1.default)(app).patch(`/candidates/${candidateId}/action`);
        expect(mockAddAdverseAction).toHaveBeenCalledWith(candidateId);
        expect(response.status).toBe(500);
        expect(response.body.message).toBe(errorMessage);
    }));
});
