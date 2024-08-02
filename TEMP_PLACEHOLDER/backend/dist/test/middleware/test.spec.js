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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const candidate_contoller_1 = require("../../src/controllers/candidate.contoller");
const candidateService = __importStar(require("../../src/services/candidate.service"));
const body_parser_1 = __importDefault(require("body-parser"));
// Mock the dependencies
jest.mock('express-validator', () => (Object.assign(Object.assign({}, jest.requireActual('express-validator')), { validationResult: jest.fn() })));
jest.mock('../../src/services/candidate.service');
const mockValidationResult = express_validator_1.validationResult;
const mockAddAdverseAction = candidateService.addAdverseAction;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.patch('/candidates/:candidateId/action', candidate_contoller_1.addAdverseAction);
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
        mockValidationResult.mockImplementationOnce((req) => ({
            isEmpty: () => false,
            array: () => [{ message: 'Invalid Candidate ID Passed.' }],
        }));
        const response = yield (0, supertest_1.default)(app).patch('/candidates/a/action');
        expect(mockValidationResult).toHaveBeenCalled();
        expect(mockAddAdverseAction).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
        console.log(response.text, "<<<<<<<<<>>>>>>>>>>", response.body.errors);
        expect(response.body).toEqual([{ message: 'Invalid Candidate ID Passed.' }]);
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
