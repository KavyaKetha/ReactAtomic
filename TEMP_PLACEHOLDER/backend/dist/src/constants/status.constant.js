"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdverseActionStatus = exports.AdjudicationStatus = exports.CourtSearchStatus = exports.CandidateStatus = void 0;
var CandidateStatus;
(function (CandidateStatus) {
    CandidateStatus["CLEAR"] = "CLEAR";
    CandidateStatus["CONSIDER"] = "CONSIDER";
})(CandidateStatus || (exports.CandidateStatus = CandidateStatus = {}));
var CourtSearchStatus;
(function (CourtSearchStatus) {
    CourtSearchStatus["CLEAR"] = "CLEAR";
    CourtSearchStatus["CONSIDER"] = "CONSIDER";
})(CourtSearchStatus || (exports.CourtSearchStatus = CourtSearchStatus = {}));
var AdjudicationStatus;
(function (AdjudicationStatus) {
    AdjudicationStatus["ADVERSE ACTION"] = "ADVERSE ACTION";
    AdjudicationStatus["ENGAGE"] = "ENGAGE";
})(AdjudicationStatus || (exports.AdjudicationStatus = AdjudicationStatus = {}));
var AdverseActionStatus;
(function (AdverseActionStatus) {
    AdverseActionStatus["SCHEDULED"] = "SCHEDULED";
    AdverseActionStatus["DISPUTE"] = "DISPUTE";
    AdverseActionStatus["UNDELIVERED"] = "UNDELIVERED";
    AdverseActionStatus["PENDING"] = "PENDING";
})(AdverseActionStatus || (exports.AdverseActionStatus = AdverseActionStatus = {}));
