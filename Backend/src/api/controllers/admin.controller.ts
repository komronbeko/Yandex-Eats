import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";

import Restourants from "../../models/Restourant";
import { CustomError } from "../../types/custom-error";
import { IRestourantVerify } from "../../types/restourant.type";
import { restaurantVerifySchema } from "../../validations/restourant.validate";
import { IUserRegister } from "../../types/user.type";
import { editAccountSchema, registerSchema } from "../../validations/user.validate";
import User from "../../models/User";
import { Op } from "sequelize";
import { sign } from "../../utils/jwt";

export const restaurantVerify: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { restaurant_id, is_verified } = req.body as IRestourantVerify;

    const {error} = restaurantVerifySchema({restaurant_id, is_verified});
    if(error) throw new CustomError(error.message, 400);

    const findRestourant = await Restourants.findOne({
      where: { id: restaurant_id },
    });

    if (!findRestourant) throw new CustomError("Restourant not found", 400);

    await Restourants.update(
      { is_verified: is_verified },
      { where: { id: findRestourant.dataValues.id } }
    );

    res.status(200).json({message: "success"})
  } catch (error) {
    next(error);
  }
};

export const postAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone_number } = req.body as IUserRegister;

    //VALIDATION
    const { error } = registerSchema({ name, email, password, phone_number });
    if (error) throw new CustomError(error.message, 400);

    //Finding an email and Hashing password
    const findUser = await User.findOne({
      where: { [Op.or]: [{ name }, { email }] },
    });
    if (findUser) throw new CustomError("User already exist!", 403);
    const hashedPassword = await bcrypt.hash(password, 12);

    //NEWUSER
    await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      role: "admin",
      is_verified: true,
    });

    // TOKEN
    const token = sign({ email });
    res.status(200).json({
      message: "New admin is successfully added!"
    });
  } catch (error) {
    next(error);
  }
};

