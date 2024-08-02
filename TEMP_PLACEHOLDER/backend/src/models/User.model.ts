import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    timestamps: false,
    tableName: "user",
})
export class User extends Model {

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
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    token!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        values: ['ADMIN', 'STUDENT']
    })
    role!: string;
}