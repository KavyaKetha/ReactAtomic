import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Candidate } from "./Candidate.model";

@Table({
    timestamps: false,
    tableName: "adverse_action",
})
export class AdverseAction extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    id!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "pre_notice",
        defaultValue: DataType.NOW,
    })
    preNotice!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "post_notice"
    })
    postNotice!: Date;
    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values: ['SCHEDULED', 'DISPUTE', 'UNDELIVERED', 'PENDING']
    })
    status!: string;

    @ForeignKey(() => Candidate)
    @Column({ field: "candidate_id" })
    candidateId!: number;

    @BelongsTo(() => Candidate)
    candidate!: Candidate;


}
