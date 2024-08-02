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
exports.populateTableData = void 0;
const courtSearch_model_1 = require("../models/courtSearch.model");
const Candidate_model_1 = require("../models/Candidate.model");
const CandidateCourtSearch_model_1 = require("../models/CandidateCourtSearch.model");
const AdverseAction_model_1 = require("../models/AdverseAction.model");
/* Insert master data to the table*/
const createCourtSearchMasterData = () => {
    courtSearch_model_1.CourtSearch.create({ name: 'SSN Verification' });
    courtSearch_model_1.CourtSearch.create({ name: 'Sex Offender' });
    courtSearch_model_1.CourtSearch.create({ name: 'Global Watchlist' });
    courtSearch_model_1.CourtSearch.create({ name: 'Federal Criminal' });
    courtSearch_model_1.CourtSearch.create({ name: 'County Criminal' });
};
/* Insert master data to the table*/
const createCandidateMasterData = () => {
    Candidate_model_1.Candidate.create({
        name: "John Smith",
        email: "John.smith@checkr.com",
        package: "Employee pro",
        status: "CONSIDER",
        adjudication: null,
        licenseNo: "FTEST1111 (CA)",
        location: "string",
        ssn: '987656789',
        zipcode: '94158',
        phone: "555555555",
        dob: "1990-09-10",
        completedDate: "2018-03-20T09:12:28.000Z"
    });
    Candidate_model_1.Candidate.create({
        name: "Serene",
        email: "serene@checkr.com",
        package: "",
        status: "CLEAR",
        adjudication: null,
        licenseNo: "FTEST2222 (CA)",
        location: "string",
        ssn: '987656798',
        zipcode: '94158',
        phone: "6666666666",
        dob: "1980-05-01",
        completedDate: "2018-02-20T09:12:28.000Z"
    });
    Candidate_model_1.Candidate.create({
        name: "Walsh",
        email: "Walsh@checkr.com",
        package: "EMPLOYEE",
        status: "CONSIDER",
        adjudication: null,
        licenseNo: "FTEST3333 (CA)",
        location: "string",
        ssn: '987656712',
        zipcode: '94158',
        phone: "7777777777",
        dob: "1970-05-01",
        completedDate: "2018-02-20T09:12:28.000Z"
    });
};
/* Insert master data to the table*/
const createCandidateCourtSearchData = () => {
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 1,
        courtSearchId: 1
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 1,
        courtSearchId: 2
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CONSIDER",
        candidateId: 1,
        courtSearchId: 3
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 1,
        courtSearchId: 4
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CONSIDER",
        candidateId: 1,
        courtSearchId: 5
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 1
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 2
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 3
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 4
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 5
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 3,
        courtSearchId: 1
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 3,
        courtSearchId: 2
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CONSIDER",
        candidateId: 3,
        courtSearchId: 3
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 3,
        courtSearchId: 4
    });
    CandidateCourtSearch_model_1.CandidateCourtSearch.create({
        searchDate: "2018-03-20",
        status: "CONSIDER",
        candidateId: 3,
        courtSearchId: 5
    });
};
/* Insert master data to the table*/
const createAdverseActionData = () => {
    AdverseAction_model_1.AdverseAction.create({
        preNotice: "2018-03-20",
        postNotice: "2018-03-20",
        status: "SCHEDULED",
        candidateId: 1
    });
};
/* Insert master data to the table*/
const populateTableData = () => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield createCourtSearchMasterData();
        yield createCandidateMasterData();
        yield createCandidateCourtSearchData();
        yield createAdverseActionData();
    }))();
};
exports.populateTableData = populateTableData;
