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
const sequelize_typescript_1 = require("sequelize-typescript");
const candidate_1 = require("./candidate");
const courtSearch_1 = require("./courtSearch");
let CandidateCourtSearch = class CandidateCourtSearch extends sequelize_typescript_1.Model {
};
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
    (0, sequelize_typescript_1.ForeignKey)(() => candidate_1.Candidate),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CandidateCourtSearch.prototype, "candidateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => candidate_1.Candidate),
    __metadata("design:type", candidate_1.Candidate)
], CandidateCourtSearch.prototype, "candidate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => courtSearch_1.CourtSearch),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CandidateCourtSearch.prototype, "courtSearchId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => courtSearch_1.CourtSearch),
    __metadata("design:type", courtSearch_1.CourtSearch)
], CandidateCourtSearch.prototype, "courtSearch", void 0);
CandidateCourtSearch = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "candidate_court_search",
    })
], CandidateCourtSearch);
exports.default = CandidateCourtSearch;
