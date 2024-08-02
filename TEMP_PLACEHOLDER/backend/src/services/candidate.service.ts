import { Op } from "sequelize";

import * as candidateDao from "../dao/candidate.dao";
import { AdverseAction, CandidateCourtSearch } from "../models";
import { NotFoundException } from "../middlewares/errorMiddleware";

export const getAllCandidates = async (pageNo: number, pageSize: number, optionalFilters: any): Promise<any> => {
    let offsetV = (pageNo - 1) ? (pageNo - 1) * pageSize : 0;
    if(optionalFilters['name'] ){
        optionalFilters['name'] = { [Op.like]: optionalFilters['name'] + '%' } 
    }
    let result = await candidateDao.getAllCandidates(pageSize, optionalFilters, offsetV);
    if (result?.rows?.length) {
        return { data: result.rows, pageNo, pageSize, offset:offsetV, totalCount: result.count };
    } else {
        throw new NotFoundException("Canditates not found.");
    }
};
export const getCandidateDetails = async (id: number): Promise<any> => {
    let details = await candidateDao.getCandidateDetails(id);
    if (details) {
        let courtsearches: Array<CandidateCourtSearch> = await candidateDao.getCandidateCourtSearches(id);
        return {
            ...details,
            courtSearches: courtsearches
        };
    } else {
        throw new NotFoundException("Candidate details not found.");
    }
};

export const addAdverseAction = async (id: number): Promise<any> => {
    let details = await candidateDao.getCandidateDetails(id);
    if (details) {
        let result: AdverseAction = await candidateDao.addAdverseAction(id);
        return result;
    } else {
        throw new NotFoundException("Invalid Candidate ID Passed.");
    }

};
export const getAdverseActionCandidates = async (pageNo: number, pageSize: number, optionalFilters: any, statusFilters: any): Promise<any> => {
    let offsetV = (pageNo - 1) ? (pageNo - 1) * pageSize : 0;
    if(optionalFilters['name'] ){
        optionalFilters['name'] = { [Op.like]: optionalFilters['name'] + '%' } 
    }
    let result = await candidateDao.getAdverseActionCandidates(pageSize, optionalFilters, statusFilters, offsetV);
    if (result?.rows?.length) {
        return { data: result.rows, pageNo, pageSize, offset:offsetV, totalCount: result.count };
    } else {
        throw new NotFoundException("Adverse Action candidates not found.");
    }
};