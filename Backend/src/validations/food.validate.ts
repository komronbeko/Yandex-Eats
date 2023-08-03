import Joi from "joi";
import { IFoodBody } from "../types/food.type";

export const foodSchema = (payload: IFoodBody) => {
  return Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    weight: Joi.number().required(),
    restourant_id: Joi.number().required(),
  }).validate(payload);
};