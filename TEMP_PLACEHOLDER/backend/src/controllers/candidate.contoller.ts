import { Request, Response, RequestHandler, NextFunction } from "express";
import * as candidateService from "../services/candidate.service";
import { BadRequestException } from "../middlewares/errorMiddleware";
import { validationResult } from 'express-validator';

export const checkValidation = (req: Request, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       throw new BadRequestException(errors.array().map(err => err.msg).join(', '));

    }
};
const checkSearch = (req: Request, optionalFilters: any) => {
    if (req.query['search']) {
        optionalFilters = { ...optionalFilters, name: req.query.search };
    }
    return optionalFilters;
};
const checkAdjudication = (req: Request, optionalFilters: any) => {
    if (req.query['adjudication'] && req.query.adjudication !== 'All') {
        optionalFilters = { ...optionalFilters, adjudication: req.query.adjudication };
    }
    return optionalFilters;
};
const checkStatus = (req: Request, optionalFilters: any) => {
    if (req.query['status'] && req.query.status !== 'All') {
        optionalFilters = { ...optionalFilters, status: req.query.status };
    }
    return optionalFilters;

};
export const getAllCandidates: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        checkValidation(req, next);
        let pageNo = Number(req.query.pageNo) || 1;
        let pageSize = Number(req.query.pageSize) || 10;
        let optionalFilters: { [k: string]: any } = {};
        optionalFilters = checkSearch(req,optionalFilters);
        optionalFilters = checkAdjudication(req,optionalFilters);
        optionalFilters = checkStatus(req,optionalFilters);
        let result = await candidateService.getAllCandidates(pageNo, pageSize, optionalFilters);
        if (result) {
            res.status(200).json(result);
        }
    } catch (e) {
        next(e);
    }

};

export const getCandidateDetails: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        checkValidation(req, next);
        let id = Number(req.params.candidateId);
        let result = await candidateService.getCandidateDetails(id);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

export const addAdverseAction: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        checkValidation(req, next);
        let id = Number(req.params.candidateId);
        let result = await candidateService.addAdverseAction(id);
        res.status(200).json({ "data": result, message: "Adverse Action Updated" });
    } catch (e) {
        next(e);
    }

};

export const getAdverseActionCandidates: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        checkValidation(req, next);
        let pageNo = Number(req.query.pageNo) || 1;
        let pageSize = Number(req.query.pageSize) || 10;
        let optionalFilters: { [k: string]: any } = {};
        let statusFilters: { [k: string]: any } = {};
        optionalFilters = checkSearch(req,optionalFilters);
        statusFilters = checkStatus(req,statusFilters);
        let result = await candidateService.getAdverseActionCandidates(pageNo, pageSize, optionalFilters, statusFilters);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }

};