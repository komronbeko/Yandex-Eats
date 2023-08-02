import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import User from "../../models/User";
import { CustomError } from "../../types/custom-error";
import { IUserRegister } from "../../types/user.type";
import { editAccountSchema, registerSchema } from "../../validations/user.validate";
import { sign } from "../../utils/jwt";



//--------SUPERADMIN CAN ADD NEW ADMINS--------------------------------


//--------SUPERADMIN CAN EDIT ONLY ADMINS ACCOUNT--------------------------------

export const editAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    //CHECKING IF ID IS ADMIN'S ID
    const findUser = await User.findOne({ where: { id } });

    if (findUser?.dataValues.role != "admin")
      throw new CustomError("Superadmin can only edit admin's account!", 403);

    const { name, email, password, phone_number } = req.body as IUserRegister;

    //VALIDATION
    const { error } = editAccountSchema({ name, email, password, phone_number });
    if (error) throw new CustomError(error.message, 400);

    //EDITING
    await User.update(
      { name, email, password, phone_number },
      {
        where: {
          id,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};



//--------ONLY SUPERADMIN CAN GET ALL ADMINS--------------------------------

export const admins: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admins = await User.findAll({
      where: {
        role: "admin",
      },
    });
    res.json(admins);
  } catch (error) {
    next(error);
  }
};
