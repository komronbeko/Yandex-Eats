import Joi from "joi";
import { IRatingBody } from "../types/rating.type";

export const ratingSchema = (payload: IRatingBody) => {
  return Joi.object({
    stars: Joi.number().required(),
    restaurant_id: Joi.number().required(),
    user_id: Joi.number().required(),
  }).validate(payload);
};
