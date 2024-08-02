import { query, param, body } from 'express-validator';
import { AdjudicationStatus, CandidateStatus, AdverseActionStatus } from "../constants/status.constant";
export const validateGetAllCandidates = [
    query('pageNo').optional().isInt({ min: 1 }).withMessage('Page number must be a positive integer'),
    query('pageSize').optional().isInt({ min: 1 }).withMessage('Page size must be a positive integer'),
    query('adjudication').optional().isIn(['All', ...Object.values(AdjudicationStatus)]).withMessage('Invalid Adjudication Status Passed'),
    query('status').optional().isIn(['All', ...Object.values(CandidateStatus)]).withMessage('Invalid Status Passed'),
];

export const validateGetCandidateDetails = [
    param('candidateId').isInt({ min: 1 }).withMessage('Invalid Candidate ID Passed'),
];

export const validateAddAdverseAction = [
    param('candidateId').isInt({ min: 1 }).withMessage('Invalid Candidate ID Passed'),
];

export const validateGetAdverseActionCandidates = [
    query('pageNo').optional().isInt({ min: 1 }).withMessage('Page number must be a positive integer'),
    query('pageSize').optional().isInt({ min: 1 }).withMessage('Page size must be a positive integer'),
    query('status').optional().isIn(['All', ...Object.values(AdverseActionStatus)]).withMessage('Invalid Status Passed'),
];

export const validateUpdateBook = [
    param('id').isInt({ min: 1 }).withMessage('Invalid Book ID Passed'),
    body('price').isInt().withMessage('Price is required')
];