"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_util_1 = require("../../src/utils/validation.util");
var MockEnum;
(function (MockEnum) {
    MockEnum["CLEAR"] = "CLEAR";
    MockEnum["CONSIDER"] = "CONSIDER";
})(MockEnum || (MockEnum = {}));
describe('isValidEnum', () => {
    test('returns true for valid enum values', () => {
        expect((0, validation_util_1.isValidEnum)('CLEAR', MockEnum)).toBe(true);
        expect((0, validation_util_1.isValidEnum)('CONSIDER', MockEnum)).toBe(true);
    });
    test('returns false for invalid enum values', () => {
        expect((0, validation_util_1.isValidEnum)('value4', MockEnum)).toBe(false);
        expect((0, validation_util_1.isValidEnum)('value', MockEnum)).toBe(false);
        expect((0, validation_util_1.isValidEnum)('', MockEnum)).toBe(false);
    });
    test('returns false for null or undefined values', () => {
        expect((0, validation_util_1.isValidEnum)(null, MockEnum)).toBe(false);
        expect((0, validation_util_1.isValidEnum)(undefined, MockEnum)).toBe(false);
    });
    test('returns false for values of different types', () => {
        expect((0, validation_util_1.isValidEnum)(1, MockEnum)).toBe(false);
        expect((0, validation_util_1.isValidEnum)({}, MockEnum)).toBe(false);
        expect((0, validation_util_1.isValidEnum)([], MockEnum)).toBe(false);
    });
    test('returns false if enumStore is empty', () => {
        expect((0, validation_util_1.isValidEnum)('CLEAR', {})).toBe(false);
    });
});
