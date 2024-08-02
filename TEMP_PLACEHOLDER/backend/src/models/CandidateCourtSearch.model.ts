import { Table, Model, Column, DataType, ForeignKey ,BelongsTo} from "sequelize-typescript";
import { Candidate } from "./Candidate.model";
import { CourtSearch } from "./CourtSearch.model";

@Table({
  timestamps: false,
  tableName: "candidate_court_search",
})
export class CandidateCourtSearch extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        unique:true
    })
    id!: number;
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field:"search_date"
    })
    searchDate!: Date;
    
    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values:['CLEAR','CONSIDER']
    })
    status!: string;

    @ForeignKey(() => Candidate)
    @Column({field:"candidate_id"})
    candidateId!: number;
    @BelongsTo(() => Candidate)
    candidate!: Candidate;

    @ForeignKey(() => CourtSearch)
    @Column({field:"court_search_id"})
    courtSearchId!: number;
    @BelongsTo(() => CourtSearch)
    courtSearch!: CourtSearch;
}
