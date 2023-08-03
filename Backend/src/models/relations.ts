import Foods from "./Food";
import Rating from "./Rating";
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

  Restourants.hasMany(Rating, {
    foreignKey: {
      name: "restaurant_id",
      allowNull: false,
    },
  });
  Rating.belongsTo(Restourants, {
    foreignKey: {
      name: "restaurant_id",
      allowNull: false,
    },
  });

  Users.hasMany(Rating, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
    },
  });
  Rating.belongsTo(Users, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
    },
  });

  Restourants.hasMany(RestaurantCouriers);
  RestaurantCouriers.belongsTo(Restourants);
  Users.hasMany(RestaurantCouriers);
  RestaurantCouriers.belongsTo(Users);
};