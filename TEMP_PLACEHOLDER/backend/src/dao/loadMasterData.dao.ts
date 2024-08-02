import { CourtSearch, Candidate, CandidateCourtSearch, AdverseAction, User, Book } from "../models";

const courtSearchData = [
    { name: 'SSN Verification' },
    { name: 'Sex Offender' },
    { name: 'Global Watchlist' },
    { name: 'Federal Criminal' },
    { name: 'County Criminal' }
];
const candidateData = [
    {
        name: "John Smith",
        email: "John.smith@checkr.com",
        package: "Employee pro",
        status: "CONSIDER",
        adjudication: null,
        licenseNo: "FTEST1111 (CA)",
        location: "string",
        ssn: '987656789',
        zipcode: '94158',
        phone: "555555555",
        dob: "1990-09-10",
        completedDate: "2018-03-20T09:12:28.000Z",
        turnAroundTime: "1 Day , 2 hours"
    },
    {
        name: "Serene",
        email: "serene@checkr.com",
        package: "",
        status: "CLEAR",
        adjudication: null,
        licenseNo: "FTEST2222 (CA)",
        location: "string",
        ssn: '987656798',
        zipcode: '94158',
        phone: "6666666666",
        dob: "1980-05-01",
        completedDate: "2018-02-20T09:12:28.000Z",
        turnAroundTime: "1 Day , 14 hours"

    },
    {
        name: "Walsh",
        email: "Walsh@checkr.com",
        package: "EMPLOYEE",
        status: "CONSIDER",
        adjudication: "ADVERSE ACTION",
        licenseNo: "FTEST3333 (CA)",
        location: "string",
        ssn: '987656712',
        zipcode: '94158',
        phone: "7777777777",
        dob: "1970-05-01",
        completedDate: "2018-02-20T09:12:28.000Z",
        turnAroundTime: "1 Day , 16 hours"
    }, {
        name: "John Smith",
        email: "John.smith@checkr.com",
        package: "Employee pro",
        status: "CONSIDER",
        adjudication: null,
        licenseNo: "FTEST1111 (CA)",
        location: "string",
        ssn: '987656789',
        zipcode: '94158',
        phone: "555555555",
        dob: "1990-09-10",
        completedDate: "2018-03-20T09:12:28.000Z",
        turnAroundTime: "1 Day , 2 hours"
    }, {
        name: "John Smith",
        email: "John.smith@checkr.com",
        package: "Employee pro",
        status: "CONSIDER",
        adjudication: null,
        licenseNo: "FTEST1111 (CA)",
        location: "string",
        ssn: '987656789',
        zipcode: '94158',
        phone: "555555555",
        dob: "1990-09-10",
        completedDate: "2018-03-20T09:12:28.000Z",
        turnAroundTime: "1 Day , 2 hours"
    }, {
        name: "John Smith",
        email: "John.smith@checkr.com",
        package: "Employee pro",
        status: "CONSIDER",
        adjudication: null,
        licenseNo: "FTEST1111 (CA)",
        location: "string",
        ssn: '987656789',
        zipcode: '94158',
        phone: "555555555",
        dob: "1990-09-10",
        completedDate: "2018-03-20T09:12:28.000Z",
        turnAroundTime: "1 Day , 2 hours"
    }, {
        name: "John Smith",
        email: "John.smith@checkr.com",
        package: "Employee pro",
        status: "CONSIDER",
        adjudication: null,
        licenseNo: "FTEST1111 (CA)",
        location: "string",
        ssn: '987656789',
        zipcode: '94158',
        phone: "555555555",
        dob: "1990-09-10",
        completedDate: "2018-03-20T09:12:28.000Z",
        turnAroundTime: "1 Day , 2 hours"
    }, {
        name: "John Smith",
        email: "John.smith@checkr.com",
        package: "Employee pro",
        status: "CONSIDER",
        adjudication: null,
        licenseNo: "FTEST1111 (CA)",
        location: "string",
        ssn: '987656789',
        zipcode: '94158',
        phone: "555555555",
        dob: "1990-09-10",
        completedDate: "2018-03-20T09:12:28.000Z",
        turnAroundTime: "1 Day , 2 hours"
    },
];
const candidateCourtSearchData = [
    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 1,
        courtSearchId: 1
    },
    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 1,
        courtSearchId: 2
    },

    {
        searchDate: "2018-03-20",
        status: "CONSIDER",
        candidateId: 1,
        courtSearchId: 3
    },

    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 1,
        courtSearchId: 4
    },

    {
        searchDate: "2018-03-20",
        status: "CONSIDER",
        candidateId: 1,
        courtSearchId: 5
    },

    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 1
    },
    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 2
    },

    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 3
    },

    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 4
    },

    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 2,
        courtSearchId: 5
    },
    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 3,
        courtSearchId: 1
    },
    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 3,
        courtSearchId: 2
    },

    {
        searchDate: "2018-03-20",
        status: "CONSIDER",
        candidateId: 3,
        courtSearchId: 3
    },

    {
        searchDate: "2018-03-20",
        status: "CLEAR",
        candidateId: 3,
        courtSearchId: 4
    },

    {
        searchDate: "2018-03-20",
        status: "CONSIDER",
        candidateId: 3,
        courtSearchId: 5
    }
];
const adverseActionData = [
    {
        preNotice: "2018-03-20",
        postNotice: "2018-03-28",
        status: "SCHEDULED",
        candidateId: 3
    }
];

const userBookData = [
    { name: 'Core Concepts', price: 100 },
    { name: 'Advanced Concepts', price: 200 }
];
const userData = [
    { email: 'Jane', role: 'ADMIN',password:'$2b$10$1IJlfmou55LGicZp8tk5buVqAmzfo7cSEj7A2jhil/TfTg4n62rjq' },
    { email: 'Joe', role: 'STUDENT',password:'$2b$10$1IJlfmou55LGicZp8tk5buVqAmzfo7cSEj7A2jhil/TfTg4n62rjq' },
];
/* Insert data into the tables */
export const populateTableData = async () => {
    await CourtSearch.bulkCreate(courtSearchData, { validate: true });
    await Candidate.bulkCreate(candidateData, { validate: true });
    await CandidateCourtSearch.bulkCreate(candidateCourtSearchData, { validate: true });
    await AdverseAction.bulkCreate(adverseActionData, { validate: true });
    await User.bulkCreate(userData, { validate: true });
    await Book.bulkCreate(userBookData, { validate: true });
}
