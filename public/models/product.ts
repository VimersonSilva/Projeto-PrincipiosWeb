import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

export class Product extends Model {
    id!: number;
    name!: string;
    price!: number;
    stock!: number;
}
Product.init(
    {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    price: {
    type: DataTypes.NUMBER,
    allowNull: false,
    },
    },
    {
    sequelize,
    tableName: "products",
    timestamps: false,
    }
   );