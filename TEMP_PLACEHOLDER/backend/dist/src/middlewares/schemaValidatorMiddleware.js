"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBook = exports.validateGetAdverseActionCandidates = exports.validateAddAdverseAction = exports.validateGetCandidateDetails = exports.validateGetAllCandidates = void 0;
const express_validator_1 = require("express-validator");
const status_constant_1 = require("../constants/status.constant");
exports.validateGetAllCandidates = [
    (0, express_validator_1.query)('pageNo').optional().isInt({ min: 1 }).withMessage('Page number must be a positive integer'),
    (0, express_validator_1.query)('pageSize').optional().isInt({ min: 1 }).withMessage('Page size must be a positive integer'),
    (0, express_validator_1.query)('adjudication').optional().isIn(['All', ...Object.values(status_constant_1.AdjudicationStatus)]).withMessage('Invalid Adjudication Status Passed'),
    (0, express_validator_1.query)('status').optional().isIn(['All', ...Object.values(status_constant_1.CandidateStatus)]).withMessage('Invalid Status Passed'),
];
exports.validateGetCandidateDetails = [
    (0, express_validator_1.param)('candidateId').isInt({ min: 1 }).withMessage('Invalid Candidate ID Passed'),
];
exports.validateAddAdverseAction = [
    (0, express_validator_1.param)('candidateId').isInt({ min: 1 }).withMessage('Invalid Candidate ID Passed'),
];
exports.validateGetAdverseActionCandidates = [
    (0, express_validator_1.query)('pageNo').optional().isInt({ min: 1 }).withMessage('Page number must be a positive integer'),
    (0, express_validator_1.query)('pageSize').optional().isInt({ min: 1 }).withMessage('Page size must be a positive integer'),
    (0, express_validator_1.query)('status').optional().isIn(['All', ...Object.values(status_constant_1.AdverseActionStatus)]).withMessage('Invalid Status Passed'),
];
exports.validateUpdateBook = [
    (0, express_validator_1.param)('id').isInt({ min: 1 }).withMessage('Invalid Book ID Passed'),
    (0, express_validator_1.body)('price').isInt().withMessage('Price is required')
];
