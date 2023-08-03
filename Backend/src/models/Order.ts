import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Order extends Model {
  id!: number;
  food_name!: string;
  price!: number;
  total!: number;
  count!: number;
  food_id!: number;
  user_id!: number;
  process!: "ongoing" | "accedpted" | "failed";
  status!: "unpaid" | "paid" | "ready" | "on_hand" | "accedpted"
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    process: {
      type: DataTypes.ENUM("ongoing", "accepted", "failed"),
      allowNull: false,
      defaultValue: "ongoing",
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    food_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("unpaid", "paid", "ready", "on_hand", "accedpted"),
        allowNull: false,
        defaultValue: "unpaid"
      },
  },
  {
    tableName: "orders",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Order;
