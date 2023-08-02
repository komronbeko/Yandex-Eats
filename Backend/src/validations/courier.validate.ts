import Joi from "joi";
import { ICourierBody } from "../types/courier.type";

export const courierSchema = (payload: ICourierBody) => {
  return Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone_number: Joi.string()
      .regex(/^\+998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
      .required(),
    restaurant_id: Joi.number()
  }).validate(payload);
};
