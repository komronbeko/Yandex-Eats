import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Rating extends Model {
 id!: number;
 stars!: number;
 user_id!: number;
 restaurant_id!: number;
 created_at!: Date;
 updated_at!: Date;
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "ratings",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Rating;
