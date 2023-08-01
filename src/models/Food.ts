import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Food extends Model {
 id!: number;
 name!: string;
 price!: number;
 weight!: number;
 restourant_id!: number;
 created_at!: Date;
 updated_at!: Date;
}

Food.init(
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
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restourant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "foods",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Food;
