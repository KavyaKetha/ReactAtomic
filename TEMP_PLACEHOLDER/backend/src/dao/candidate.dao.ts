import { Candidate, CandidateCourtSearch, AdverseAction, CourtSearch } from "../models";

export const getAllCandidates = async (pageSize: number, optionalFilters: any, offsetV: number): Promise<{ rows: Candidate[], count: number }> => {

    let result = await Candidate.findAndCountAll({
        where: {
            ...optionalFilters,
        },
        attributes: ['id', 'name', 'status', 'adjudication', 'location', 'createdAt'],
        offset: offsetV,
        limit: pageSize,
        raw: false
    });
    return result;
}

export const getCandidateDetails = async (id: number): Promise<any> => {
    let result = await Candidate.findOne({
        where: { id: id },
        include: [{
            model: AdverseAction,
            // required: true,
            attributes: [],
        }],
        raw: false
    });
    if (result)
        return result.get({ plain: true });
    else
        return result;
}


export const addAdverseAction = async (id: number): Promise<AdverseAction> => {
    let postDate = new Date();
    // Add 7 days to current date
    postDate.setDate(postDate.getDate() + 7);


    let result = await AdverseAction.create({
        candidateId: id,
        status: 'SCHEDULED',
        postNotice: postDate
    }, { raw: false })

    await Candidate.update(
        { adjudication: 'ADVERSE ACTION' },
        {
            where: {
                id: id,
            },
        })

    return result.get({ plain: true });

}

export const getCandidateCourtSearches = async (id: number): Promise<any> => {
    let results = await CandidateCourtSearch.findAll({
        where: { candidateId: id },
        attributes: ['status', 'searchDate', 'courtSearch.name'],
        include: [{
            model: CourtSearch,
            required: true,
            attributes: ['name'],
        }],
        raw: false
    });
    return results.map((result) => {
        let mappedObj: any = result.get({ plain: true });
        mappedObj['name'] = result.courtSearch.name;
        delete mappedObj['courtSearch'];
        return mappedObj;
    });

}

export const getAdverseActionCandidates = async (pageSize: number, optionalFilters: any, statusFilters: any, offsetV: number): Promise<{ rows: Candidate[], count: number }> => {
    const result = await Candidate.findAndCountAll({
        where: {
            ...optionalFilters,
        },
        attributes: ['id', 'name', 'adverseAction.status', 'adverseAction.pre_notice', 'adverseAction.post_notice'],
        include: [{
            where: statusFilters,
            model: AdverseAction,
            required: true,
        }],
        offset: offsetV,
        limit: pageSize,
        raw: false
    });

    return {
        count: result.count,
        rows: result.rows.map((candidate) => {
            let mappedObj: any = candidate.get({ plain: true });
            mappedObj['preNotice'] = candidate.adverseAction.preNotice;
            mappedObj['postNotice'] = candidate.adverseAction.postNotice;
            mappedObj['status'] = candidate.adverseAction.status;
            delete mappedObj['adverseAction'];
            return mappedObj;
        })
    };
}