import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
// Defina os atributos do modelo
//interface UserAttributes {
// id: number;
// name: string;
// email: string;
// password: string;
//}
//export class User extends Model<UserAttributes> implements
//UserAttributes {
// public id!: number;
// public name!: string;
// public email!: string;
// public password!: string;
//
//}

export class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    //public batchId!: number;
  }
User.init(
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
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    },
    {
    sequelize,
    tableName: "users",
    timestamps: false,
    }
   );