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
exports.dbConnection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
require("dotenv/config");
const models_1 = require("../src/models");
const loadMasterData_dao_1 = require("../src/dao/loadMasterData.dao");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'checkr',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    storage: ':memory:',
    models: [models_1.CourtSearch, models_1.Candidate, models_1.CandidateCourtSearch, models_1.AdverseAction, models_1.User, models_1.Book],
});
const dbConnection = () => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.sync({ force: true });
        (0, loadMasterData_dao_1.populateTableData)();
    }))();
};
exports.dbConnection = dbConnection;
