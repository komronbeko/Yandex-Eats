import Foods from "./Food";
import Restourants from "./Restourant";


export const relations = () => {
  Restourants.hasMany(Foods, {
    foreignKey: {
        name: "restourant_id", 
        allowNull: false
    }
  });
  Foods.belongsTo(Restourants, {
    foreignKey: {
        name: "restourant_id",
        allowNull: false
    }
  });
};
