import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Batch extends Model {
  public id!: number;
  public serialNumber!: string;
  public quantity!: number;
    Product: any;
}

Batch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "batches",
    timestamps: false,
  }
);

export default Batch;