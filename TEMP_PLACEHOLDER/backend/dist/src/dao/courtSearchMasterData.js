"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourtSearchMasterData = void 0;
/** Inserts data into court_search table */
const CourtSearch_model_1 = require("../models/CourtSearch.model");
/** Master Data for court_search table */
// const ssnSearch = new CourtSearch({ name: 'SSN Verification' });
// const soSearch = new CourtSearch({ name: 'Sex Offender' });
// const gwSearch = new CourtSearch({ name: 'Global Watchlist' });
// const fcSearch = new CourtSearch({ name: 'Federal Criminal' });
// const ccSearch = new CourtSearch({ name: 'County Criminal' });
/* Insert master data to the table*/
const createCourtSearchMasterData = () => {
    //     ssnSearch.save();
    //     soSearch.save();
    //     gwSearch.save();
    //     fcSearch.save();
    //     ccSearch.save();
    CourtSearch_model_1.CourtSearch.create({ name: 'SSN Verification' });
    CourtSearch_model_1.CourtSearch.create({ name: 'Sex Offender' });
    CourtSearch_model_1.CourtSearch.create({ name: 'Global Watchlist' });
    CourtSearch_model_1.CourtSearch.create({ name: 'Federal Criminal' });
    CourtSearch_model_1.CourtSearch.create({ name: 'County Criminal' });
};
exports.createCourtSearchMasterData = createCourtSearchMasterData;
// module.exports = { createCourtSearchMasterData };
