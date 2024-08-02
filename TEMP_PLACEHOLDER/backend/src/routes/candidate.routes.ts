
import { Router } from 'express';
import * as candidateController from '../controllers/candidate.contoller'
import {
    validateGetAllCandidates, validateGetCandidateDetails,
    validateAddAdverseAction, validateGetAdverseActionCandidates
} from '../middlewares/schemaValidatorMiddleware';
const candidateRouter = Router();

candidateRouter.get('/', ...validateGetAllCandidates, candidateController.getAllCandidates);
candidateRouter.get('/adverse-actions', ...validateGetAdverseActionCandidates, candidateController.getAdverseActionCandidates);
candidateRouter.patch('/:candidateId/action', ...validateAddAdverseAction, candidateController.addAdverseAction);
candidateRouter.get('/:candidateId', ...validateGetCandidateDetails, candidateController.getCandidateDetails);


export default candidateRouter;
