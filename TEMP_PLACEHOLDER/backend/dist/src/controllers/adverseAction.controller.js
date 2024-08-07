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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdverseActionCandidates = void 0;
const candidateService = __importStar(require("../services/candidate.service"));
const getAdverseActionCandidates = (req, res) => {
    if (req.query.page && req.query.pageSize) {
        let page = Number(req.query.page), pageSize = Number(req.query.pageSize);
        let optionalFilters = {};
        req.query['search'] ? optionalFilters['name'] = req.query.search : '';
        req.query['status'] ? optionalFilters['status'] = req.query.status : null;
        candidateService.getAdverseActionCandidates(page, pageSize, optionalFilters).then((result) => {
            res.status(200).json({ data: result });
        }).catch((error) => {
            res.status(500).json({ message: "Internal server error occured" });
        });
    }
    else {
        res.status(422).json({ message: "API Params missing in the request" });
    }
};
exports.getAdverseActionCandidates = getAdverseActionCandidates;
