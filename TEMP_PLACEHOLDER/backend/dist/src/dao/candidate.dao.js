"use strict";
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
exports.getAdverseActionCandidates = exports.getCandidateCourtSearches = exports.addAdverseAction = exports.getCandidateDetails = exports.getAllCandidates = void 0;
const models_1 = require("../models");
const getAllCandidates = (pageSize, optionalFilters, offsetV) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield models_1.Candidate.findAndCountAll({
        where: Object.assign({}, optionalFilters),
        attributes: ['id', 'name', 'status', 'adjudication', 'location', 'createdAt'],
        offset: offsetV,
        limit: pageSize,
        raw: false
    });
    return result;
});
exports.getAllCandidates = getAllCandidates;
const getCandidateDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield models_1.Candidate.findOne({
        where: { id: id },
        include: [{
                model: models_1.AdverseAction,
                // required: true,
                attributes: [],
            }],
        raw: false
    });
    if (result)
        return result.get({ plain: true });
    else
        return result;
});
exports.getCandidateDetails = getCandidateDetails;
const addAdverseAction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let postDate = new Date();
    // Add 7 days to current date
    postDate.setDate(postDate.getDate() + 7);
    let result = yield models_1.AdverseAction.create({
        candidateId: id,
        status: 'SCHEDULED',
        postNotice: postDate
    }, { raw: false });
    yield models_1.Candidate.update({ adjudication: 'ADVERSE ACTION' }, {
        where: {
            id: id,
        },
    });
    return result.get({ plain: true });
});
exports.addAdverseAction = addAdverseAction;
const getCandidateCourtSearches = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let results = yield models_1.CandidateCourtSearch.findAll({
        where: { candidateId: id },
        attributes: ['status', 'searchDate', 'courtSearch.name'],
        include: [{
                model: models_1.CourtSearch,
                required: true,
                attributes: ['name'],
            }],
        raw: false
    });
    return results.map((result) => {
        let mappedObj = result.get({ plain: true });
        mappedObj['name'] = result.courtSearch.name;
        delete mappedObj['courtSearch'];
        return mappedObj;
    });
});
exports.getCandidateCourtSearches = getCandidateCourtSearches;
const getAdverseActionCandidates = (pageSize, optionalFilters, statusFilters, offsetV) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Candidate.findAndCountAll({
        where: Object.assign({}, optionalFilters),
        attributes: ['id', 'name', 'adverseAction.status', 'adverseAction.pre_notice', 'adverseAction.post_notice'],
        include: [{
                where: statusFilters,
                model: models_1.AdverseAction,
                required: true,
            }],
        offset: offsetV,
        limit: pageSize,
        raw: false
    });
    return {
        count: result.count,
        rows: result.rows.map((candidate) => {
            let mappedObj = candidate.get({ plain: true });
            mappedObj['preNotice'] = candidate.adverseAction.preNotice;
            mappedObj['postNotice'] = candidate.adverseAction.postNotice;
            mappedObj['status'] = candidate.adverseAction.status;
            delete mappedObj['adverseAction'];
            return mappedObj;
        })
    };
});
exports.getAdverseActionCandidates = getAdverseActionCandidates;
