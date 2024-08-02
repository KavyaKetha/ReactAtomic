import app from '../app';
import request from 'supertest';
import { dbConnection } from '../config/database.config';

jest.mock('../config/database.config');
describe('App', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });    
    
    (dbConnection as jest.Mock).mockResolvedValue(null);

    it('should return a 404 error for unmatched paths', async () => {
    const response = await request(app).get('/unmatched-path');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('API Not found');
  });

  it('should return a 200 status for the root path', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});