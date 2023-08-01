import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone_number!: number;
  public role!: "admin" | "courier" | "user" | "superadmin";
  public created_at!: Date;
  public updated_at!: Date;
}

User.init(
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'courier', 'user', 'superadmin'),
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;
