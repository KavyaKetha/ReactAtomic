import { getAllCandidates, getCandidateDetails, addAdverseAction, getAdverseActionCandidates } from '../../src/services/candidate.service';
import * as candidateDao from "../../src/dao/candidate.dao";

import { NotFoundException } from '../../src/middlewares/errorMiddleware';
import { Candidate } from "../../src/interfaces/candidate";

jest.mock('../../src/dao/candidate.dao');
jest.mock('../../src/models/Candidate.model');
jest.mock('../../src/models/AdverseAction.model');

describe('Candidate Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getAllCandidates', () => {

        it('should return candidates', async () => {
            const page = 1;
            const pageSize = 10;
            const optionalFilters = {};
            const offset = 0;
            const mockCandidates: Array<Candidate> = [{
                id: 1, name: 'John', status: "CONSIDER",
                adjudication: null,
                location: "FTEST1111 (CA)",
                createdAt: new Date()
            }, {
                id: 2, name: 'Jane', status: "CLEAR",
                adjudication: "ADVERSE ACTION",
                location: "FTEST2222 (CA)",
                createdAt: new Date()
            }];
            const mockResponse = { "data": mockCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 2 };

            (candidateDao.getAllCandidates as jest.Mock).mockResolvedValue({ rows: mockCandidates, count: 2 });

            const result = await getAllCandidates(page, pageSize, optionalFilters);

            expect(candidateDao.getAllCandidates).toHaveBeenCalledWith(pageSize, optionalFilters, offset);
            expect(result).toEqual(mockResponse);
        });

        it('should throw NotFoundException if no candidates found', async () => {
            const page = 1;
            const pageSize = 10;
            const optionalFilters = { 'name': 'a' };
            (candidateDao.getAllCandidates as jest.Mock).mockResolvedValue({ count: 0, rows: [] });

            await expect(getAllCandidates(page, pageSize, optionalFilters)).rejects.toThrow(NotFoundException);
        });

    });

    describe('getCandidateDetails', () => {
        it('should return candidate details', async () => {
            const id = 1;
            const mockCandidateDetails = {
                id: id,
                email: 'test@example.com',
                package: "Employee pro",
                licenseNo: "FTEST1111 (CA)",
                ssn: '987656789',
                zipcode: '94158',
                phone: "555555555",
                dob: "1990-09-10",
                completedDate: "2018-03-20T09:12:28.000Z",
                turnAroundTime: "1 Day , 2 hours"
            };
            (candidateDao.getCandidateDetails as jest.Mock).mockResolvedValue(mockCandidateDetails);

            const result = await getCandidateDetails(id);
            expect(candidateDao.getCandidateDetails).toHaveBeenCalledWith(id);

            expect(result).toEqual(mockCandidateDetails);
        });

        it('should throw NotFoundException if candidate details not found', async () => {
            const id = 1;
            (candidateDao.getCandidateDetails as jest.Mock).mockResolvedValue(null);

            await expect(getCandidateDetails(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('addAdverseAction', () => {
        it('should add adverse action and return result', async () => {
            const id = 1;
            const mockAdverseAction = {
                "id": 1, 
                "name": 'John',
                "preNotice": "2024-06-24T10:19:39.714Z",
                "candidateId": 1,
                "status": "SCHEDULED",
                "postNotice": "2024-07-01T10:19:39.713Z"
            };
            const mockCandidateDetails = {
                id: id,
                email: 'test@example.com',
                package: "Employee pro",
                licenseNo: "FTEST1111 (CA)",
                ssn: '987656789',
                zipcode: '94158',
                phone: "555555555",
                dob: "1990-09-10",
                completedDate: "2018-03-20T09:12:28.000Z",
                turnAroundTime: "1 Day , 2 hours"
            };
            (candidateDao.getCandidateDetails as jest.Mock).mockResolvedValue(mockCandidateDetails);

            (candidateDao.addAdverseAction as jest.Mock).mockResolvedValue(mockAdverseAction);

            const result = await addAdverseAction(id);

            expect(candidateDao.addAdverseAction).toHaveBeenCalledWith(id);
            expect(result).toEqual(mockAdverseAction);
        });
        it('should throw NotFoundException if candidate not found', async () => {
            const id = 1;
                        
            (candidateDao.getCandidateDetails as jest.Mock).mockResolvedValue(null);

            await expect(addAdverseAction(id)).rejects.toThrow(NotFoundException);
            expect(candidateDao.getCandidateDetails).toHaveBeenCalledWith(id);

        });
    });

    describe('getAdverseActionCandidates', () => {
        it('should return adverse action candidates', async () => {
            const page = 1;
            const pageSize = 10;
            const optionalFilters = { name: 'Test' };
            const statusFilters = { status: 'All' };
            const offsetV = 0;
            const mockAdverseActionCandidates = [{
                "id": 3,
                "name": "Walsh",
                "status": "SCHEDULED",
                "pre_notice": "2018-03-20T00:00:00.000Z",
                "post_notice": "2018-03-28T00:00:00.000Z"
            },
            {
                "id": 1,
                "name": "John Smith",
                "status": "SCHEDULED",
                "pre_notice": "2024-06-24T10:19:39.000Z",
                "post_notice": "2024-07-01T10:19:39.000Z"
            }];
            const mockResponse = { "data": mockAdverseActionCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 2 };

            (candidateDao.getAdverseActionCandidates as jest.Mock).mockResolvedValue({ rows: mockAdverseActionCandidates, count: 2 });

            const result = await getAdverseActionCandidates(page, pageSize, optionalFilters, statusFilters);

            expect(candidateDao.getAdverseActionCandidates).toHaveBeenCalledWith(pageSize, optionalFilters, statusFilters, offsetV);
            expect(result).toEqual(mockResponse);
        });

        it('should throw NotFoundException if no adverse action candidates found', async () => {
            const page = 1;
            const pageSize = 10;
            const optionalFilters = { name: 'Test' };
            const statusFilters = { status: 'All' };
            (candidateDao.getAdverseActionCandidates as jest.Mock).mockResolvedValue({ rows: [], count: 0 });

            await expect(getAdverseActionCandidates(page, pageSize, optionalFilters, statusFilters)).rejects.toThrow(NotFoundException);
        });

    });

});