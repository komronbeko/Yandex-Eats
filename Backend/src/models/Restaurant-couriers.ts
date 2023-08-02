import { sequelize } from "../../config/db/connections";
import {Sequelize, DataTypes, Model} from "sequelize";

class RestaurantCouriers extends Model {
  public id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

RestaurantCouriers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "restaurant_couriers",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default RestaurantCouriers;
