import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Restourant extends Model {
 id!: number;
 name!: string;
 owner!: string;
 business_hours!: string;
 email!: string;
 contact_number!: string;
 card_detailts!: object;
 longitude!: string;
 latitude!: string;
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
    card_detailts: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    founded_at: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
