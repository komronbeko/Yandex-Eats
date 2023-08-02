"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = void 0;
const Food_1 = __importDefault(require("./Food"));
const Restourant_1 = __importDefault(require("./Restourant"));
const relations = () => {
    Restourant_1.default.hasMany(Food_1.default, {
        foreignKey: {
            name: "restourant_id",
            allowNull: false
        }
    });
    Food_1.default.belongsTo(Restourant_1.default, {
        foreignKey: {
            name: "restourant_id",
            allowNull: false
        }
    });
};
exports.relations = relations;
