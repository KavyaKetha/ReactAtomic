import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    timestamps: false,
    tableName: "book",
})
export class Book extends Model {

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
        type: DataType.INTEGER,
        allowNull: false,
    })
    price!: number;

}
