import Joi from "joi";
import { IUserLogin, IUserRegister } from "../types/user.type";

export const registerSchema = (payload: IUserRegister) => {
  return Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone_number: Joi.string()
      .regex(/^\+998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
      .required(),
  }).validate(payload);
};

export const loginSchema = (payload: IUserLogin) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(payload);
};
