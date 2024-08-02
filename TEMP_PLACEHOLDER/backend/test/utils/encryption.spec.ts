import { encrypt, decrypt } from '../../src/utils/encryption.util';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');
describe('Password Utilities', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const password = 'mypassword';
    let hashedPassword: string;

    it('should hash a password', async () => {

        (bcrypt.genSalt as jest.Mock).mockReturnValue('salt');
        (bcrypt.hash as jest.Mock).mockReturnValue('hashedPassword');
        hashedPassword = await encrypt(password);
        const salt = expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).not.toHaveBeenCalledWith(password, salt);
        expect(hashedPassword).not.toBe(password);

    });

    it('should compare the password with the hashed password and return true', async () => {
        (bcrypt.compare as jest.Mock).mockReturnValue(true);
        const isMatch = await decrypt(password, hashedPassword);
        expect(isMatch).toBe(true);
    });

    it('should compare the password with a different hashed password and return false', async () => {
        (bcrypt.compare as jest.Mock).mockReturnValue(false);
        const isMatch = await decrypt('wrongpassword', hashedPassword);
        expect(isMatch).toBe(false);
    });

    it('should throw an error when hashing fails', async () => {
        jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => {
            throw new Error('Mocked error');
        });
        await expect(encrypt(password)).rejects.toThrow('Error hashing password');
    });

    it('should throw an error when comparing fails', async () => {
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            throw new Error('Mocked error');
        });
        await expect(decrypt(password, hashedPassword)).rejects.toThrow('Error comparing password');
    });
});
