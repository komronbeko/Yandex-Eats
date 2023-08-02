import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { Op } from "sequelize";
import User from "../../models/User";
import { CustomError } from "../../types/custom-error";
import { IUserRegister } from "../../types/user.type";
import { editAccountSchema, registerSchema } from "../../validations/user.validate";
import { sign } from "../../utils/jwt";

interface IUserRequest extends Request {
  verifiedUser: any;
}

//--------SUPERADMIN CAN ADD NEW ADMINS--------------------------------

export const addAdmin: RequestHandler = async (
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
      message: "New admin is successfully added!",
      token,
      role: "admin",
    });
  } catch (error) {
    next(error);
  }
};

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

//--------SUPERADMIN CAN DELETE ANYONE, ADMIN CAN DELETE ANYONE EXCEPT ADMINS)--------------------------------

export const deleteAnyone: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedUser = (req as IUserRequest).verifiedUser;

    const { id } = req.params;

    const findUser = await User.findOne({ where: { id } });
    //ADMIN CAN DELETE ANYONE EXCEPT ADMINS
    if (verifiedUser.role === "admin" && findUser?.dataValues.role === "admin")
      throw new CustomError("Admin can be deleted only by superadmin", 403);

    await User.destroy({
      where: { id },
    });

    res.status(200).json({
      message: `${findUser?.dataValues.name}(${findUser?.dataValues.role}) deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

//--------SUPERADMIN AND ADMINS CAN GET ALL USERS--------------------------------

export const users: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findAll({
      where: {
        role: "user",
      },
    });
    res.json(users);
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

//--------SUPERADMIN AND ADMINS CAN GET ALL COURIERS--------------------------------

export const couriers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const couriers = await User.findAll({
      where: {
        role: "courier",
      },
    });
    res.json(couriers);
  } catch (error) {
    next(error);
  }
};
