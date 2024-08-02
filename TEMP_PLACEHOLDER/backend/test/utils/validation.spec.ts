import { isValidEnum } from '../../src/utils/validation.util';

enum MockEnum {
    CLEAR = 'CLEAR',
    CONSIDER = 'CONSIDER',
}

describe('isValidEnum', () => {
    test('returns true for valid enum values', () => {
        expect(isValidEnum('CLEAR', MockEnum)).toBe(true);
        expect(isValidEnum('CONSIDER', MockEnum)).toBe(true);
    });

    test('returns false for invalid enum values', () => {
        expect(isValidEnum('value4', MockEnum)).toBe(false);
        expect(isValidEnum('value', MockEnum)).toBe(false);
        expect(isValidEnum('', MockEnum)).toBe(false);
    });

    test('returns false for null or undefined values', () => {
        expect(isValidEnum(null, MockEnum)).toBe(false);
        expect(isValidEnum(undefined, MockEnum)).toBe(false);
    });

    test('returns false for values of different types', () => {
        expect(isValidEnum(1, MockEnum)).toBe(false);
        expect(isValidEnum({}, MockEnum)).toBe(false);
        expect(isValidEnum([], MockEnum)).toBe(false);
    });

    test('returns false if enumStore is empty', () => {
        expect(isValidEnum('CLEAR', {})).toBe(false);
    });
});
