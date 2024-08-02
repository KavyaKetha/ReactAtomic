import { getAllCandidates, getCandidateDetails, addAdverseAction, getAdverseActionCandidates, checkValidation } from '../../src/controllers/candidate.contoller';
import { BadRequestException, NotFoundException } from '../../src/middlewares/errorMiddleware';
import * as candidateService from '../../src/services/candidate.service';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';


jest.mock('../../src/services/candidate.service');

jest.mock('express-validator', () => {
    const originalModule = jest.requireActual('express-validator');
    return {
        ...originalModule,
        validationResult: jest.fn(),
    };
});

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;
describe('Candidate Controller', () => {

    beforeEach(() => {
        req = {
            query: {},
            params: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });


    describe('getAllCandidates', () => {
        it('should return candidates when query parameters are provided', async () => {
            const mockCandidates = [
                {
                    id: 1,
                    name: 'John Doe',
                    status: 'CLEAR',
                    adjudication: 'ADVERSE ACTION',
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    status: 'CLEAR',
                    adjudication: null,
                },
            ];
            const mockResponse = { data: mockCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 2 };

            req = {
                query: {
                    pageNo: '1',
                    pageSize: '10'
                }
            };
            (candidateService.getAllCandidates as jest.Mock).mockResolvedValue(mockResponse);
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });

            await getAllCandidates(req as Request, res as Response, next);

            await expect(candidateService.getAllCandidates).toHaveBeenCalledWith(1, 10, {});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        it('should throw NotFoundException when candidates are not found', async () => {
            req = {
                query: {
                    page: '1',
                    pageSize: '10',
                    search: 'a'
                }
            };

            (candidateService.getAllCandidates as jest.Mock).mockRejectedValue(new NotFoundException("Candidates not found."));
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            await getAllCandidates(req as Request, res as Response, next);

            await expect(candidateService.getAllCandidates).rejects.toThrow(NotFoundException);
            expect(next).toHaveBeenCalledWith(new NotFoundException("Candidates not found."));
        });

        it('should pass optional filters to the service', async () => {
            const mockCandidates = [
                {
                    "id": 3,
                    "name": "Walsh",
                    "status": "CONSIDER",
                    "adjudication": "ADVERSE ACTION",
                    "location": "string",
                    "createdAt": "2024-06-25T10:56:52.000Z"
                }
            ];
            const mockResponse = { data: mockCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 1 }

            req = {
                query: {
                    page: '1',
                    pageSize: '10',
                    search: 'Walsh',
                    status: 'CONSIDER',
                    adjudication: 'ADVERSE ACTION'
                }
            };

            (candidateService.getAllCandidates as jest.Mock).mockResolvedValue(mockResponse);
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            await getAllCandidates(req as Request, res as Response, next);

            expect(candidateService.getAllCandidates).toHaveBeenCalledWith(1, 10, {
                name: 'Walsh',
                status: 'CONSIDER',
                adjudication: 'ADVERSE ACTION'
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });
        it('should throw an error if pageNo and pageSize are not numbers', async () => {
            req = {
                query: {
                    pageNo: 'a',
                    pageSize: 'b',
                }
            };

            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Page number must be a positive integer, Page size must be a positive integer' }],
            });
            await getAllCandidates(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new BadRequestException('Page number must be a positive integer, Page size must be a positive integer'));
        });
        it('should throw an error if invalid adjudication passed', async () => {
            req = {
                query: {
                    adjudication: 'ADVERSE action'
                }
            };
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Adjudication Status Passed' }],
            });
            await getAllCandidates(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(new BadRequestException("Invalid Adjudication Status Passed"));
        });
        it('should throw an error if invalid status passed', async () => {
            req = {
                query: {
                    status: 'active'
                }
            };
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Status Passed' }],
            });
            await getAllCandidates(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(new BadRequestException("Invalid Status Passed"));
        });
        it('should call next with BadRequestException if validation fails', async () => {
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid request' }],
            });

            await getAllCandidates(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new BadRequestException('Invalid request'));
        });

    });
    describe('getCandidateDetails', () => {
        it('should return 200 and candidate details for valid candidate ID', async () => {
            const mockCandidate = {
                "id": 1,
                "name": "John Smith",
                "email": "John.smith@checkr.com",
                "package": "Employee pro",
                "status": "CONSIDER",
                "adjudication": null,
                "licenseNo": "FTEST1111 (CA)",
                "location": "string",
                "ssn": 987656789,
                "zipcode": 94158,
                "phone": 555555555,
                "dob": "1990-09-10T00:00:00.000Z",
                "completedDate": "2018-03-20T09:12:28.000Z",
                "turnAroundTime": "1 Day , 2 hours",
                "createdAt": "2024-06-25T05:23:29.000Z",
                "updatedAt": "2024-06-25T05:23:29.000Z",
                "courtSearches": [
                    {
                        "status": "CLEAR",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "SSN Verification"
                    },
                    {
                        "status": "CLEAR",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "Sex Offender"
                    },
                    {
                        "status": "CONSIDER",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "Global Watchlist"
                    },
                    {
                        "status": "CLEAR",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "Federal Criminal"
                    },
                    {
                        "status": "CONSIDER",
                        "searchDate": "2018-03-20T00:00:00.000Z",
                        "name": "County Criminal"
                    }
                ]
            };
            (candidateService.getCandidateDetails as jest.Mock).mockResolvedValue(mockCandidate);
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            req = {
                params: {
                    candidateId: '1'
                }
            }

            await getCandidateDetails(req as Request, res as Response, next);

            expect(candidateService.getCandidateDetails).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockCandidate });
        });

        it('should return 400 for invalid candidate ID', async () => {

            req = {
                params: {
                    candidateId: 'abc'
                }
            };
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Candidate ID Passed' }],
            });

            await getCandidateDetails(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new BadRequestException("Invalid Candidate ID Passed"));
        });

        it('should call next with error when an exception is thrown', async () => {
            const error = new Error('Internal error');
            (candidateService.getCandidateDetails as jest.Mock).mockRejectedValue(error);
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Internal error' }],
            });
            req = {
                params: {
                    candidateId: '1'
                }
            };

            await getCandidateDetails(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
    describe('addAdverseAction', () => {
        it('should return 200 and update adverse action for valid candidate ID', async () => {
            req = {
                params: {
                    candidateId: '1'
                }
            }

            const mockResult = {
                "preNotice": "2024-06-25T10:05:55.065Z",
                "id": 3,
                "candidateId": 1,
                "status": "SCHEDULED",
                "postNotice": "2024-07-02T10:05:55.065Z"
            };
            (candidateService.addAdverseAction as jest.Mock).mockResolvedValue(mockResult);

            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            await addAdverseAction(req as Request, res as Response, next);

            expect(candidateService.addAdverseAction).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockResult, message: "Adverse Action Updated" });
        });
        it('should return 400 for invalid candidate ID', async () => {
            req = {
                params: {
                    candidateId: 'abc'
                }
            };
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Candidate ID Passed' }],
            });
            await addAdverseAction(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new BadRequestException("Invalid Candidate ID Passed"));
        });
    });
    describe('getAdverseActionCandidates', () => {
        it('should return 200 and adverse action candidates for valid query params', async () => {
            const mockCandidates = [{
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

            req = {
                query: {
                    page: '1',
                    pageSize: '10'
                }
            };
            const mockResponse = { data: mockCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 2 };

            (candidateService.getAdverseActionCandidates as jest.Mock).mockResolvedValue(mockResponse);
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            await getAdverseActionCandidates(req as Request, res as Response, next);

            expect(candidateService.getAdverseActionCandidates).toHaveBeenCalledWith(1, 10, {}, {});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        it('should apply optional and status filters', async () => {
            const mockCandidates = [{
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

            req = {
                query: {
                    page: '1',
                    pageSize: '10',
                    search: 'Jane',
                    status: 'SCHEDULED'
                }
            };
            const mockResponse = { data: mockCandidates, "offset": 0, "pageNo": 1, "pageSize": 10, "totalCount": 2 };

            (candidateService.getAdverseActionCandidates as jest.Mock).mockResolvedValue(mockResponse);
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            await getAdverseActionCandidates(req as Request, res as Response, next);

            expect(candidateService.getAdverseActionCandidates).toHaveBeenCalledWith(1, 10, { name: 'Jane' }, { status: 'SCHEDULED' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);

        });

        it('should call next with error when an exception is thrown', async () => {
            const error = new Error('Internal error');
            (candidateService.getAdverseActionCandidates as jest.Mock).mockRejectedValue(error);

            req = {
                query: {
                    page: '1',
                    pageSize: '10'
                }
            };

            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Internal error' }],
            });
            await getAdverseActionCandidates(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
        it('should throw an error if pageNo and pageSize are not numbers', async () => {
            req = {
                query: {
                    pageNo: 'a',
                    pageSize: 'b',
                }
            };
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Page number must be a positive integer, Page size must be a positive integer' }],
            });
            await getAdverseActionCandidates(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(new BadRequestException("Page number must be a positive integer, Page size must be a positive integer"));
        });
        it('should throw an error if invalid status passed', async () => {
            req = {
                query: {
                    status: 'active'
                }
            };
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Invalid Status Passed' }],
            });
            await getAdverseActionCandidates(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(new BadRequestException("Invalid Status Passed"));
        });
    });
})