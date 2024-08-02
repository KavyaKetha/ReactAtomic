import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { CandidateCourtSearch } from "./CandidateCourtSearch.model";

@Table({
    timestamps: false,
    tableName: "court_search",
})
export class CourtSearch extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    id!: number;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @HasMany(() => CandidateCourtSearch)
    courtSearches!: CandidateCourtSearch[];

}