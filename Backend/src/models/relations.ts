import Foods from "./Food";
import RestaurantCouriers from "./Restaurant-couriers";
import Restourants from "./Restourant";
import Users from "./User";

export const relations = () => {
  Restourants.hasMany(Foods, {
    foreignKey: {
      name: "restourant_id",
      allowNull: false,
    },
  });
  Foods.belongsTo(Restourants, {
    foreignKey: {
      name: "restourant_id",
      allowNull: false,
    },
  });

  Restourants.hasMany(RestaurantCouriers);
  RestaurantCouriers.belongsTo(Restourants);
  Users.hasMany(RestaurantCouriers);
  RestaurantCouriers.belongsTo(Users);
};
