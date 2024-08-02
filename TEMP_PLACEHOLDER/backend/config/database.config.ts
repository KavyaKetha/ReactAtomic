import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

import { CourtSearch, Candidate, CandidateCourtSearch, AdverseAction, User, Book } from "../src/models";
import { populateTableData } from '../src/dao/loadMasterData.dao';

const sequelize = new Sequelize({
    database: 'checkr',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    storage: ':memory:',
    models: [CourtSearch, Candidate, CandidateCourtSearch, AdverseAction, User, Book],
});

export const dbConnection = () => {
    (async () => {
        await sequelize.sync({ force: true })
        populateTableData();

    })()
}