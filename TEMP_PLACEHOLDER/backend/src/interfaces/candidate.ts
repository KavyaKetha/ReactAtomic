import { CandidateCourtSearch } from "../models"

export interface Candidate {
    id: number,
    name: string,
    status: string,
    adjudication: string|null,
    location: string,
    createdAt: Date
}
export interface CandidateDetails extends Candidate {
    email: string,
    package: string,
    licenseNo: string,
    ssn: number,
    zipcode: number,
    phone: number,
    dob: Date,
    completedDate: Date,
    turnAroundTime: string,
    courtSearches: Array<CandidateCourtSearch>
}