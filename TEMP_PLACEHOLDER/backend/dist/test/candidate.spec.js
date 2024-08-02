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
const candidate_service_1 = require("../src/services/candidate.service");
const candidateDao = __importStar(require("../src/dao/candidate.dao"));
const errorMiddleware_1 = require("../src/middlewares/errorMiddleware");
jest.mock('../src/dao/candidate.dao');
jest.mock('../src/models/Candidate.model');
jest.mock('../src/models/AdverseAction.model');
describe('getAllCandidates', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return candidates', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = 1;
        const pageSize = 10;
        const optionalFilters = {};
        const mockCandidates = [{
                id: 1, name: 'John', status: "CONSIDER",
                adjudication: null,
                location: "FTEST1111 (CA)",
                createdAt: new Date()
            }, {
                id: 2, name: 'Jane', status: "CLEAR",
                adjudication: "ADVERSE ACTION",
                location: "FTEST2222 (CA)",
                createdAt: new Date()
            }];
        candidateDao.getAllCandidates.mockResolvedValue(mockCandidates);
        const result = yield (0, candidate_service_1.getAllCandidates)(page, pageSize, optionalFilters);
        expect(candidateDao.getAllCandidates).toHaveBeenCalledWith(page, pageSize, optionalFilters);
        expect(result).toEqual(mockCandidates);
    }));
    it('should throw NotFoundException if no candidates found', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = 1;
        const pageSize = 10;
        const optionalFilters = { 'name': 'a' };
        candidateDao.getAllCandidates.mockResolvedValue([]);
        yield expect((0, candidate_service_1.getAllCandidates)(page, pageSize, optionalFilters)).rejects.toThrow(errorMiddleware_1.NotFoundException);
    }));
    it('should throw NotFoundException if no adverse action candidates found', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = 1;
        const pageSize = 10;
        const optionalFilters = { name: 'Test' };
        const statusFilters = { status: 'All' };
        candidateDao.getAdverseActionCandidates.mockResolvedValue([]);
        yield expect((0, candidate_service_1.getAdverseActionCandidates)(page, pageSize, optionalFilters, statusFilters)).rejects.toThrow(errorMiddleware_1.NotFoundException);
    }));
});
describe('getCandidateDetails', () => {
    it('should return candidate details', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 1;
        const mockCandidateDetails = {
            id: id,
            email: 'test@example.com',
            package: "Employee pro",
            licenseNo: "FTEST1111 (CA)",
            ssn: '987656789',
            zipcode: '94158',
            phone: "555555555",
            dob: "1990-09-10",
            completedDate: "2018-03-20T09:12:28.000Z",
            turnAroundTime: "1 Day , 2 hours"
        };
        candidateDao.getCandidateDetails.mockResolvedValue(mockCandidateDetails);
        const result = yield (0, candidate_service_1.getCandidateDetails)(id);
        expect(candidateDao.getCandidateDetails).toHaveBeenCalledWith(id);
        expect(result).toEqual(mockCandidateDetails);
    }));
    it('should throw NotFoundException if candidate details not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 1;
        candidateDao.getCandidateDetails.mockResolvedValue(null);
        yield expect((0, candidate_service_1.getCandidateDetails)(id)).rejects.toThrow(errorMiddleware_1.NotFoundException);
    }));
});
describe('addAdverseAction', () => {
    it('should add adverse action and return result', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 1;
        const mockAdverseAction = {
            id: 1, name: 'Test Adverse Action',
            "preNotice": "2024-06-24T10:19:39.714Z",
            "candidateId": 1,
            "status": "SCHEDULED",
            "postNotice": "2024-07-01T10:19:39.713Z"
        };
        candidateDao.addAdverseAction.mockResolvedValue(mockAdverseAction);
        const result = yield (0, candidate_service_1.addAdverseAction)(id);
        expect(candidateDao.addAdverseAction).toHaveBeenCalledWith(id);
        expect(result).toEqual(mockAdverseAction);
    }));
});
describe('getAdverseActionCandidates', () => {
    it('should return adverse action candidates', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = 1;
        const pageSize = 10;
        const optionalFilters = { name: 'Test' };
        const statusFilters = { status: 'All' };
        const mockAdverseActionCandidates = [{
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
        candidateDao.getAdverseActionCandidates.mockResolvedValue(mockAdverseActionCandidates);
        const result = yield (0, candidate_service_1.getAdverseActionCandidates)(page, pageSize, optionalFilters, statusFilters);
        expect(candidateDao.getAdverseActionCandidates).toHaveBeenCalledWith(page, pageSize, optionalFilters, statusFilters);
        expect(result).toEqual(mockAdverseActionCandidates);
    }));
    it('should throw NotFoundException if no adverse action candidates found', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = 1;
        const pageSize = 10;
        const optionalFilters = { name: 'Test' };
        const statusFilters = { status: 'All' };
        candidateDao.getAdverseActionCandidates.mockResolvedValue([]);
        yield expect((0, candidate_service_1.getAdverseActionCandidates)(page, pageSize, optionalFilters, statusFilters)).rejects.toThrow(errorMiddleware_1.NotFoundException);
    }));
});
