import { Batch } from './batch';
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public batchId!: number;
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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    batchId: {
      type: DataTypes.INTEGER,
      references: {
        model: Batch, // Relacionamento com Batch
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
  }
);

// Definição da relação entre Produto e Lote
Batch.hasMany(Product, { foreignKey: "batchId", as: "products" });
Product.belongsTo(Batch, { foreignKey: "batchId", as: "batch" });

export default Product;
