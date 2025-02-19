import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import {User} from "./user";

export class Carrinho extends Model {
  public id!: number;
  public userId!: number;
}

Carrinho.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // Relacionamento com Usuário
        key: "id",
      },
      allowNull: false,
      unique: true, // Um usuário tem apenas um carrinho
    },
  },
  {
    sequelize,
    tableName: "carrinhos",
    timestamps: false,
  }
);

export default Carrinho;