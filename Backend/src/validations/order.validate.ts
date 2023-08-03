import Joi from "joi";
import { IOrderBody } from "../types/order.type";

export const orderSchema = (payload: IOrderBody) => {
  return Joi.object({
    user_id: Joi.number().required(),
    food_id: Joi.number().required(),
    process: Joi.string(),
  }).validate(payload);
};