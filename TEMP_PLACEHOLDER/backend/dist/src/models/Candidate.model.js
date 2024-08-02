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
exports.Candidate = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CandidateCourtSearch_model_1 = require("./CandidateCourtSearch.model");
const AdverseAction_model_1 = require("./AdverseAction.model");
let Candidate = class Candidate extends sequelize_typescript_1.Model {
};
exports.Candidate = Candidate;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }),
    __metadata("design:type", Number)
], Candidate.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Candidate.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Candidate.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Candidate.prototype, "package", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        allowNull: true,
        values: ['CLEAR', 'CONSIDER']
    }),
    __metadata("design:type", String)
], Candidate.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        allowNull: true,
        values: ['ADVERSE ACTION', 'ENGAGE']
    }),
    __metadata("design:type", String)
], Candidate.prototype, "adjudication", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "license_no"
    }),
    __metadata("design:type", String)
], Candidate.prototype, "licenseNo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Candidate.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Candidate.prototype, "ssn", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Candidate.prototype, "zipcode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Candidate.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Candidate.prototype, "dob", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: "completed_at"
    }),
    __metadata("design:type", Date)
], Candidate.prototype, "completedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "turn_around_time"
    }),
    __metadata("design:type", String)
], Candidate.prototype, "turnAroundTime", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], Candidate.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], Candidate.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => CandidateCourtSearch_model_1.CandidateCourtSearch),
    __metadata("design:type", Array)
], Candidate.prototype, "courtSearches", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => AdverseAction_model_1.AdverseAction),
    __metadata("design:type", AdverseAction_model_1.AdverseAction)
], Candidate.prototype, "adverseAction", void 0);
exports.Candidate = Candidate = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "candidate",
    })
], Candidate);
