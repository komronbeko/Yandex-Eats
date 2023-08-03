import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Restourant extends Model {
  id!: number;
  name!: string;
  owner!: string;
  business_hours!: string;
  email!: string;
  password!: string;
  role!: string;
  contact_number!: string;
  card_details!: object;
  longitude!: number;
  latitude!: number;
  founded_at!: number;
  is_verified!: boolean;
  created_at!: Date;
  updated_at!: Date;
}

Restourant.init(
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
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_hours: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'restaurant_admin',
    },
    card_details: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    founded_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "restourants",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Restourant;
