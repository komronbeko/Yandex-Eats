import Joi from "joi";
import { IRestourantBody, IRestourantVerify } from "../types/restourant.type";

export const restourantSchema = (payload: IRestourantBody) => {
  return Joi.object({
    name: Joi.string().required(),
    owner: Joi.string().required(),
    business_hours: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    contact_number: Joi.string().required(),
    card_detailts: {
      card_number: Joi.number().required(),
      cvv: Joi.number().required(),
      expiration_date: Joi.string().required(),
    },
    longitude: Joi.string().required(),
    latitude: Joi.string().required(),
    founded_at: Joi.number().required(),
  }).validate(payload);
};

export const restaurantVerifySchema = (payload: IRestourantVerify) => {
  return Joi.object({
    restaurant_id: Joi.number().required(),
    is_verified: Joi.boolean().required(),
  }).validate(payload);
};
