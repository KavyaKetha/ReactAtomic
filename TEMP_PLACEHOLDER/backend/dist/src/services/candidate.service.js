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
exports.getAdverseActionCandidates = exports.addAdverseAction = exports.getCandidateDetails = exports.getAllCandidates = void 0;
const sequelize_1 = require("sequelize");
const candidateDao = __importStar(require("../dao/candidate.dao"));
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const getAllCandidates = (pageNo, pageSize, optionalFilters) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let offsetV = (pageNo - 1) ? (pageNo - 1) * pageSize : 0;
    if (optionalFilters['name']) {
        optionalFilters['name'] = { [sequelize_1.Op.like]: optionalFilters['name'] + '%' };
    }
    let result = yield candidateDao.getAllCandidates(pageSize, optionalFilters, offsetV);
    if ((_a = result === null || result === void 0 ? void 0 : result.rows) === null || _a === void 0 ? void 0 : _a.length) {
        return { data: result.rows, pageNo, pageSize, offset: offsetV, totalCount: result.count };
    }
    else {
        throw new errorMiddleware_1.NotFoundException("Canditates not found.");
    }
});
exports.getAllCandidates = getAllCandidates;
const getCandidateDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let details = yield candidateDao.getCandidateDetails(id);
    if (details) {
        let courtsearches = yield candidateDao.getCandidateCourtSearches(id);
        return Object.assign(Object.assign({}, details), { courtSearches: courtsearches });
    }
    else {
        throw new errorMiddleware_1.NotFoundException("Candidate details not found.");
    }
});
exports.getCandidateDetails = getCandidateDetails;
const addAdverseAction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let details = yield candidateDao.getCandidateDetails(id);
    if (details) {
        let result = yield candidateDao.addAdverseAction(id);
        return result;
    }
    else {
        throw new errorMiddleware_1.NotFoundException("Invalid Candidate ID Passed.");
    }
});
exports.addAdverseAction = addAdverseAction;
const getAdverseActionCandidates = (pageNo, pageSize, optionalFilters, statusFilters) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let offsetV = (pageNo - 1) ? (pageNo - 1) * pageSize : 0;
    if (optionalFilters['name']) {
        optionalFilters['name'] = { [sequelize_1.Op.like]: optionalFilters['name'] + '%' };
    }
    let result = yield candidateDao.getAdverseActionCandidates(pageSize, optionalFilters, statusFilters, offsetV);
    if ((_b = result === null || result === void 0 ? void 0 : result.rows) === null || _b === void 0 ? void 0 : _b.length) {
        return { data: result.rows, pageNo, pageSize, offset: offsetV, totalCount: result.count };
    }
    else {
        throw new errorMiddleware_1.NotFoundException("Adverse Action candidates not found.");
    }
});
exports.getAdverseActionCandidates = getAdverseActionCandidates;
