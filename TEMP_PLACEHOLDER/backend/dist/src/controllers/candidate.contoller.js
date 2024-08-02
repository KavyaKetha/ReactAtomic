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
exports.getAdverseActionCandidates = exports.addAdverseAction = exports.getCandidateDetails = exports.getAllCandidates = exports.checkValidation = void 0;
const candidateService = __importStar(require("../services/candidate.service"));
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const express_validator_1 = require("express-validator");
const checkValidation = (req, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new errorMiddleware_1.BadRequestException(errors.array().map(err => err.msg).join(', '));
    }
};
exports.checkValidation = checkValidation;
const checkSearch = (req, optionalFilters) => {
    if (req.query['search']) {
        optionalFilters = Object.assign(Object.assign({}, optionalFilters), { name: req.query.search });
    }
    return optionalFilters;
};
const checkAdjudication = (req, optionalFilters) => {
    if (req.query['adjudication'] && req.query.adjudication !== 'All') {
        optionalFilters = Object.assign(Object.assign({}, optionalFilters), { adjudication: req.query.adjudication });
    }
    return optionalFilters;
};
const checkStatus = (req, optionalFilters) => {
    if (req.query['status'] && req.query.status !== 'All') {
        optionalFilters = Object.assign(Object.assign({}, optionalFilters), { status: req.query.status });
    }
    return optionalFilters;
};
const getAllCandidates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, exports.checkValidation)(req, next);
        let pageNo = Number(req.query.pageNo) || 1;
        let pageSize = Number(req.query.pageSize) || 10;
        let optionalFilters = {};
        optionalFilters = checkSearch(req, optionalFilters);
        optionalFilters = checkAdjudication(req, optionalFilters);
        optionalFilters = checkStatus(req, optionalFilters);
        let result = yield candidateService.getAllCandidates(pageNo, pageSize, optionalFilters);
        if (result) {
            res.status(200).json(result);
        }
    }
    catch (e) {
        next(e);
    }
});
exports.getAllCandidates = getAllCandidates;
const getCandidateDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, exports.checkValidation)(req, next);
        let id = Number(req.params.candidateId);
        let result = yield candidateService.getCandidateDetails(id);
        res.status(200).json({ data: result });
    }
    catch (e) {
        next(e);
    }
});
exports.getCandidateDetails = getCandidateDetails;
const addAdverseAction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, exports.checkValidation)(req, next);
        let id = Number(req.params.candidateId);
        let result = yield candidateService.addAdverseAction(id);
        res.status(200).json({ "data": result, message: "Adverse Action Updated" });
    }
    catch (e) {
        next(e);
    }
});
exports.addAdverseAction = addAdverseAction;
const getAdverseActionCandidates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, exports.checkValidation)(req, next);
        let pageNo = Number(req.query.pageNo) || 1;
        let pageSize = Number(req.query.pageSize) || 10;
        let optionalFilters = {};
        let statusFilters = {};
        optionalFilters = checkSearch(req, optionalFilters);
        statusFilters = checkStatus(req, statusFilters);
        let result = yield candidateService.getAdverseActionCandidates(pageNo, pageSize, optionalFilters, statusFilters);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});
exports.getAdverseActionCandidates = getAdverseActionCandidates;
