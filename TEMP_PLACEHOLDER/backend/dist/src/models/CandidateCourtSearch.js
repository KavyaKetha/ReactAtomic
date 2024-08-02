"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateCourtSearch = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Candidate_1 = require("./Candidate");
const CourtSearch_model_1 = require("./CourtSearch.model");
let CandidateCourtSearch = class CandidateCourtSearch extends sequelize_typescript_1.Model {
};
exports.CandidateCourtSearch = CandidateCourtSearch;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }),
    __metadata("design:type", Number)
], CandidateCourtSearch.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], CandidateCourtSearch.prototype, "searchDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        allowNull: false,
        values: ['CLEAR', 'CONSIDER']
    }),
    __metadata("design:type", String)
], CandidateCourtSearch.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Candidate_1.Candidate),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CandidateCourtSearch.prototype, "candidateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Candidate_1.Candidate),
    __metadata("design:type", Candidate_1.Candidate)
], CandidateCourtSearch.prototype, "candidate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CourtSearch_model_1.CourtSearch),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CandidateCourtSearch.prototype, "courtSearchId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => CourtSearch_model_1.CourtSearch),
    __metadata("design:type", CourtSearch_model_1.CourtSearch)
], CandidateCourtSearch.prototype, "courtSearch", void 0);
exports.CandidateCourtSearch = CandidateCourtSearch = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "candidate_court_search",
    })
], CandidateCourtSearch);
