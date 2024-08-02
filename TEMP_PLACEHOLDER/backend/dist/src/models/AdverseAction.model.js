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
exports.AdverseAction = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Candidate_model_1 = require("./Candidate.model");
let AdverseAction = class AdverseAction extends sequelize_typescript_1.Model {
};
exports.AdverseAction = AdverseAction;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }),
    __metadata("design:type", Number)
], AdverseAction.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: "pre_notice",
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], AdverseAction.prototype, "preNotice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: "post_notice"
    }),
    __metadata("design:type", Date)
], AdverseAction.prototype, "postNotice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        allowNull: false,
        values: ['SCHEDULED', 'DISPUTE', 'UNDELIVERED', 'PENDING']
    }),
    __metadata("design:type", String)
], AdverseAction.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Candidate_model_1.Candidate),
    (0, sequelize_typescript_1.Column)({ field: "candidate_id" }),
    __metadata("design:type", Number)
], AdverseAction.prototype, "candidateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Candidate_model_1.Candidate),
    __metadata("design:type", Candidate_model_1.Candidate)
], AdverseAction.prototype, "candidate", void 0);
exports.AdverseAction = AdverseAction = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "adverse_action",
    })
], AdverseAction);
