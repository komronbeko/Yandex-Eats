import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Courier extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone_number!: string;
  public role!: "courier";
  public created_at!: Date;
  public updated_at!: Date;
}

Courier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'courier',
    },
  },
  {
    tableName: "couriers",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Courier;
