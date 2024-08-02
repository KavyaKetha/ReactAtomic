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
const candidate_contoller_1 = require("../../src/controllers/candidate.contoller");
const errorMiddleware_1 = require("../../src/middlewares/errorMiddleware");
const candidateService = __importStar(require("../../src/services/candidate.service"));
const express_validator_1 = require("express-validator");
jest.mock('../../src/services/candidate.service');
jest.mock('express-validator', () => {
    const originalModule = jest.requireActual('express-validator');
    return Object.assign(Object.assign({}, originalModule), { validationResult: jest.fn() });
});
let req;
let res;
let next;
describe('Candidate Controller', () => {
    beforeEach(() => {
        req = {
            query: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });
    describe('getAllCandidates', () => {
        it('should return candidates when query parameters are provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCandidates = [
                {
                    id: 1,
                    name: 'John Doe',
                    status: 'CLEAR',
                    adjudication: 'ADVERSE ACTION',
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    status: 'CLEAR',
                    adjudication: null,
                },
            ];
            const mockResponse = { data: mockCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 2 };
            req = {
                query: {
                    pageNo: '1',
                    pageSize: '10'
                }
            };
            candidateService.getAllCandidates.mockResolvedValue(mockResponse);
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            yield (0, candidate_contoller_1.getAllCandidates)(req, res, next);
            yield expect(candidateService.getAllCandidates).toHaveBeenCalledWith(1, 10, {});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        }));
        it('should throw NotFoundException when candidates are not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                query: {
                    page: '1',
                    pageSize: '10',
                    search: 'a'
                }
            };
            candidateService.getAllCandidates.mockRejectedValue(new errorMiddleware_1.NotFoundException("Candidates not found."));
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            yield (0, candidate_contoller_1.getAllCandidates)(req, res, next);
            yield expect(candidateService.getAllCandidates).rejects.toThrow(errorMiddleware_1.NotFoundException);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.NotFoundException("Candidates not found."));
        }));
        it('should pass optional filters to the service', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCandidates = [
                {
                    "id": 3,
                    "name": "Walsh",
                    "status": "CONSIDER",
                    "adjudication": "ADVERSE ACTION",
                    "location": "string",
                    "createdAt": "2024-06-25T10:56:52.000Z"
                }
            ];
            const mockResponse = { data: mockCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 1 };
            req = {
                query: {
                    page: '1',
                    pageSize: '10',
                    search: 'Walsh',
                    status: 'CONSIDER',
                    adjudication: 'ADVERSE ACTION'
                }
            };
            candidateService.getAllCandidates.mockResolvedValue(mockResponse);
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            yield (0, candidate_contoller_1.getAllCandidates)(req, res, next);
            expect(candidateService.getAllCandidates).toHaveBeenCalledWith(1, 10, {
                name: 'Walsh',
                status: 'CONSIDER',
                adjudication: 'ADVERSE ACTION'
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        }));
        it('should throw an error if pageNo and pageSize are not numbers', () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                query: {
                    pageNo: 'a',
                    pageSize: 'b',
                }
            };
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Page number must be a positive integer, Page size must be a positive integer' }],
            });
            yield (0, candidate_contoller_1.getAllCandidates)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException('Page number must be a positive integer, Page size must be a positive integer'));
        }));
        it('should throw an error if invalid adjudication passed', () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                query: {
                    adjudication: 'ADVERSE action'
                }
            };
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Adjudication Status Passed' }],
            });
            yield (0, candidate_contoller_1.getAllCandidates)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException("Invalid Adjudication Status Passed"));
        }));
        it('should throw an error if invalid status passed', () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                query: {
                    status: 'active'
                }
            };
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Status Passed' }],
            });
            yield (0, candidate_contoller_1.getAllCandidates)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException("Invalid Status Passed"));
        }));
        it('should call next with BadRequestException if validation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid request' }],
            });
            yield (0, candidate_contoller_1.getAllCandidates)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException('Invalid request'));
        }));
    });
    describe('getCandidateDetails', () => {
        it('should return 200 and candidate details for valid candidate ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCandidate = {
                "id": 1,
                "name": "John Smith",
                "email": "John.smith@checkr.com",
                "package": "Employee pro",
                "status": "CONSIDER",
                "adjudication": null,
                "licenseNo": "FTEST1111 (CA)",
                "location": "string",
                "ssn": 987656789,
                "zipcode": 94158,
                "phone": 555555555,
                "dob": "1990-09-10T00:00:00.000Z",
                "completedDate": "2018-03-20T09:12:28.000Z",
                "turnAroundTime": "1 Day , 2 hours",
                "createdAt": "2024-06-25T05:23:29.000Z",
                "updatedAt": "2024-06-25T05:23:29.000Z",
                "courtSearches": [
                    {
                        "status": "CLEAR",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "SSN Verification"
                    },
                    {
                        "status": "CLEAR",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "Sex Offender"
                    },
                    {
                        "status": "CONSIDER",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "Global Watchlist"
                    },
                    {
                        "status": "CLEAR",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "Federal Criminal"
                    },
                    {
                        "status": "CONSIDER",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "County Criminal"
                    }
                ]
            };
            candidateService.getCandidateDetails.mockResolvedValue(mockCandidate);
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            req = {
                params: {
                    candidateId: '1'
                }
            };
            yield (0, candidate_contoller_1.getCandidateDetails)(req, res, next);
            expect(candidateService.getCandidateDetails).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockCandidate });
        }));
        it('should return 400 for invalid candidate ID', () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                params: {
                    candidateId: 'abc'
                }
            };
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Candidate ID Passed' }],
            });
            yield (0, candidate_contoller_1.getCandidateDetails)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException("Invalid Candidate ID Passed"));
        }));
        it('should call next with error when an exception is thrown', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('Internal error');
            candidateService.getCandidateDetails.mockRejectedValue(error);
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Internal error' }],
            });
            req = {
                params: {
                    candidateId: '1'
                }
            };
            yield (0, candidate_contoller_1.getCandidateDetails)(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        }));
    });
    describe('addAdverseAction', () => {
        it('should return 200 and update adverse action for valid candidate ID', () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                params: {
                    candidateId: '1'
                }
            };
            const mockResult = {
                "preNotice": "2024-06-25T10:05:55.065Z",
                "id": 3,
                "candidateId": 1,
                "status": "SCHEDULED",
                "postNotice": "2024-07-02T10:05:55.065Z"
            };
            candidateService.addAdverseAction.mockResolvedValue(mockResult);
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            yield (0, candidate_contoller_1.addAdverseAction)(req, res, next);
            expect(candidateService.addAdverseAction).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockResult, message: "Adverse Action Updated" });
        }));
        it('should return 400 for invalid candidate ID', () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                params: {
                    candidateId: 'abc'
                }
            };
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Candidate ID Passed' }],
            });
            yield (0, candidate_contoller_1.addAdverseAction)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException("Invalid Candidate ID Passed"));
        }));
    });
    describe('getAdverseActionCandidates', () => {
        it('should return 200 and adverse action candidates for valid query params', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCandidates = [{
                    "id": 3,
                    "name": "Walsh",
                    "status": "SCHEDULED",
                    "pre_notice": "2018-03-20T00:00:00.000Z",
                    "post_notice": "2018-03-28T00:00:00.000Z"
                },
                {
                    "id": 1,
                    "name": "John Smith",
                    "status": "SCHEDULED",
                    "pre_notice": "2024-06-24T10:19:39.000Z",
                    "post_notice": "2024-07-01T10:19:39.000Z"
                }];
            req = {
                query: {
                    page: '1',
                    pageSize: '10'
                }
            };
            const mockResponse = { data: mockCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 2 };
            candidateService.getAdverseActionCandidates.mockResolvedValue(mockResponse);
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            yield (0, candidate_contoller_1.getAdverseActionCandidates)(req, res, next);
            expect(candidateService.getAdverseActionCandidates).toHaveBeenCalledWith(1, 10, {}, {});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        }));
        it('should apply optional and status filters', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCandidates = [{
                    "id": 3,
                    "name": "Walsh",
                    "status": "SCHEDULED",
                    "pre_notice": "2018-03-20T00:00:00.000Z",
                    "post_notice": "2018-03-28T00:00:00.000Z"
                },
                {
                    "id": 1,
                    "name": "John Smith",
                    "status": "SCHEDULED",
                    "pre_notice": "2024-06-24T10:19:39.000Z",
                    "post_notice": "2024-07-01T10:19:39.000Z"
                }];
            req = {
                query: {
                    page: '1',
                    pageSize: '10',
                    search: 'Jane',
                    status: 'SCHEDULED'
                }
            };
            const mockResponse = { data: mockCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 2 };
            candidateService.getAdverseActionCandidates.mockResolvedValue(mockResponse);
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            yield (0, candidate_contoller_1.getAdverseActionCandidates)(req, res, next);
            expect(candidateService.getAdverseActionCandidates).toHaveBeenCalledWith(1, 10, { name: 'Jane' }, { status: 'SCHEDULED' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        }));
        it('should call next with error when an exception is thrown', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('Internal error');
            candidateService.getAdverseActionCandidates.mockRejectedValue(error);
            req = {
                query: {
                    page: '1',
                    pageSize: '10'
                }
            };
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Internal error' }],
            });
            yield (0, candidate_contoller_1.getAdverseActionCandidates)(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        }));
        it('should throw an error if pageNo and pageSize are not numbers', () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                query: {
                    pageNo: 'a',
                    pageSize: 'b',
                }
            };
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Page number must be a positive integer, Page size must be a positive integer' }],
            });
            yield (0, candidate_contoller_1.getAdverseActionCandidates)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException("Page number must be a positive integer, Page size must be a positive integer"));
        }));
        it('should throw an error if invalid status passed', () => __awaiter(void 0, void 0, void 0, function* () {
            req = {
                query: {
                    status: 'active'
                }
            };
            express_validator_1.validationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Status Passed' }],
            });
            yield (0, candidate_contoller_1.getAdverseActionCandidates)(req, res, next);
            expect(next).toHaveBeenCalledWith(new errorMiddleware_1.BadRequestException("Invalid Status Passed"));
        }));
    });
});
