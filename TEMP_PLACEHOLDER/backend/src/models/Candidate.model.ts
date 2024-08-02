import { Table, Model, Column, DataType, HasMany, HasOne, CreatedAt, UpdatedAt } from "sequelize-typescript";
import { CandidateCourtSearch } from "./CandidateCourtSearch.model";
import { AdverseAction } from "./AdverseAction.model";

@Table({
    timestamps: false,
    tableName: "candidate",
})
export class Candidate extends Model {

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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    package!: string;

    @Column({
        type: DataType.ENUM,
        allowNull: true,
        values: ['CLEAR', 'CONSIDER']
    })
    status!: string;

    @Column({
        type: DataType.ENUM,
        allowNull: true,
        values: ['ADVERSE ACTION', 'ENGAGE']
    })
    adjudication!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "license_no"
    })
    licenseNo!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location!: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    ssn!: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    zipcode!: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    phone!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dob!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "completed_at"
    })
    completedDate!: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "turn_around_time"
    })
    turnAroundTime!: string;

    @CreatedAt
    @Column({
        field: 'created_at',
        defaultValue: DataType.NOW
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        field: 'updated_at',
        defaultValue: DataType.NOW
    })
    updatedAt!: Date;

    @HasMany(() => CandidateCourtSearch)
    courtSearches!: CandidateCourtSearch[];

    @HasOne(() => AdverseAction)
    adverseAction!: AdverseAction;
}
